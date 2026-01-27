"use client";

import React from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const SUMMARY_CARDS = [
    {
        title: 'This Week',
        value: '$1,687.98',
        rrValue: '+1.02 RR',
        percentage: '1.01%',
        isPositive: true,
        successRate: '100%',
        trades: 1,
        sparklineData: [
            { value: 10 }, { value: 15 }, { value: 12 }, { value: 25 }, { value: 30 }, { value: 45 }, { value: 40 }
        ]
    },
    {
        title: 'This Month',
        value: '$1,371.97',
        rrValue: '+1.22 RR',
        percentage: '1.17%',
        isPositive: true,
        successRate: '67%',
        trades: 3,
        sparklineData: [
            { value: 40 }, { value: 35 }, { value: 30 }, { value: 20 }, { value: 25 }, { value: 35 }, { value: 45 }
        ]
    },
    {
        title: 'This Year',
        value: '$32,323.77',
        rrValue: '+26.51 RR',
        percentage: '20.81%',
        isPositive: true,
        successRate: '57%',
        trades: 49,
        sparklineData: [
            { value: 10 }, { value: 20 }, { value: 15 }, { value: 35 }, { value: 45 }, { value: 55 }, { value: 70 }
        ]
    },
    {
        title: 'All Time',
        value: '$78,329.64',
        rrValue: '+62.91 RR',
        percentage: '59.22%',
        isPositive: true,
        successRate: '58%',
        trades: 100,
        sparklineData: [
            { value: 5 }, { value: 15 }, { value: 25 }, { value: 40 }, { value: 45 }, { value: 65 }, { value: 80 }
        ]
    }
];

const SummaryCard = ({ data }: { data: typeof SUMMARY_CARDS[0] }) => (
    <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/5 rounded-2xl p-4 flex flex-col gap-2 relative overflow-hidden group hover:border-purple-500/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-purple-500/5">
        <div className="flex justify-between items-start">
            <span className="text-[9px] uppercase font-black text-zinc-400 dark:text-zinc-500 tracking-widest">{data.title}</span>
            <button className="p-0.5 px-1.5 hover:bg-purple-50 dark:hover:bg-purple-500/10 rounded-lg transition-colors group/btn">
                <ArrowUpRight size={12} className="text-zinc-400 group-hover/btn:text-purple-500 transition-colors" />
            </button>
        </div>

        <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black dark:text-white tracking-tight">{data.value}</span>
        </div>

        <div className="flex items-center gap-2 mt-0.5">
            <div className={`flex items-center gap-1 text-[9px] font-black ${data.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                {data.isPositive ? <TrendingUp size={10} strokeWidth={3} /> : <TrendingDown size={10} strokeWidth={3} />}
                <span className="tracking-tight">{data.percentage}</span>
            </div>
            <span className={`text-[8px] font-black ${data.rrValue.startsWith('+') ? 'text-emerald-500 bg-emerald-500/10' : 'text-red-500 bg-red-500/10'} px-1.5 py-0.5 rounded-full`}>
                {data.rrValue}
            </span>
        </div>

        <div className="h-10 -mx-4 mt-1">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.sparklineData}>
                    <defs>
                        <linearGradient id={`grad-${data.title.replace(' ', '')}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#9333ea" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#9333ea"
                        strokeWidth={2}
                        fill={`url(#grad-${data.title.replace(' ', '')})`}
                        dot={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>

        <div className="flex justify-between items-end mt-auto pt-3 border-t border-gray-100 dark:border-white/5">
            <div className="flex flex-col">
                <span className="text-[14px] font-black dark:text-white leading-none tracking-tight">{data.successRate}</span>
                <span className="text-[7px] uppercase text-zinc-500 dark:text-zinc-600 font-black tracking-widest mt-1 leading-none">success rate</span>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[14px] font-black dark:text-white leading-none tracking-tight">{data.trades}</span>
                <span className="text-[7px] uppercase text-zinc-500 dark:text-zinc-600 font-black tracking-widest mt-1 leading-none">trades</span>
            </div>
        </div>
    </div>
);

export const SummaryCards = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {SUMMARY_CARDS.map((card, i) => (
                <SummaryCard key={i} data={card} />
            ))}
        </div>
    );
};
