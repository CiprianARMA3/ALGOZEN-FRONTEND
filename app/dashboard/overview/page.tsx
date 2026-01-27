"use client";

import React from 'react';
import { SummaryCards } from './components/SummaryCards';
import { PerformanceCharts } from './components/PerformanceCharts';
import { TradeHistory } from './components/TradeHistory';

export default function Overview() {
    return (
        <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto px-4 sm:px-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">

            {/* Main Header */}
            <div className="flex flex-col gap-1 sm:gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-white uppercase leading-none">
                    Performance <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">Overview</span>
                </h1>
                <p className="text-[8px] sm:text-[9px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.3em] ml-0.5 sm:ml-1">Portfolio Analytics</p>
            </div>

            {/* Dashboard Content - Full Width Vertical Layout */}
            <div className="flex flex-col gap-6">
                <SummaryCards />
                <PerformanceCharts />
                <TradeHistory />
            </div>
        </div>
    );
}