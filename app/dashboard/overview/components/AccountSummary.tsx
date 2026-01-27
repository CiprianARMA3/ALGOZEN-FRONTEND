"use client";

import React from 'react';
import { TrendingUp, TrendingDown, Info, ShieldCheck, Zap, Activity } from 'lucide-react';

const ACCOUNT_METRICS = {
    netLiquidity: { label: 'Net Liquidity', value: '$78,329.64', change: '+$1,687.98', percentage: '2.21%' },
    dailyPnL: { label: 'Daily P&L', value: '+$1,687.98', percentage: '2.21%', isPositive: true },
    unrealizedPnL: { label: 'Unrealized P&L', value: '+$4,321.12', percentage: '5.81%', isPositive: true },
    realizedPnL: { label: 'Realized P&L', value: '+$32,323.77', percentage: '20.81%', isPositive: true },
    buyingPower: { label: 'Buying Power', value: '$156,659.28', subtitle: '2.0x Leverage' },
    excessLiquidity: { label: 'Excess Liquidity', value: '$45,210.33', percentage: '57.7%', status: 'Healthy' },
};

export const AccountSummary = () => {
    return (
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="px-5 py-3 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-white/[0.02]">
                <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-purple-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest dark:text-white">Account Summary</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Market Open</span>
                    </div>
                </div>
            </div>

            {/* Grid Content */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-y lg:divide-y-0 divide-gray-100 dark:divide-white/5">
                {/* Net Liquidity */}
                <div className="p-5 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[9px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">{ACCOUNT_METRICS.netLiquidity.label}</span>
                        <Info size={10} className="text-zinc-300 dark:text-zinc-600" />
                    </div>
                    <span className="text-xl font-black dark:text-white leading-none tracking-tight">{ACCOUNT_METRICS.netLiquidity.value}</span>
                    <div className="flex items-center gap-1 mt-1">
                        <span className="text-[10px] font-bold text-emerald-500">{ACCOUNT_METRICS.netLiquidity.change}</span>
                        <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-600">({ACCOUNT_METRICS.netLiquidity.percentage})</span>
                    </div>
                </div>

                {/* Daily P&L */}
                <div className="p-5 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[9px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">{ACCOUNT_METRICS.dailyPnL.label}</span>
                    </div>
                    <span className="text-xl font-black text-emerald-500 leading-none tracking-tight">{ACCOUNT_METRICS.dailyPnL.value}</span>
                    <div className="flex items-center gap-1 mt-1 text-emerald-500">
                        <TrendingUp size={10} strokeWidth={3} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Today</span>
                    </div>
                </div>

                {/* Unrealized P&L */}
                <div className="p-5 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[9px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">{ACCOUNT_METRICS.unrealizedPnL.label}</span>
                    </div>
                    <span className="text-xl font-black text-emerald-500 leading-none tracking-tight">{ACCOUNT_METRICS.unrealizedPnL.value}</span>
                    <div className="flex items-center gap-1 mt-1 text-emerald-500/70">
                        <Activity size={10} strokeWidth={3} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{ACCOUNT_METRICS.unrealizedPnL.percentage} Open</span>
                    </div>
                </div>

                {/* Realized P&L */}
                <div className="p-5 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[9px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">{ACCOUNT_METRICS.realizedPnL.label}</span>
                    </div>
                    <span className="text-xl font-black dark:text-white leading-none tracking-tight">{ACCOUNT_METRICS.realizedPnL.value}</span>
                    <div className="flex items-center gap-1 mt-1 text-zinc-400 dark:text-zinc-600">
                        <span className="text-[10px] font-bold uppercase tracking-wider">YTD PERFORMANCE</span>
                    </div>
                </div>

                {/* Buying Power */}
                <div className="p-5 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[9px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">{ACCOUNT_METRICS.buyingPower.label}</span>
                    </div>
                    <span className="text-xl font-black text-purple-600 dark:text-purple-400 leading-none tracking-tight">{ACCOUNT_METRICS.buyingPower.value}</span>
                    <div className="flex items-center gap-1 mt-1 text-purple-500/70">
                        <Zap size={10} strokeWidth={3} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{ACCOUNT_METRICS.buyingPower.subtitle}</span>
                    </div>
                </div>

                {/* Margin Utilization */}
                <div className="p-5 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[9px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">{ACCOUNT_METRICS.excessLiquidity.label}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black dark:text-white leading-none tracking-tight">{ACCOUNT_METRICS.excessLiquidity.value}</span>
                    </div>
                    <div className="mt-2 w-full h-1 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 w-[57.7%]" />
                    </div>
                    <div className="flex justify-between items-center mt-1">
                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{ACCOUNT_METRICS.excessLiquidity.status}</span>
                        <span className="text-[9px] font-black dark:text-white">57.7%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
