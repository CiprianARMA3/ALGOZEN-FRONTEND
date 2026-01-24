"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface AccountLimits {
  plan_name: string;
  max_accounts: number;
  current_accounts: number;
  remaining_slots: number;
  can_add_account: boolean;
}

interface Account {
  user_id: number;
  email: string;
  mt5_login?: number;
  mt5_server?: string;
  capital_login?: string;
  portfolio_value?: number;
  portfolio_currency?: string;
}

export default function AccountsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [limits, setLimits] = useState<AccountLimits | null>(null);
  const [mt5Accounts, setMt5Accounts] = useState<Account[]>([]);
  const [capitalAccounts, setCapitalAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [brokerType, setBrokerType] = useState<'MT5' | 'CAPITAL'>('MT5');

  // Authentication check
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setIsAuthenticated(true);
      setAccessToken(session.access_token);
      await loadAccountData(session.access_token);
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  const loadAccountData = async (token: string) => {
    try {
      setLoading(true);
      setError(null);

      // Fetch account limits
      const limitsRes = await fetch(`${API_URL}/api/accounts/limits`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (limitsRes.ok) {
        const limitsData = await limitsRes.json();
        setLimits(limitsData);
      }

      // Fetch accounts list
      const accountsRes = await fetch(`${API_URL}/api/accounts/list`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (accountsRes.ok) {
        const accountsData = await accountsRes.json();
        setMt5Accounts(accountsData.mt5_accounts || []);
        setCapitalAccounts(accountsData.capital_accounts || []);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load account data');
    } finally {
      setLoading(false);
    }
  };

  const handleLinkAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!accessToken) return;

    const formData = new FormData(e.currentTarget);
    const request: any = { broker_type: brokerType };

    if (brokerType === 'MT5') {
      request.mt5_login = parseInt(formData.get('mt5_login') as string);
      request.mt5_investor_password = formData.get('mt5_password') as string;
      request.mt5_server = formData.get('mt5_server') as string;
    } else {
      request.capital_login = formData.get('capital_login') as string;
      request.capital_password = formData.get('capital_password') as string;
      request.capital_api_key = formData.get('capital_api_key') as string;
    }

    try {
      const res = await fetch(`${API_URL}/api/accounts/link`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });

      const data = await res.json();
      if (data.success) {
        alert(data.message);
        setShowLinkForm(false);
        await loadAccountData(accessToken);
      } else {
        alert(data.message);
      }
    } catch (err: any) {
      alert('Failed to link account: ' + err.message);
    }
  };

  const handleUnlinkAccount = async (brokerType: 'MT5' | 'CAPITAL', login: string) => {
    if (!accessToken || !confirm('Are you sure you want to unlink this account?')) return;

    try {
      const res = await fetch(`${API_URL}/api/accounts/${brokerType}/${login}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });

      if (res.ok) {
        alert('Account unlinked successfully');
        await loadAccountData(accessToken);
      } else {
        const error = await res.json();
        alert('Failed to unlink account: ' + error.detail);
      }
    } catch (err: any) {
      alert('Failed to unlink account: ' + err.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Please Log In</h1>
          <p className="text-gray-400">You need to be authenticated to manage accounts.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-xl">Loading accounts...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Account Management
        </h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        {/* Plan Limits */}
        {limits && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Your Plan: {limits.plan_name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-gray-400 text-sm">Max Accounts</div>
                <div className="text-2xl font-bold">{limits.max_accounts}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Current Accounts</div>
                <div className="text-2xl font-bold">{limits.current_accounts}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Remaining Slots</div>
                <div className="text-2xl font-bold text-blue-400">{limits.remaining_slots}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Can Add More</div>
                <div className={`text-2xl font-bold ${limits.can_add_account ? 'text-green-400' : 'text-red-400'}`}>
                  {limits.can_add_account ? 'Yes' : 'No'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Link Account Button */}
        {limits?.can_add_account && (
          <button
            onClick={() => setShowLinkForm(!showLinkForm)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold mb-6 transition-all"
          >
            {showLinkForm ? 'Cancel' : '+ Link New Account'}
          </button>
        )}

        {/* Link Account Form */}
        {showLinkForm && (
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4">Link New Account</h3>
            <div className="mb-4">
              <label className="block mb-2">Broker Type:</label>
              <select 
                value={brokerType} 
                onChange={(e) => setBrokerType(e.target.value as 'MT5' | 'CAPITAL')}
                className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full"
              >
                <option value="MT5">MetaTrader 5</option>
                <option value="CAPITAL">Capital.com</option>
              </select>
            </div>
            <form onSubmit={handleLinkAccount} className="space-y-4">
              {brokerType === 'MT5' ? (
                <>
                  <input name="mt5_login" placeholder="MT5 Login" required className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full" type="number" />
                  <input name="mt5_password" placeholder="Investor Password" required className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full" type="password" />
                  <input name="mt5_server" placeholder="Server (e.g., Broker-Demo)" required className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full" />
                </>
              ) : (
                <>
                  <input name="capital_login" placeholder="Capital.com Username" required className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full" />
                  <input name="capital_password" placeholder="Password" required className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full" type="password" />
                  <input name="capital_api_key" placeholder="API Key" required className="bg-gray-700 border border-gray-600 rounded px-4 py-2 w-full" />
                </>
              )}
              <button type="submit" className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold w-full transition-all">
                Link Account
              </button>
            </form>
          </div>
        )}

        {/* MT5 Accounts */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">MetaTrader 5 Accounts ({mt5Accounts.length})</h2>
          <div className="space-y-4">
            {mt5Accounts.length === 0 ? (
              <div className="bg-gray-800/30 rounded-lg p-6 text-center text-gray-400">
                No MT5 accounts linked
              </div>
            ) : (
              mt5Accounts.map((acc, idx) => (
                <div key={idx} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 flex justify-between items-center">
                  <div>
                    <div className="text-xl font-semibold">MT5 #{acc.mt5_login}</div>
                    <div className="text-gray-400">Server: {acc.mt5_server}</div>
                    {acc.portfolio_value && (
                      <div className="text-green-400 mt-2">
                        Balance: {acc.portfolio_currency} {acc.portfolio_value.toFixed(2)}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleUnlinkAccount('MT5', acc.mt5_login!.toString())}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-all"
                  >
                    Unlink
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Capital.com Accounts */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Capital.com Accounts ({capitalAccounts.length})</h2>
          <div className="space-y-4">
            {capitalAccounts.length === 0 ? (
              <div className="bg-gray-800/30 rounded-lg p-6 text-center text-gray-400">
                No Capital.com accounts linked
              </div>
            ) : (
              capitalAccounts.map((acc, idx) => (
                <div key={idx} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 flex justify-between items-center">
                  <div>
                    <div className="text-xl font-semibold">{acc.capital_login}</div>
                    <div className="text-gray-400">{acc.email}</div>
                  </div>
                  <button
                    onClick={() => handleUnlinkAccount('CAPITAL', acc.capital_login!)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-all"
                  >
                    Unlink
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
