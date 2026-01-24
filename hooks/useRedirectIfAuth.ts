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
                    router.replace("/dashboard");
                }
            } catch (error) {
                console.error("Error checking auth status:", error);
            }
        };

        checkUser();
    }, [router, supabase]);
}
