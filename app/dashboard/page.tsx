import { Terminal, Lightbulb, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <div className="mb-12">
                <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white mb-4 uppercase">
                    Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">AlgoZen</span>
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
                    Your advanced algorithmic trading command center. Manage your MetaTrader 5 and Capital.com accounts with professional-grade analysis and real-time insights.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:border-purple-500/50 transition-colors group">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                        <Zap size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Get Started Fast</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-4">
                        Connect your broker accounts in the settings tab to begin syncing your trades and analyzing performance data in real-time.
                    </p>
                    <Link href="/dashboard/overview" className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 dark:text-purple-400 hover:gap-3 transition-all">
                        View Overview <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:border-indigo-500/50 transition-colors group">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                        <ShieldCheck size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Secure & Reliable</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-4">
                        Your data is encrypted and synced directly from your terminal. We prioritize security and data integrity for all your financial information.
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 italic">
                        Account Sync Active
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 rounded-lg bg-zinc-100 dark:bg-white/5 text-zinc-500">
                        <Terminal size={18} />
                    </div>
                    <div>
                        <h4 className="font-bold text-zinc-900 dark:text-white mb-1">Quick Tutorial: Navigation</h4>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                            Use the sidebar to navigate between your Overview, Account details, and AI Analysis. The Overview page provides a professional high-level view of your current standing, while specific account pages dive deeper into individual trades.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 rounded-lg bg-zinc-100 dark:bg-white/5 text-zinc-500">
                        <Lightbulb size={18} />
                    </div>
                    <div>
                        <h4 className="font-bold text-zinc-900 dark:text-white mb-1">Pro Tip: Dark Mode</h4>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                            AlgoZen is designed to look best in dark mode for those late-night sessions. You can toggle this in your system settings or platform preferences to match your trading environment.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-white/5 text-center">
                <p className="text-zinc-400 dark:text-zinc-500 text-xs italic">
                    "Success in trading comes through discipline and data-driven decisions."
                </p>
            </div>
        </div>
    );
}
