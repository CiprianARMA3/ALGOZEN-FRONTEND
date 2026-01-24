'use client';

import React from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

const AuroraBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-white">
    <style jsx>{`
      @keyframes sine-flow-1 {
        0%   { transform: translate(-20%, 10%) scale(1); opacity: 0.8; }
        25%  { transform: translate(10%, -10%) scale(1.1); opacity: 1; }
        50%  { transform: translate(40%, 10%) scale(0.8); opacity: 0.6; }
        75%  { transform: translate(10%, 30%) scale(0.9); opacity: 0.9; }
        100% { transform: translate(-20%, 10%) scale(1); opacity: 0.8; }
      }
      @keyframes sine-flow-2 {
        0%   { transform: translate(20%, -20%) scale(0.9); opacity: 0.7; }
        33%  { transform: translate(-10%, 0%) scale(1.1); opacity: 0.9; }
        66%  { transform: translate(30%, 20%) scale(1); opacity: 0.8; }
        100% { transform: translate(20%, -20%) scale(0.9); opacity: 0.7; }
      }
    `}</style>
    <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vh] bg-gradient-to-r from-blue-100/80 to-indigo-100/80 rounded-[100%] blur-[180px] mix-blend-multiply" style={{ animation: 'sine-flow-1 25s infinite ease-in-out' }} />
    <div className="absolute bottom-[-30%] right-[-10%] w-[70vw] h-[70vh] bg-gradient-to-l from-cyan-50/50 to-purple-200/50 rounded-[100%] blur-[150px] mix-blend-multiply" style={{ animation: 'sine-flow-2 30s infinite ease-in-out reverse' }} />
    <div className="absolute inset-0 opacity-[0.12] pointer-events-none" style={{ backgroundImage: "url('/grainy.png')", backgroundRepeat: 'repeat', backgroundSize: '120px 120px' }} />
    <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-white via-white/90 to-transparent" />
  </div>
);

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language].hero;

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-48 pb-12 overflow-hidden bg-white">
      <AuroraBackground />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 mb-8"
        >
          <Sparkles size={16} className="text-purple-600" />
          <span className="text-xs font-black uppercase tracking-[0.2em] text-purple-700">The Future of Trading</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-8xl font-black text-[#202124] tracking-tight leading-[0.9] mb-8 max-w-4xl"
        >
          {t.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-500 max-w-2xl mb-12 font-medium leading-relaxed"
        >
          {t.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-24"
        >
          <button className="px-10 py-5 bg-[#202124] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-2xl shadow-zinc-900/20 flex items-center gap-3 group">
            {t.ctaPrimary}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-10 py-5 bg-white text-[#202124] border-2 border-zinc-100 rounded-2xl font-black uppercase tracking-widest text-xs hover:border-zinc-300 transition-all flex items-center gap-3">
            {t.ctaSecondary}
            <Play size={16} fill="currentColor" />
          </button>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

          <div className="relative bg-white/80 backdrop-blur-xl border border-zinc-200 rounded-[2.5rem] shadow-[0_20px_100px_rgba(0,0,0,0.08)] overflow-hidden">
            {/* Mock Header */}
            <div className="h-14 border-b border-zinc-100 flex items-center justify-between px-8 bg-zinc-50/50">
              <div className="flex items-center gap-6">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                </div>
                <div className="h-4 w-px bg-zinc-200" />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t.previewTitle}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-zinc-100" />
                <div className="w-16 h-4 bg-zinc-100 rounded-md" />
              </div>
            </div>

            {/* Mock Body */}
            <div className="p-8 grid grid-cols-12 gap-6">
              <div className="col-span-8 space-y-6">
                <div className="grid grid-cols-3 gap-6">
                  {[t.marketIndices, t.marketCrypto, t.marketForex].map((label, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white border border-zinc-100 shadow-sm">
                      <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{label}</div>
                      <div className="text-xl font-black text-zinc-900">+4.2%</div>
                    </div>
                  ))}
                </div>
                <div className="h-64 rounded-3xl bg-zinc-50 border border-zinc-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.02)_50%,transparent_100%)] animate-pulse" />
                </div>
              </div>
              <div className="col-span-4 space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-4 rounded-2xl border border-zinc-50 bg-white shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-50" />
                      <div className="h-3 w-16 bg-zinc-100 rounded" />
                    </div>
                    <div className="h-2 w-8 bg-zinc-50 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
