"use client";

import React from 'react';
import { Activity, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

// Configuration
const METRICS_CONFIG = [
    { name: 'Max Drawdown', value: 12.5, max: 100, unit: '%' },
    { name: 'Trades / Week', value: 68, max: 100, unit: '' }, 
    { name: 'Avg Hold Time', value: 14, max: 24, unit: 'h' },
];

// Color Logic
const getBarColor = (name: string, percentage: number) => {
    // Max Drawdown: Inverse Logic (Low is Good/Green, High is Bad/Red)
    if (name === 'Max Drawdown') {
        if (percentage <= 15) return '#10b981'; // Emerald-500 (Safe)
        if (percentage <= 30) return '#eab308'; // Yellow-500 (Caution)
        return '#ef4444'; // Red-500 (Danger)
    }
    
    // Others: Purple as requested
    return '#a855f7'; // Purple-500
};

// Data Transformation
const DATA = METRICS_CONFIG.map(item => {
    const percentage = (item.value / item.max) * 100;
    return {
        ...item,
        normalizedValue: percentage,
        fillColor: getBarColor(item.name, percentage)
    };
});

// Glassy/Zinc Tooltip Style (Matching AdvancedMetrics)
const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white/90 dark:bg-zinc-900/90 border border-white/20 dark:border-white/10 px-3 py-2 rounded-lg shadow-xl backdrop-blur-md min-w-[140px]">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: data.fillColor }} />
                        <span className="text-[10px] font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-widest leading-none">
                            {data.name}
                        </span>
                    </div>
                    <div className="flex items-end justify-between gap-4 mt-1">
                        <span className="text-xl font-black dark:text-white leading-none tracking-tight">
                            {data.value}{data.unit}
                        </span>
                        <span className="text-[9px] font-bold uppercase text-zinc-400">
                            Max: {data.max}{data.unit}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

// Custom Y-Axis Label
const CustomYAxisTick = (props: any) => {
    const { x, y, payload } = props;
    return (
        <g transform={`translate(${x},${y})`}>
            <text 
                x={-10} 
                y={4} 
                dy={0} 
                textAnchor="end" 
                fill="#71717a" 
                fontSize={10} 
                fontWeight={900} 
                style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
            >
                {payload.value}
            </text>
        </g>
    );
};

export const TradeActivity = () => {
    return (
        // Container matching AdvancedMetrics (Solid dark bg, no glass)
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/5 rounded-2xl p-5 flex flex-col h-full relative overflow-hidden shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 group">
            
            {/* Header */}
            <div className="relative z-10 flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg backdrop-blur-sm border border-white/10">
                        <Activity size={14} className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="text-[10px] uppercase font-black text-zinc-500 dark:text-zinc-400 tracking-widest">
                        Trading Activity
                    </span>
                </div>
                <button className="p-1 px-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors group/btn">
                    <ArrowUpRight size={14} className="text-zinc-400 group-hover/btn:text-purple-500 transition-colors" />
                </button>
            </div>

            {/* Chart Area */}
            <div className="relative z-10 h-[180px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                        data={DATA} 
                        layout="vertical" 
                        margin={{ top: 5, right: 45, left: 30, bottom: 5 }}
                        barSize={20}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="#a1a1aa" strokeOpacity={0.15} />
                        
                        <XAxis type="number" domain={[0, 100]} hide />
                        
                        <YAxis 
                            dataKey="name" 
                            type="category" 
                            tick={<CustomYAxisTick />} 
                            width={110}
                            axisLine={false}
                            tickLine={false}
                        />
                        
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                        
                        <Bar 
                            dataKey="normalizedValue" 
                            radius={[0, 4, 4, 0]} 
                            animationDuration={1500}
                        >
                            {DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fillColor} />
                            ))}
                            <LabelList 
                                dataKey="value" 
                                position="right" 
                                style={{ fill: '#71717a', fontSize: '11px', fontWeight: 900 }} 
                                formatter={(val: any) => {
                                    // Find the unit associated with this value
                                    const unit = METRICS_CONFIG.find(m => m.value === val)?.unit || '';
                                    return `${val}${unit}`;
                                }}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};