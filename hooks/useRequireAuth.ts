"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function useRequireAuth() {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (!session) {
                    router.replace("/auth/login");
                    return;
                }

                // Check if email is confirmed
                const { data: { user } } = await supabase.auth.getUser();

                if (user && !user.email_confirmed_at) {
                    // If user exists but email not confirmed, redirect to confirm email page
                    router.replace("/auth/confirm-email");
                    return;
                }

                // If authenticated and confirmed, we are good
                setLoading(false);

            } catch (error) {
                console.error("Error checking auth status:", error);
                router.replace("/auth/login");
            }
        };

        checkUser();
    }, [router, supabase]);

    return { loading };
}
