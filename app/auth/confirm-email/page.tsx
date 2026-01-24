'use client';

import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function ConfirmEmailPage() {
    return (
        <div className="min-h-screen flex bg-white font-sans selection:bg-purple-100 items-center justify-center relative">

            {/* Back Button - Positioned relative to screen */}
            <Link
                href="/auth/login"
                className="absolute top-8 left-8 lg:top-12 lg:left-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-purple-600 transition-all group z-50"
            >
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" strokeWidth={3} />
                Return to Login
            </Link>

            {/* CENTERED CONTENT AREA */}
            <div className="w-full max-w-[500px] bg-white flex flex-col items-center justify-center p-8 relative">
                <div className="w-full space-y-8 relative z-10 flex flex-col items-center text-center">

                    {/* Brand Logo */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="flex flex-col items-center leading-none text-zinc-900">
                            <span className="text-5xl font-normal tracking-tight">Invest <span className="text-purple-600 font-bold">ZEN</span></span>
                        </div>
                    </div>

                    <div className="relative py-2 w-full">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-zinc-50"></div></div>
                        <div className="relative flex justify-center text-[10px]"><span className="px-4 bg-white text-zinc-400 font-black uppercase tracking-widest">Confirmation Required</span></div>
                    </div>

                    {/* Icon & Message */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-zinc-50 p-8 rounded-full border-2 border-zinc-100 mb-4"
                    >
                        <Mail size={48} className="text-purple-600" strokeWidth={1.5} />
                    </motion.div>

                    <div className="space-y-4 max-w-sm mx-auto">
                        <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Check your inbox</h2>
                        <p className="text-zinc-500 font-medium text-sm leading-relaxed">
                            We've sent a confirmation link to your email address. Please click the link to activate your account and access the dashboard.
                        </p>
                    </div>

                    <div className="pt-8 w-full">
                        <Link
                            href="/auth/login"
                            className="group w-full bg-[#202124] text-white py-5 rounded-2xl hover:bg-black transition-all shadow-xl shadow-zinc-900/10 active:scale-[0.98] flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest"
                        >
                            Return to Login
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
