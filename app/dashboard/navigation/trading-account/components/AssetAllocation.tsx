"use client";

import React from 'react';
import { ArrowUpRight, PieChart as PieIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const DATA = [
    { name: 'Crypto', value: 45600, color: '#9333ea' }, // Purple-600
    { name: 'Stocks', value: 25300, color: '#10b981' }, // Emerald-500
    { name: 'Forex', value: 12400, color: '#f59e0b' },  // Amber-500
    { name: 'Cash', value: 8500, color: '#3b82f6' },    // Blue-500
];

const TOTAL_VALUE = DATA.reduce((acc, item) => acc + item.value, 0);

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        const percentage = ((data.value / TOTAL_VALUE) * 100).toFixed(1);

        return (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 px-3 py-2 rounded-lg shadow-2xl backdrop-blur-md flex flex-col gap-1 min-w-[120px]">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: data.color }} />
                    <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-none">
                        {data.name}
                    </span>
                </div>
                <div className="flex items-end justify-between gap-4">
                    <span className="text-sm font-black dark:text-white leading-none tracking-tight">
                        ${data.value.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-bold dark:text-zinc-400 bg-zinc-100 dark:bg-white/5 px-1.5 py-0.5 rounded leading-none">
                        {percentage}%
                    </span>
                </div>
            </div>
        );
    }
    return null;
};

export const PortfolioDistribution = () => {
    return (
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/5 rounded-2xl p-5 flex flex-col relative overflow-hidden shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 group">
            
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-purple-500/10 rounded-lg">
                        <PieIcon size={14} className="text-purple-500" />
                    </div>
                    <span className="text-[10px] uppercase font-black text-zinc-400 dark:text-zinc-500 tracking-widest">
                        Asset Allocation
                    </span>
                </div>
                <button className="p-1 px-2 hover:bg-purple-50 dark:hover:bg-purple-500/10 rounded-lg transition-colors group/btn">
                    <ArrowUpRight size={14} className="text-zinc-400 group-hover/btn:text-purple-500 transition-colors" />
                </button>
            </div>

            {/* Chart Container - Fixed Height Added Here */}
            <div className="h-[220px] w-full relative mt-2">
                {/* Center Text Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                    <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1">Total Value</span>
                    <span className="text-2xl font-black dark:text-white tracking-tight">
                        ${(TOTAL_VALUE / 1000).toFixed(1)}k
                    </span>
                </div>

                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Tooltip content={<CustomTooltip />} cursor={false} />
                        <Pie
                            data={DATA}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={90}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {DATA.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={entry.color} 
                                    className="outline-none focus:outline-none"
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Custom Legend */}
            <div className="grid grid-cols-2 gap-3 mt-4 border-t border-gray-100 dark:border-white/5 pt-4">
                {DATA.map((item, i) => (
                    <div key={i} className="flex items-center justify-between group/item">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest group-hover/item:text-zinc-700 dark:group-hover/item:text-zinc-300 transition-colors">
                                {item.name}
                            </span>
                        </div>
                        <span className="text-[11px] font-black dark:text-white tracking-tight">
                            {((item.value / TOTAL_VALUE) * 100).toFixed(0)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};