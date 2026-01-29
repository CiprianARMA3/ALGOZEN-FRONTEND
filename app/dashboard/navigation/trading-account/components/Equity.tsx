"use client";

import React, { useState } from 'react';
import { TrendingUp, ArrowUpRight, Wallet, Landmark } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ChartData {
  name: string;
  balance: number;
  equity: number;
}

const MOCK_DATA: ChartData[] = [
  { name: 'Jan', balance: 750, equity: 750 },
  { name: 'Jan 15', balance: 750, equity: 750 },
  { name: 'Feb', balance: 620, equity: 600 },
  { name: 'Feb 15', balance: 800, equity: 820 },
  { name: 'Mar', balance: 900, equity: 920 },
  { name: 'Mar 15', balance: 900, equity: 920 },
  { name: 'Apr', balance: 1100, equity: 1120 },
  { name: 'Apr 10', balance: 1100, equity: 1120 },
  { name: 'Apr 20', balance: 1350, equity: 1380 },
  { name: 'May', balance: 750, equity: 750 },
  { name: 'May 15', balance: 750, equity: 750 },
  { name: 'Jun', balance: 1100, equity: 1114 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white/80 p-4 shadow-2xl backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">{label}</p>
      <div className="space-y-2">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-xs font-medium text-zinc-400 capitalize">{entry.name}</span>
            </div>
            <span className="font-mono text-sm font-bold dark:text-white">
              ${Number(entry.value).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const TradingChart = () => {
  const [view, setView] = useState<'balance' | 'growth'>('balance');

  // FIXED: Explicitly return string to satisfy Recharts YAxis types
  const formatYAxis = (val: number): string => 
    val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val.toString();

  return (
    <div className="group flex flex-col rounded-3xl border  bg-white p-6 transition-all hover:shadow-2xl hover:shadow-indigo-500/5 0  dark:bg-[#111111] border-gray-200 dark:border-white/5">
      
      {/* Header Section */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
            <TrendingUp size={24} strokeWidth={2} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Portfolio</p>
            <h3 className="text-xl font-bold tracking-tight dark:text-zinc-100">Performance Equity</h3>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              <Wallet size={12} className="text-indigo-500" /> Balance
            </div>
            <p className="font-mono text-lg font-black dark:text-zinc-100">$1,114.28</p>
          </div>
          <div className="h-8 w-px bg-zinc-800/50" />
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              <Landmark size={12} className="text-purple-500" /> Equity
            </div>
            <p className="font-mono text-lg font-black dark:text-zinc-100">$2,478.28</p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex h-10 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-900">
          {(['balance', 'growth'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`flex items-center px-4 text-xs font-bold uppercase tracking-widest transition-all ${
                view === v 
                  ? 'rounded-lg bg-white shadow-sm dark:bg-zinc-800 dark:text-white' 
                  : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-8 h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={MOCK_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#3f3f46" opacity={0.1} />
            
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#71717a', fontSize: 11, fontWeight: 600 }}
              dy={15}
            />
            
            <YAxis 
              orientation="right"
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#71717a', fontSize: 11, fontWeight: 600 }}
              tickFormatter={formatYAxis}
            />

            <Tooltip 
              cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }} 
              content={<CustomTooltip />} 
            />

            <Line
              name="balance"
              type="monotone"
              dataKey="balance"
              stroke="#6366f1"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#6366f1' }}
            />
            
            <Line
              name="equity"
              type="monotone"
              dataKey="equity"
              stroke="#a855f7"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#a855f7' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-between border-t border-zinc-100 pt-6 dark:border-zinc-900">
        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          <span>Start: 2026.01.18</span>
          <span className="h-1 w-1 rounded-full bg-zinc-700" />
          <span>End: 2026.01.25</span>
        </div>
        <button className="group/btn flex items-center gap-2 text-xs font-bold text-indigo-500 transition-colors hover:text-indigo-400">
          Full Report <ArrowUpRight size={14} className="transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
};