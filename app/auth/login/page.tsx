"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import useRedirectIfAuth from "@/hooks/useRedirectIfAuth";
import Link from "next/link";
import {
    ArrowLeft,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Zap,
    Loader2
} from "lucide-react";
import { motion } from "framer-motion";

const supabase = createClient();

export default function LoginPage() {
    useRedirectIfAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    // --- PRESERVED BACKEND LOGIC ---
    const handleLogin = async () => {
        setErrorMsg("");
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password,
            });
            if (error) {
                setErrorMsg(error.message);
                setLoading(false);
                return;
            }
            if (!data.user) {
                setErrorMsg("No user found");
                setLoading(false);
                return;
            }

            // Basic redirection to dashboard
            router.push("/dashboard");

        } catch (err: any) {
            setErrorMsg(err.message || "An unexpected error occurred");
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setErrorMsg("Please enter your email address to reset your password.");
            return;
        }
        setLoading(true);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/callback?next=/auth/update-password`,
            });
            if (error) throw error;
            setErrorMsg("Password reset email sent! Check your inbox.");
        } catch (err: any) {
            setErrorMsg(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white font-sans selection:bg-purple-100 items-center justify-center relative">

            {/* Back Button - Positioned relative to screen */}
            <Link
                href="/"
                className="absolute top-8 left-8 lg:top-12 lg:left-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-purple-600 transition-all group z-50"
            >
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" strokeWidth={3} />
                Return to Home
            </Link>

            {/* CENTERED FORM AREA */}
            <div className="w-full max-w-[500px] bg-white flex flex-col items-center justify-center p-8 relative">

                <div className="w-full space-y-8 relative z-10">

                    {/* Error Message */}
                    {errorMsg && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-red-50 border-2 border-red-100 text-red-600 text-[13px] font-bold rounded-2xl text-center shadow-sm uppercase tracking-wide"
                        >
                            {errorMsg}
                        </motion.div>
                    )}

                    {/* Brand Logo */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="flex flex-col items-center leading-none text-zinc-900">
                            <span className="text-5xl font-normal tracking-tight">Invest <span className="text-purple-600 font-bold">ZEN</span></span>
                        </div>
                    </div>

                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-zinc-50"></div></div>
                        <div className="relative flex justify-center text-[10px]"><span className="px-4 bg-white text-zinc-400 font-black uppercase tracking-widest">Login</span></div>
                    </div>

                    <div className="bg-zinc-50 p-1.5 rounded-2xl flex border-2 border-zinc-100">
                        <div className="flex-1 bg-white shadow-sm text-zinc-900 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-center border border-zinc-100">
                            Sign In
                        </div>
                        <Link
                            href="/auth/register"
                            className="flex-1 text-zinc-400 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-center hover:text-zinc-900 transition-all"
                        >
                            Sign Up
                        </Link>
                    </div>

                    {/* Form */}
                    <div className="space-y-5">
                        <div className="relative group">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-purple-600 transition-colors" size={18} strokeWidth={2.5} />
                            <input
                                type="email"
                                placeholder="EMAIL ADDRESS"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                                className="w-full pl-14 pr-6 py-5 bg-zinc-50 border-2 border-zinc-100 rounded-2xl focus:outline-none focus:border-purple-600/30 focus:bg-white transition-all shadow-inner text-sm font-bold text-zinc-800 placeholder:text-zinc-400 placeholder:font-bold"
                            />
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-purple-600 transition-colors" size={18} strokeWidth={2.5} />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="PASSWORD"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                                className="w-full pl-14 pr-14 py-5 bg-zinc-50 border-2 border-zinc-100 rounded-2xl focus:outline-none focus:border-purple-600/30 focus:bg-white transition-all shadow-inner text-sm font-bold text-zinc-800 placeholder:text-zinc-400 placeholder:font-bold"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-zinc-900 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} strokeWidth={2.5} /> : <Eye size={18} strokeWidth={2.5} />}
                            </button>
                        </div>

                        <button
                            onClick={handleLogin}
                            disabled={loading || !email || !password}
                            className="group w-full bg-[#202124] text-white py-5 rounded-2xl hover:bg-black transition-all shadow-xl shadow-zinc-900/10 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="animate-spin" size={16} /> Authenticating...
                                </span>
                            ) : (
                                <>
                                    Log In
                                </>
                            )}
                        </button>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <button onClick={handleForgotPassword} className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-all border-b border-transparent hover:border-zinc-900 pb-0.5">
                            Recover Access Credentials
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
