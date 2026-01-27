"use client";

import React from 'react';
import { ChevronRight, ChevronLeft, ExternalLink } from 'lucide-react';

export const StatsCalendar = () => {
    return (
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/5 rounded-2xl p-4 sm:p-6 mb-10 overflow-hidden shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    <div>
                        <h3 className="text-[10px] sm:text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-1">Journal</h3>
                        <p className="text-base sm:text-lg font-bold dark:text-white">Stats Calendar</p>
                    </div>
                    <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none px-4 py-1.5 text-[10px] font-black uppercase tracking-widest bg-purple-600 text-white rounded-lg shadow-lg shadow-purple-500/20">Monthly</button>
                        <button className="flex-1 sm:flex-none px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">Yearly</button>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:gap-8">
                    <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-6">
                        <button className="px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-purple-600/10 text-purple-600 border border-purple-600/20 rounded-xl hover:bg-purple-600/20 transition-all">Today</button>
                        <div className="flex items-center gap-4">
                            <button className="p-2 text-zinc-400 hover:text-purple-500 dark:hover:text-white transition-all bg-gray-100 dark:bg-white/5 rounded-lg"><ChevronLeft size={16} /></button>
                            <span className="text-sm font-black dark:text-white min-w-[120px] sm:min-w-[140px] text-center tracking-tight">Nov 2024</span>
                            <button className="p-2 text-zinc-400 hover:text-purple-500 dark:hover:text-white transition-all bg-gray-100 dark:bg-white/5 rounded-lg"><ChevronRight size={16} /></button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 lg:gap-8 sm:pl-8 sm:border-l border-gray-100 dark:border-white/5">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-0.5">Monthly P&L</span>
                            <span className="text-[14px] sm:text-[16px] font-black dark:text-white tracking-tight">$1,371.97</span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                            <span className="text-[10px] sm:text-[11px] font-black text-emerald-500 bg-emerald-500/10 px-1.5 sm:px-2 py-1 rounded-lg">1.17%</span>
                        </div>
                        <button className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-all group shadow-xl">
                            <span className="hidden sm:inline">View Trades</span>
                            <ExternalLink size={12} strokeWidth={3} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Calendar Grid Container */}
            <div className="overflow-x-auto custom-scrollbar">
                <div className="min-w-[700px]">
                    <div className="grid grid-cols-8 border-b border-gray-100 dark:border-white/5 mb-4">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Week'].map((day) => (
                            <div key={day} className="py-3 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600 text-center">{day}</div>
                        ))}
                    </div>

                    <div className="grid grid-cols-8 gap-2">
                        {/* Row 1 example */}
                        {[28, 29, 30, 31].map(d => (
                            <div key={d} className="h-20 sm:h-28 bg-gray-50/50 dark:bg-[#0d0d0d] rounded-2xl p-3 flex flex-col justify-between border border-transparent opacity-40">
                                <span className="text-[11px] font-black text-zinc-400">{d}</span>
                            </div>
                        ))}
                        <div className="h-20 sm:h-28 bg-white dark:bg-[#0d0d0d] rounded-2xl p-3 flex flex-col justify-between border border-gray-100 dark:border-white/5 hover:border-purple-500/30 transition-all group cursor-pointer shadow-sm hover:shadow-xl">
                            <span className="text-[11px] font-black dark:text-white group-hover:text-purple-500 transition-colors">1 Nov</span>
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-lg">+$420</span>
                            </div>
                        </div>
                        <div className="h-20 sm:h-28 bg-white dark:bg-[#0d0d0d] rounded-2xl p-3 flex flex-col justify-between border border-gray-100 dark:border-white/5 hover:border-purple-500/30 transition-all group cursor-pointer shadow-sm hover:shadow-xl">
                            <span className="text-[11px] font-black dark:text-white group-hover:text-purple-500 transition-colors">2</span>
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-black text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded-lg">-$120</span>
                            </div>
                        </div>
                        <div className="h-20 sm:h-28 bg-white dark:bg-[#0d0d0d] rounded-2xl p-3 flex flex-col justify-between border border-gray-100 dark:border-white/5 hover:border-purple-500/30 transition-all group cursor-pointer shadow-sm hover:shadow-xl">
                            <span className="text-[11px] font-black dark:text-white group-hover:text-purple-500 transition-colors">3</span>
                        </div>
                        <div className="h-20 sm:h-28 bg-purple-600/5 rounded-2xl p-3 flex flex-col justify-center items-center gap-1 border border-purple-600/10">
                            <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">W44</span>
                            <span className="text-sm font-black text-purple-600">$300</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-end gap-2 mt-10">
                {['PROFIT', 'PROFIT %', 'R:R'].map((label) => (
                    <button key={label} className={`px-4 sm:px-5 py-2 text-[9px] font-black uppercase tracking-widest rounded-xl border transition-all ${label === 'PROFIT' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30 border-transparent' : 'bg-gray-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white border-transparent'}`}>
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
};
