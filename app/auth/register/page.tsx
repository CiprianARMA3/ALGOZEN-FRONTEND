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
    Loader2,
    User
} from "lucide-react";
import { motion } from "framer-motion";

const supabase = createClient();
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function RegisterPage() {
    useRedirectIfAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleRegister = async () => {
        setLoading(true);
        setErrorMsg(null);

        try {
            // 1. Register with Supabase Auth
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        username: username,
                        name: name, // Changed from full_name to name
                        surname: surname, // Added surname
                    },
                },
            });

            if (signUpError) throw signUpError;
            if (!data.user) throw new Error('User creation failed');

            // 2. Sync with local database and public users table
            const syncRes = await fetch(`${API_URL}/api/auth/register-sync`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: data.user.id,
                    email: data.user.email,
                    name: name,
                    surname: surname
                })
            });

            if (!syncRes.ok) {
                const syncError = await syncRes.json();
                console.warn('Sync warning:', syncError.detail);
            }

            // alert('Check your email for the confirmation link!');
            router.push('/auth/confirm-email');
        } catch (err: any) {
            setErrorMsg(err.message || 'Failed to sign up');
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
                        <div className="relative flex justify-center text-[10px]"><span className="px-4 bg-white text-zinc-400 font-black uppercase tracking-widest">Create Account</span></div>
                    </div>

                    <div className="bg-zinc-50 p-1.5 rounded-2xl flex border-2 border-zinc-100">
                        <Link
                            href="/auth/login"
                            className="flex-1 text-zinc-400 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-center hover:text-zinc-900 transition-all"
                        >
                            Sign In
                        </Link>
                        <div className="flex-1 bg-white shadow-sm text-zinc-900 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-center border border-zinc-100">
                            Sign Up
                        </div>
                    </div>

                    {/* Form */}
                    <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative group">
                                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-purple-600 transition-colors" size={18} strokeWidth={2.5} />
                                <input
                                    type="text"
                                    placeholder="NAME"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full pl-14 pr-6 py-5 bg-zinc-50 border-2 border-zinc-100 rounded-2xl focus:outline-none focus:border-purple-600/30 focus:bg-white transition-all shadow-inner text-sm font-bold text-zinc-800 placeholder:text-zinc-400 placeholder:font-bold"
                                />
                            </div>
                            <div className="relative group">
                                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-purple-600 transition-colors" size={18} strokeWidth={2.5} />
                                <input
                                    type="text"
                                    placeholder="SURNAME"
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                    required
                                    className="w-full pl-14 pr-6 py-5 bg-zinc-50 border-2 border-zinc-100 rounded-2xl focus:outline-none focus:border-purple-600/30 focus:bg-white transition-all shadow-inner text-sm font-bold text-zinc-800 placeholder:text-zinc-400 placeholder:font-bold"
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-purple-600 transition-colors" size={18} strokeWidth={2.5} />
                            <input
                                type="text"
                                placeholder="USERNAME"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full pl-14 pr-6 py-5 bg-zinc-50 border-2 border-zinc-100 rounded-2xl focus:outline-none focus:border-purple-600/30 focus:bg-white transition-all shadow-inner text-sm font-bold text-zinc-800 placeholder:text-zinc-400 placeholder:font-bold"
                            />
                        </div>

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
                            onClick={handleRegister}
                            disabled={loading || !email || !password || !name || !surname || !username}
                            className="group w-full bg-[#202124] text-white py-5 rounded-2xl hover:bg-black transition-all shadow-xl shadow-zinc-900/10 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="animate-spin" size={16} /> Creating Account...
                                </span>
                            ) : (
                                <>
                                    Register
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
