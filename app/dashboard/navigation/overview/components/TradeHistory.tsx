"use client";

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const PORTFOLIO_POSITIONS = [
    {
        symbol: 'SPY',
        name: 'SPDR S&P 500 ETF TR...',
        mktValue: '201,597.22',
        pnl: '+1,245.50',
        margin: '10,079.86',
        exposure: '201,597',
        last: '671.99',
        change: '+0.41%',
        isPositive: true
    },
    {
        symbol: 'COST',
        name: 'COSTCO WHOLESALE ...',
        mktValue: '91,320.45',
        pnl: '-412.30',
        margin: '4,566.02',
        exposure: '91,320',
        last: '912.60',
        change: '-0.45%',
        isPositive: false
    },
    {
        symbol: 'QQQ',
        name: 'INVESCO QQQ TRUST ...',
        mktValue: '60,585.12',
        pnl: '+18.25',
        margin: '3,029.26',
        exposure: '60,585',
        last: '605.92',
        change: '+0.03%',
        isPositive: true
    },
    {
        symbol: 'AMZN',
        name: 'AMAZON.COM INC',
        mktValue: '44,581.30',
        pnl: '+112.45',
        margin: '2,229.07',
        exposure: '44,581',
        last: '222.96',
        change: '+0.25%',
        isPositive: true
    },
    {
        symbol: 'BABA',
        name: 'ALIBABA GROUP HOL...',
        mktValue: '18,937.15',
        pnl: '+21.10',
        margin: '946.86',
        exposure: '18,937',
        last: '189.55',
        change: '+0.11%',
        isPositive: true
    },
];

const PositionRow = ({ pos }: { pos: typeof PORTFOLIO_POSITIONS[0] }) => (
    <div className="group flex items-center py-4 border-b border-gray-50 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-colors relative">
        {/* Left Status Bar */}
        <div className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-r ${pos.isPositive ? 'bg-emerald-500' : 'bg-red-500'}`} />

        {/* Symbol Column - 18% */}
        <div className="w-[18%] pl-5 flex flex-col justify-center">
            <span className="text-[14px] font-black dark:text-white leading-tight tracking-tight">{pos.symbol}</span>
            <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase truncate pr-4 leading-tight">{pos.name}</span>
        </div>

        {/* Mkt Value Column - 15% */}
        <div className="w-[15%] text-right pr-4">
            <span className="text-[12px] font-black dark:text-zinc-200 tracking-tight">${pos.mktValue}</span>
        </div>

        {/* P&L Column - 15% */}
        <div className="w-[15%] text-right pr-4">
            <span className={`text-[12px] font-black tracking-tight ${pos.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                {pos.pnl}
            </span>
        </div>

        {/* Margin Column - 12% */}
        <div className="w-[12%] text-right pr-4">
            <span className="text-[12px] font-black dark:text-zinc-400 tracking-tight">${pos.margin}</span>
        </div>

        {/* Exposure Column - 12% */}
        <div className="w-[12%] text-right pr-4">
            <span className="text-[12px] font-black dark:text-zinc-400 tracking-tight">${pos.exposure}</span>
        </div>

        {/* Last Price Column - 13% */}
        <div className="w-[13%] flex justify-center">
            <div className="bg-[#fef9c3]/50 dark:bg-yellow-500/10 px-3 py-1 rounded text-[11px] font-black text-zinc-800 dark:text-white tracking-tight border border-yellow-200/50 dark:border-yellow-500/20">
                {pos.last}
            </div>
        </div>

        {/* Change Column - 10% */}
        <div className="w-[10%] flex justify-end">
            <div className={`min-w-[65px] text-center px-2 py-1 rounded text-[11px] font-black ${pos.isPositive ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                {pos.change}
            </div>
        </div>

        {/* Action Column - 5% or Fixed Width */}
        <div className="flex-1 flex justify-center items-center">
            <ArrowUpRight size={14} className="text-zinc-300 group-hover:text-purple-500 transition-colors cursor-pointer" />
        </div>
    </div>
);

export const TradeHistory = () => {
    return (
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/5 rounded-2xl flex flex-col shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-4 sm:p-6 pb-4 flex justify-between items-center border-b border-gray-50 dark:border-white/5">
                <div className="flex items-center gap-3">
                    <h3 className="text-sm sm:text-[15px] font-black dark:text-white tracking-tight">Portfolio Positions</h3>
                    <span className="text-[9px] sm:text-[10px] font-black text-zinc-400 bg-zinc-100 dark:bg-white/5 px-2 py-0.5 rounded-full uppercase tracking-widest hidden sm:inline">Live View</span>
                </div>
                <button className="p-1 px-2 hover:bg-purple-50 dark:hover:bg-purple-500/10 rounded-lg transition-colors group/btn">
                    <ArrowUpRight size={14} className="text-zinc-400 group-hover/btn:text-purple-500 transition-colors" />
                </button>
            </div>

            {/* Responsive Table Container */}
            <div className="overflow-x-auto">
                <div className="min-w-[900px]">
                    {/* Table Headers */}
                    <div className="py-3 flex items-center border-b border-gray-100 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.01]">
                        <span className="w-[18%] pl-5 text-[10px] font-black text-zinc-400 dark:text-zinc-500 tracking-widest uppercase">SYMBOL</span>
                        <span className="w-[15%] text-[10px] font-black text-zinc-400 dark:text-zinc-500 tracking-widest uppercase text-right pr-4">MKT VALUE</span>
                        <span className="w-[15%] text-[10px] font-black text-zinc-400 dark:text-zinc-500 tracking-widest uppercase text-right pr-4">PROFIT & LOSS</span>
                        <span className="w-[12%] text-[10px] font-black text-zinc-400 dark:text-zinc-500 tracking-widest uppercase text-right pr-4">MARGIN</span>
                        <span className="w-[12%] text-[10px] font-black text-zinc-400 dark:text-zinc-500 tracking-widest uppercase text-right pr-4">EXPOSURE</span>
                        <span className="w-[13%] text-[10px] font-black text-zinc-400 dark:text-zinc-500 tracking-widest uppercase text-center">LAST</span>
                        <span className="w-[10%] text-[10px] font-black text-zinc-400 dark:text-zinc-500 tracking-widest uppercase text-right">CHANGE</span>
                        <span className="flex-1"></span> {/* Spacer for icon column */}
                    </div>

                    {/* Scrollable List */}
                    <div className="divide-y divide-transparent">
                        {PORTFOLIO_POSITIONS.map((pos, i) => (
                            <PositionRow key={i} pos={pos} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};