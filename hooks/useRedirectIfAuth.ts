"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function useRedirectIfAuth() {
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    if (session.user?.email_confirmed_at) {
                        router.replace("/dashboard");
                    } else {
                        router.replace("/auth/confirm-email");
                    }
                }
            } catch (error) {
                console.error("Error checking auth status:", error);
            }
        };

        checkUser();
    }, [router, supabase]);
}
