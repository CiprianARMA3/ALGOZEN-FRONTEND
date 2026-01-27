"use client";

import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from 'recharts';

const BALANCE_CHART_DATA = [
    { name: 'Jan 1', value: 100000 },
    { name: 'Jan 10', value: 102000 },
    { name: 'Jan 20', value: 101500 },
    { name: 'Feb 1', value: 105000 },
    { name: 'Feb 15', value: 108000 },
    { name: 'Mar 1', value: 107000 },
    { name: 'Mar 15', value: 112000 },
    { name: 'Apr 1', value: 120000 },
    { name: 'Apr 15', value: 118000 },
    { name: 'May 1', value: 125000 },
    { name: 'May 15', value: 130000 },
    { name: 'Jun 1', value: 128000 },
    { name: 'Jun 15', value: 135000 },
    { name: 'Jul 1', value: 140000 },
    { name: 'Jul 15', value: 145000 },
    { name: 'Aug 1', value: 142000 },
    { name: 'Aug 15', value: 150000 },
    { name: 'Sep 1', value: 155000 },
    { name: 'Sep 15', value: 153000 },
    { name: 'Oct 1', value: 160000 },
    { name: 'Oct 15', value: 165000 },
    { name: 'Nov 1', value: 162000 },
    { name: 'Nov 15', value: 170000 },
    { name: 'Dec 1', value: 175000 },
    { name: 'Dec 15', value: 180000 },
];

const CustomTooltip = ({ active, payload, label, prefix = '$', baseValue }: any) => {
    if (active && payload && payload.length) {
        const value = payload[0].value;
        const percentage = baseValue ? ((value - baseValue) / baseValue * 100).toFixed(2) : null;

        return (
            <div className="bg-white dark:bg-[#111111] border border-zinc-200 dark:border-white/10 p-3 rounded-xl shadow-2xl backdrop-blur-md">
                <p className="text-[10px] font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1">{label}</p>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-3 rounded-full bg-purple-500" />
                        <p className="text-sm font-black text-zinc-900 dark:text-white">
                            {prefix}{value.toLocaleString()}
                        </p>
                    </div>
                    {percentage !== null && (
                        <p className={`text-[10px] font-black ${Number(percentage) >= 0 ? 'text-emerald-500' : 'text-red-500'} ml-3`}>
                            {Number(percentage) >= 0 ? '+' : ''}{percentage}% growth
                        </p>
                    )}
                </div>
            </div>
        );
    }
    return null;
};

export const PerformanceCharts = () => {
    const initialBalance = BALANCE_CHART_DATA[0].value;
    const currentBalance = BALANCE_CHART_DATA[BALANCE_CHART_DATA.length - 1].value;
    const totalGrowth = ((currentBalance - initialBalance) / initialBalance * 100).toFixed(1);

    return (
        <div className="w-full">
            {/* Account Balance Chart */}
            <div className="bg-white dark:bg-[#111111] border border-zinc-200 dark:border-white/5 rounded-2xl p-4 sm:p-6 flex flex-col gap-5 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 px-1">
                    <div>
                        <h3 className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-1">Equity Growth</h3>
                        <div className="flex items-baseline gap-3">
                            <p className="text-lg sm:text-xl font-black dark:text-white leading-none tracking-tight">Account Balance Overview</p>
                            <span className="text-[10px] sm:text-[11px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 sm:py-0.5 rounded-full">
                                +{totalGrowth}%
                            </span>
                        </div>
                    </div>
                    <div className="flex bg-zinc-100 dark:bg-white/5 p-1 rounded-xl border border-gray-200 dark:border-white/5 w-full sm:w-auto overflow-x-auto">
                        {['H', 'D', 'W', 'M', '3M', 'Y', 'ALL'].map((range) => (
                            <button key={range} className={`flex-1 sm:flex-none px-3 py-1 text-[10px] font-black rounded-lg transition-all ${range === 'ALL' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}>
                                {range}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="h-[250px] sm:h-[320px] w-full mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={BALANCE_CHART_DATA}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.25} />
                                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" opacity={0.07} />
                            <XAxis
                                dataKey="name"
                                stroke="#6b7280"
                                fontSize={9}
                                tickLine={false}
                                axisLine={false}
                                dy={10}
                                fontWeight="900"
                                minTickGap={40}
                            />
                            <YAxis
                                stroke="#6b7280"
                                fontSize={9}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${value / 1000}k`}
                                domain={['dataMin - 5000', 'dataMax + 5000']}
                                fontWeight="900"
                            />
                            <Tooltip content={<CustomTooltip baseValue={initialBalance} />} />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#9333ea"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorValue)"
                                animationDuration={1000}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
