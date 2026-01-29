"use client";

import React, { useState } from 'react';
import { ArrowUpRight, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock Data for different Timeframes to demonstrate interactivity
const DATA_SETS: Record<string, any[]> = {
    'H': [
        { name: '10:00', profit: 120, loss: 40 },
        { name: '11:00', profit: 300, loss: 100 },
        { name: '12:00', profit: 200, loss: 250 },
        { name: '13:00', profit: 450, loss: 50 },
        { name: '14:00', profit: 100, loss: 20 },
    ],
    'D': [
        { name: 'Mon', profit: 1200, loss: 400 },
        { name: 'Tue', profit: 3000, loss: 1000 },
        { name: 'Wed', profit: 2000, loss: 2500 },
        { name: 'Thu', profit: 4500, loss: 500 },
        { name: 'Fri', profit: 1000, loss: 200 },
    ],
    'W': [
        { name: 'Week 1', profit: 12500, loss: 4200 },
        { name: 'Week 2', profit: 15000, loss: 3800 },
        { name: 'Week 3', profit: 9800, loss: 6500 },
        { name: 'Week 4', profit: 18200, loss: 2100 },
    ],
    'ALL': [
        { name: 'Jan', profit: 12500, loss: 4200 },
        { name: 'Feb', profit: 15000, loss: 3800 },
        { name: 'Mar', profit: 9800, loss: 6500 },
        { name: 'Apr', profit: 18200, loss: 2100 },
        { name: 'May', profit: 14500, loss: 4900 },
        { name: 'Jun', profit: 21000, loss: 1500 },
        { name: 'Jul', profit: 25000, loss: 3500 },
        { name: 'Aug', profit: 18000, loss: 2000 },
    ]
};

// Fallback for other tabs to 'ALL' data for this demo
const getChartData = (tab: string) => DATA_SETS[tab] || DATA_SETS['ALL'];

const TIMEFRAMES = ['H', 'D', 'W', 'M', '3M', 'Y', 'ALL'];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 px-3 py-2 rounded-lg shadow-xl backdrop-blur-md min-w-[140px]">
                <p className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-2">{label}</p>
                <div className="flex flex-col gap-1.5">
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex justify-between items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
                                <span className="text-[11px] font-bold text-zinc-600 dark:text-zinc-300">{entry.name}</span>
                            </div>
                            <span className={`text-[11px] font-black ${entry.name === 'Profit' ? 'text-emerald-500' : 'text-red-500'}`}>
                                ${entry.value.toLocaleString()}
                            </span>
                        </div>
                    ))}
                    {/* Net Calculation */}
                    <div className="border-t border-dashed border-gray-200 dark:border-white/10 mt-1 pt-1 flex justify-between items-center">
                        <span className="text-[10px] font-bold text-zinc-400">Net</span>
                        <span className={`text-[11px] font-black ${(payload[0].value - payload[1].value) >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                            {((payload[0].value - payload[1].value) >= 0 ? '+' : '-')}${Math.abs(payload[0].value - payload[1].value).toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export const ProfitLossTrend = () => {
    const [activeTab, setActiveTab] = useState('ALL');

    return (
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/5 rounded-2xl p-5 flex flex-col h-full shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 group">
            
            {/* Header with Title and Timeframe Selector */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                
                {/* Title Section */}
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-zinc-100 dark:bg-white/5 rounded-lg">
                        <BarChart3 size={14} className="text-zinc-500 dark:text-zinc-400" />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-[13px] font-black dark:text-white tracking-tight leading-none">P&L Analysis</h3>
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">Gross Performance</span>
                    </div>
                </div>

                {/* Timeframe Selector */}
                <div className="flex bg-zinc-100 dark:bg-white/5 p-1 rounded-xl border border-gray-200 dark:border-white/5 w-full sm:w-auto overflow-x-auto">
                    {TIMEFRAMES.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 sm:flex-none px-3 py-1 text-[10px] font-black rounded-lg transition-all ${
                                activeTab === tab
                                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                                    : 'text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chart Area */}
            <div className="h-[220px] w-full -ml-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getChartData(activeTab)} barGap={4}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" strokeOpacity={0.2} />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#71717a', fontSize: 10, fontWeight: 700 }}
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#71717a', fontSize: 10, fontWeight: 700 }}
                            tickFormatter={(value) => `$${value >= 1000 ? (value / 1000) + 'k' : value}`}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(147, 51, 234, 0.05)' }} />
                        <Bar 
                            dataKey="profit" 
                            name="Profit" 
                            fill="#10b981" 
                            radius={[4, 4, 0, 0]} 
                            barSize={16}
                            animationDuration={800} // Faster animation for snappy tab switching
                        />
                        <Bar 
                            dataKey="loss" 
                            name="Loss" 
                            fill="#ef4444" 
                            radius={[4, 4, 0, 0]} 
                            barSize={16}
                            animationDuration={800}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};