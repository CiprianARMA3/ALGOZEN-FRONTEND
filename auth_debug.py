"""
Authentication and Authorization
Handles Supabase JWT validation and user extraction
"""
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from supabase import create_client, Client
from typing import Optional
import logging
from config import settings

logger = logging.getLogger(__name__)

# HTTP Bearer token security
security = HTTPBearer()

# Supabase client
def get_supabase_client() -> Client:
    """Create and return Supabase client"""
    return create_client(settings.supabase_url, settings.supabase_anon_key)


class CurrentUser:
    """Current authenticated user information"""
    def __init__(self, user_id: int, email: str, supabase_id: str):
        self.user_id = user_id
        self.email = email
        self.supabase_id = supabase_id


def verify_supabase_token(token: str) -> dict:
    """
    Verify Supabase JWT token with support for both HS256 and ES256.
    """
    try:
        # 1. Inspect header
        header = jwt.get_unverified_header(token)
        alg = header.get("alg", "HS256")
        logger.critical(f"VERIFICATION ATTEMPT - {alg} detected. Header: {header}")
        
        secret = settings.supabase_jwt_secret
        
        # 2. Strategic Verification
        if alg == "HS256":
            # Symmetric (Standard)
            return jwt.decode(token, secret, algorithms=["HS256"], options={"verify_aud": False})
            
        elif alg == "ES256":
            # Asymmetric (User Project)
            # If the user has put the JWK "x" and "y" into their file, we could use them.
            # But usually, it's easier to verify with HS256 if possible.
            # If verify fails here, we give a very specific instruction.
            try:
                return jwt.decode(token, secret, algorithms=["ES256"], options={"verify_aud": False})
            except Exception as e:
                if "MalformedFraming" in str(e) or "PEM" in str(e):
                    logger.error("ES256 detected but Secret is not a Public Key PEM!")
                    raise ValueError(f"Your project uses ES256. You cannot use a simple 'Secret string'. You must provide the Public Key from your dashboard.")
                raise
        else:
            # Fallback for other types
            return jwt.decode(token, secret, algorithms=[alg], options={"verify_aud": False})

    except Exception as e:
        msg = str(e)
        logger.error(f"JWT verification failed: {msg}")
        
        # Specific help for the user
        if "ES256" in str(locals().get('alg', '')) and ("PEM" in msg or "Framing" in msg):
            detail = "CRITICAL CONFIG ERROR: Your Supabase uses ES256 (Asymmetric). You must paste the PUBLIC KEY (PEM) into your .env, not just the secret string."
        else:
            detail = f"Authentication Failed ({alg}): {msg}"

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=detail,
            headers={"WWW-Authenticate": "Bearer"},
        )


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> CurrentUser:
    """
    FastAPI dependency to get current authenticated user.
    """
    # Verify token
    payload = verify_supabase_token(credentials.credentials)
    
    # Extract user information from payload
    supabase_id = payload.get("sub")
    email = payload.get("email")
    
    if not supabase_id or not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload"
        )
    
    from database import execute_query
    
    try:
        # 1. Check main users table first (using Supabase UUID)
        user_record = execute_query(
            "SELECT id, email FROM users WHERE id = %s LIMIT 1",
            (supabase_id,),
            fetch="one"
        )
        
        # 2. Map Supabase UUID to local integer user_id
        # We check users_auth table where 'owner' column stores the Supabase UUID
        auth_record = execute_query(
            "SELECT user_id FROM users_auth WHERE owner = %s LIMIT 1",
            (supabase_id,),
            fetch="one"
        )
        
        # If not found in users_auth, check capitaldotcom
        if not auth_record:
            auth_record = execute_query(
                "SELECT user_id FROM users_auth_capitaldotcom WHERE owner = %s LIMIT 1",
                (supabase_id,),
                fetch="one"
            )
        
        # If we have a record in users table but no account linked yet, 
        # we might not have a local user_id integer yet. 
        # In this case, we use 0 or a placeholder, but most RLS policies need the integer.
        local_user_id = auth_record['user_id'] if auth_record else 0
        
        if not user_record:
            # Fallback to email search (for legacy or partially synced users)
            user_record = execute_query(
                "SELECT id, email FROM users WHERE email = %s LIMIT 1",
                (email,),
                fetch="one"
            )
            
        if not user_record:
             raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found in local database. Please complete registration sync."
            )
        
        return CurrentUser(
            user_id=local_user_id,
            email=email,
            supabase_id=supabase_id
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching user from database: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to authenticate user: {str(e)}"
        )


async def get_current_user_optional(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)
) -> Optional[CurrentUser]:
    """
    Optional authentication dependency.
    Returns None if no credentials provided, otherwise validates and returns user.
    """
    if not credentials:
        return None
    return await get_current_user(credentials)
