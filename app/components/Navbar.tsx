'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    ChevronDown,
    Menu,
    X,
    LogOut,
    Search,
    ChevronRight,
    ArrowRight,
    Loader2
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { US, ES, PT, KR, CN, IT, DE, RO, RU } from 'country-flag-icons/react/3x2';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

const Flag = ({ code, className = "" }: { code: string, className?: string }) => {
    const flags: { [key: string]: React.ComponentType<{ className?: string }> } = {
        'US': US,
        'ES': ES,
        'PT': PT,
        'KR': KR,
        'CN': CN,
        'IT': IT,
        'DE': DE,
        'RO': RO,
        'RU': RU
    };
    const Component = flags[code];
    return Component ? <Component className={className} /> : null;
};

interface NavLink {
    name: string;
    href: string;
    sections?: {
        title: string;
        links: { name: string; href: string }[];
    }[];
}



const LANGUAGES = [
    { code: 'US', name: 'English' },
    { code: 'IT', name: 'Italiano' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'ES', name: 'Español' },
    { code: 'PT', name: 'Português' },
    { code: 'RO', name: 'Română' },
    { code: 'RU', name: 'Русский' },
];

const Navbar = ({ className = "" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [activeTopDropdown, setActiveTopDropdown] = useState<string | null>(null);
    const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const { language, setLanguage } = useLanguage();
    const t = translations[language].navbar;

    const TOP_LINKS = [
        {
            name: t.individuals,
            href: '/accounts/individual',
            sections: [
                {
                    title: t.overview.toUpperCase(),
                    links: [
                        { name: t.features, href: '/en/accounts/individual' },
                        { name: t.security, href: '/en/accounts/non-professional-advisor' },
                    ]
                }
            ]
        },
        {
            name: t.enterprises,
            href: '/accounts/institutions',
            sections: [
                {
                    title: t.portfolio.toUpperCase(),
                    links: [
                        { name: t.globalAnalyst, href: '/en/accounts/advisor' },
                        { name: t.portfolioAnalyst, href: '/en/accounts/family-office' },
                    ]
                },
                {
                    title: t.institutionalAccounts.toUpperCase(),
                    links: [
                        { name: t.hedgeFunds, href: '/en/accounts/hedge-fund' },
                        { name: t.propTrading, href: '/en/accounts/proprietary-trading-group' },
                    ]
                }
            ]
        },
        {
            name: t.support,
            href: '/support/home',
            sections: [
                {
                    title: t.helpCenter.toUpperCase(),
                    links: [
                        { name: t.fundAccount, href: '/en/support/fund-my-account' },
                        { name: t.browseFaqs, href: '/en/general/contact/ibot' },
                        { name: t.taxInfo, href: '/en/support/reports-and-dates' },
                    ]
                }
            ]
        },
        { name: t.careers, href: '/general/about/careers' },
        { name: t.aboutUs, href: '/general/about/info' },
    ];

    const MAIN_LINKS: NavLink[] = [
        {
            name: t.whyKapry,
            href: '/en/whyib/overview',
            sections: [
                {
                    title: t.overview.toUpperCase(),
                    links: [
                        { name: t.lowCommissions, href: '/en/whyib/overview.php' },
                        { name: t.globalAccess, href: '/en/trading/products-exchanges.php' },
                        { name: t.premierTech, href: '/en/trading/trading-platforms.php' },
                    ]
                }
            ]
        },
        {
            name: t.pricing,
            href: '/en/pricing/commissions-home',
            sections: [
                {
                    title: t.fees.toUpperCase(),
                    links: [
                        { name: t.commissions, href: '/en/pricing/commissions-home.php' },
                        { name: t.marginRates, href: '/en/trading/margin-rates.php' },
                        { name: t.interestRates, href: '/en/accounts/fees/pricing-interest-rates.php' },
                    ]
                }
            ]
        },
        {
            name: t.trading,
            href: '/en/trading/trading-platforms',
            sections: [
                {
                    title: t.platforms.toUpperCase(),
                    links: [
                        { name: t.tws, href: '/en/trading/tws.php' },
                        { name: t.mobile, href: '/en/trading/ibkr-mobile.php' },
                        { name: t.clientPortal, href: '/en/trading/client-portal.php' },
                    ]
                }
            ]
        },
        {
            name: t.services,
            href: '/en/trading/globalanalyst',
            sections: [
                {
                    title: t.portfolio.toUpperCase(),
                    links: [
                        { name: t.globalAnalyst, href: '/en/trading/globalanalyst.php' },
                        { name: t.portfolioAnalyst, href: '/en/portfolioanalyst/overview.php' },
                    ]
                }
            ]
        },
        {
            name: t.education,
            href: '/campus/',
            sections: [
                {
                    title: t.resources.toUpperCase(),
                    links: [
                        { name: t.campus, href: '/campus/' },
                        { name: t.academy, href: '/campus/academy' },
                        { name: t.news, href: '/campus/news' },
                    ]
                }
            ]
        },
    ];

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 40);
    });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isSearchOpen) {
                setIsSearchOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSearchOpen]);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                setUser(user);
            } catch (error) {
                console.error('Auth error:', error);
            } finally {
                setLoading(false);
            }
        };
        checkUser();
    }, [supabase]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.reload();
    };

    return (
        <div className={`fixed top-0 left-0 right-0 z-[100] flex flex-col items-center pointer-events-none ${className}`}>

            {/* 1. BANDAID (ANNOUNCEMENT) bg-[#fbbc04] old ,green-300,purple-300   */}
            <div className="w-full bg-purple-300 pointer-events-auto overflow-hidden shadow-sm min-h-fit">
                <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-center gap-x-2 gap-y-1 text-[11px] font-bold text-black text-center h-full">
                    <span>{translations[language].hero.announcement}</span>
                    <div className="flex gap-x-3 gap-y-1 flex-wrap justify-center items-center">
                        <a href="/auth/login" className="underline hover:opacity-70 transition-opacity">{t.login}</a>
                        <span className="opacity-20 text-[8px]">|</span>
                        <a href="#" className="underline hover:opacity-70 transition-opacity">{translations[language].hero.viewMarkets}</a>
                        <span className="hidden sm:inline opacity-20 text-[8px]">|</span>
                        <a href="#" className="underline hover:opacity-70 transition-opacity hidden sm:inline">{translations[language].hero.learnMore}</a>
                    </div>
                </div>
            </div>

            {/* 2. TOP NAV (SECONDARY) */}
            <div className="w-full bg-[#1a1c1e] pointer-events-auto border-b border-white/5 hidden md:block">
                <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {TOP_LINKS.filter(link => link.sections).map((link) => (
                            <div
                                key={link.name}
                                className="relative h-9 flex items-center group"
                                onMouseEnter={() => setActiveTopDropdown(link.name)}
                                onMouseLeave={() => setActiveTopDropdown(null)}
                            >
                                <button className="text-[10px] font-normal text-zinc-300 hover:text-white transition-colors flex items-center gap-1 cursor-default tracking-wide uppercase">
                                    {link.name}
                                    <motion.div
                                        animate={{ rotate: activeTopDropdown === link.name ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ChevronDown size={10} strokeWidth={3} />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {activeTopDropdown === link.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 0 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 0 }}
                                            className="absolute top-full left-0 bg-[#1a1c1e] border border-white/10 shadow-2xl p-6 rounded-b-lg z-[120] min-w-[max-content] flex gap-8"
                                        >
                                            {link.sections?.map((section, idx) => (
                                                <div key={idx} className="flex flex-col gap-3 min-w-[200px]">
                                                    <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest border-b border-white/5 pb-2">
                                                        {section.title}
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        {section.links.map((sublink, sidx) => (
                                                            <a
                                                                key={sidx}
                                                                href={sublink.href}
                                                                className="text-[11px] font-medium text-zinc-400 hover:text-white transition-colors py-0.5"
                                                            >
                                                                {sublink.name}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-6">
                        {TOP_LINKS.filter(link => !link.sections).map((link) => (
                            <a key={link.name} href={link.href} className="text-[10px] font-normal text-zinc-300 hover:text-white transition-colors tracking-wide uppercase">
                                {link.name}
                            </a>
                        ))}
                        <div className="h-4 w-px bg-white/10" />
                        <div
                            className="relative h-9 flex items-center"
                            onMouseEnter={() => setIsLangOpen(true)}
                            onMouseLeave={() => setIsLangOpen(false)}
                        >
                            <button className="flex items-center gap-2 text-[10px] font-normal text-zinc-300 hover:text-white transition-colors uppercase cursor-default">
                                {LANGUAGES.find(l => l.code === language)?.name}
                                <div className="w-4 h-auto flex items-center">
                                    <Flag code={language} className="w-full rounded-[1px] shadow-sm" />
                                </div>
                            </button>

                            <AnimatePresence>
                                {isLangOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 0 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 0 }}
                                        className="absolute top-full right-0 bg-[#1a1c1e] border border-white/10 shadow-2xl py-2 rounded-b-lg z-[120] min-w-[140px]"
                                    >
                                        {LANGUAGES.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    setLanguage(lang.code as any);
                                                    setIsLangOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-2 text-[10px] uppercase tracking-wide transition-colors flex items-center justify-between group ${language === lang.code ? 'text-white bg-white/5' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                                            >
                                                <span>{lang.name}</span>
                                                <div className="w-4 h-auto">
                                                    <Flag code={lang.code} className="w-full rounded-[1px]" />
                                                </div>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. MAIN NAV (PRIMARY) */}
            <motion.nav
                layout
                initial={false}
                animate={{
                    width: isScrolled ? "min(100%, 95%)" : "100%",
                    marginTop: isScrolled ? 8 : 0,
                    borderRadius: isScrolled
                        ? (isSearchOpen ? "12px 12px 0px 0px" : "12px")
                        : "0px",
                    boxShadow: isScrolled ? "0 10px 40px -10px rgba(0,0,0,0.15)" : "none",
                }}
                className={`
                    w-full bg-white pointer-events-auto
                    h-[64px] md:h-[72px] flex items-center justify-center
                    border-b border-zinc-100 transition-all duration-300
                    ${isScrolled ? 'border-2 border-zinc-100/50' : ''}
                `}
            >
                <div className="max-w-7xl w-full px-4 flex items-center justify-between gap-8 h-full">
                    {/* LOGO */}
                    <div className="flex items-center shrink-0">
                        <a href="/" className="flex items-center gap-1 group">
                            <span className="text-xl md:text-2xl font-normal tracking-tighter text-[#202124]">
                                Invest <span className="text-purple-600 font-bold">ZEN</span>
                            </span>
                        </a>
                    </div>

                    {/* DESKTOP NAV */}
                    <div className="hidden lg:flex items-center gap-1 h-full">
                        {MAIN_LINKS.map((link) => (
                            <div
                                key={link.name}
                                className="relative h-full flex items-center px-4 hover:bg-zinc-50 transition-colors"
                                onMouseEnter={() => setActiveDropdown(link.name)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <button className="flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-[#202124]">
                                    {link.name}
                                    <ChevronDown size={12} strokeWidth={3} className="text-zinc-400" />
                                </button>

                                <AnimatePresence>
                                    {activeDropdown === link.name && link.sections && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute top-full left-0 bg-white border-2 border-zinc-100 shadow-2xl p-6 rounded-xl z-[110] min-w-[max-content] flex gap-8"
                                        >
                                            {link.sections.map((section, idx) => (
                                                <div key={idx} className="flex flex-col gap-3 min-w-[180px]">
                                                    <div className="text-[9px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-50 pb-2">
                                                        {section.title}
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        {section.links.map((sublink, sidx) => (
                                                            <a
                                                                key={sidx}
                                                                href={sublink.href}
                                                                className="py-1.5 px-2 -mx-2 hover:bg-zinc-50 rounded-lg text-xs font-bold text-zinc-900 flex justify-between items-center group/item transition-colors"
                                                            >
                                                                {sublink.name}
                                                                <ChevronRight size={14} className="opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all text-zinc-300" />
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* SEARCH & ACTIONS */}
                    <div className="hidden lg:flex items-center gap-4">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className={`p-2 transition-colors rounded-lg ${isSearchOpen ? 'bg-purple-50 text-purple-600' : 'text-zinc-500 hover:text-black hover:bg-zinc-50'}`}
                            aria-label="Toggle Search"
                        >
                            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
                        </motion.button>

                        <div className="h-6 w-px bg-zinc-200" />

                        {loading ? (
                            <Loader2 size={18} className="animate-spin text-zinc-400" />
                        ) : (
                            <div className="flex items-center gap-3">
                                {user ? (
                                    <>
                                        <a href="/dashboard" className="text-[11px] font-black uppercase tracking-widest text-[#202124] hover:text-purple-600 transition-colors">{t.portal}</a>
                                        <button onClick={handleLogout} className="p-2 text-zinc-400 hover:text-red-600 transition-colors">
                                            <LogOut size={18} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <a href="/auth/login" className="text-[11px] font-black uppercase tracking-widest text-[#202124] hover:text-purple-600 transition-colors">{t.login}</a>
                                        <a href="/auth/register" className="bg-[#202124] text-white px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-lg shadow-zinc-900/10">
                                            {t.openAccount}
                                        </a>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* MOBILE TRIGGER */}
                    <div className="lg:hidden flex items-center gap-4">
                        {user ? (
                            <motion.a
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                href="/dashboard"
                                className="bg-[#202124] text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest"
                            >
                                {t.portal}
                            </motion.a>
                        ) : (
                            <motion.a
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                href="/auth/register"
                                className="bg-[#202124] text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest"
                            >
                                {t.openAccount}
                            </motion.a>
                        )}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-[#202124] p-1 transition-transform"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* DESKTOP SEARCH EXPANSION */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            width: isScrolled ? "min(100%, 95%)" : "100%",
                            marginTop: 0,
                            borderRadius: isScrolled ? "0px 0px 12px 12px" : "0px",
                            boxShadow: isScrolled ? "0 20px 40px -10px rgba(0,0,0,0.15)" : "0 20px 40px -10px rgba(0,0,0,0.1)",
                        }}
                        exit={{ opacity: 0, y: -5 }}
                        className="bg-white border-x border-b border-zinc-100 pointer-events-auto overflow-hidden z-[90] -mt-[1px]"
                    >
                        <div className="max-w-7xl mx-auto px-4 py-8">
                            <div className="relative max-w-3xl mx-auto">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder={t.searchPlaceholder}
                                    className="w-full bg-zinc-50 border-2 border-zinc-100 rounded-2xl py-5 pl-12 pr-32 text-lg font-medium focus:outline-none focus:border-purple-600/30 transition-all shadow-inner"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest bg-zinc-100 px-2 py-1 rounded-md">{t.esc}</span>
                                    <button className="bg-[#202124] text-white px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-black transition-all shadow-lg shadow-zinc-900/20">
                                        {t.searchButton}
                                    </button>
                                </div>
                            </div>

                            {/* Suggested Searches */}
                            <div className="max-w-3xl mx-auto mt-6 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                                <span>{t.suggested}:</span>
                                <div className="flex gap-4">
                                    <a href="#" className="text-purple-600 hover:underline">Pricing</a>
                                    <a href="#" className="hover:text-zinc-900 transition-colors">Client Portal</a>
                                    <a href="#" className="hover:text-zinc-900 transition-colors">Margins</a>
                                    <a href="#" className="hover:text-zinc-900 transition-colors">Tax Forms</a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MOBILE MENU (IBKR STYLE OVERHAUL) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[200] bg-white pointer-events-auto overflow-hidden flex flex-col"
                    >
                        {/* 1. MOBILE HEADER */}
                        <div className="flex items-center justify-between p-4 border-b border-zinc-100">
                            <a href="/" className="flex items-center gap-1">
                                <span className="text-xl font-normal tracking-tighter text-[#202124]">
                                    Invest <span className="text-purple-600 font-bold">ZEN</span>
                                </span>
                            </a>
                            <button onClick={() => setIsOpen(false)} className="p-2 text-zinc-400">
                                <X size={24} />
                            </button>
                        </div>

                        {/* 2. MOBILE SEARCH */}
                        <div className="p-4 bg-zinc-50">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                                <input
                                    type="text"
                                    placeholder={t.askQuestion}
                                    className="w-full bg-white border border-zinc-200 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600/20 text-black"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#202124] text-white p-1.5 rounded-md hover:bg-black transition-colors">
                                    <Search size={14} />
                                </button>
                            </div>
                        </div>

                        {/* 3. MOBILE CONTENT (LIST SHIFT) */}
                        <div className="flex-1 overflow-y-auto relative">
                            <AnimatePresence mode="wait">
                                {!mobileSubmenu ? (
                                    <motion.div
                                        key="root"
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -20, opacity: 0 }}
                                        className="divide-y divide-zinc-50"
                                    >
                                        {user ? (
                                            <button onClick={handleLogout} className="w-full text-left p-5 text-red-600 font-black uppercase tracking-widest text-xs border-b border-zinc-100 bg-red-50/30 hover:bg-red-50 transition-colors">
                                                {t.logout}
                                            </button>
                                        ) : (
                                            <a href="/auth/login" className="block p-5 text-purple-600 font-black uppercase tracking-widest text-xs border-b border-zinc-100 bg-purple-50/30">{t.portalLogin}</a>
                                        )}

                                        {/* Main Submenus (Pricing, Trading, etc.) */}
                                        {MAIN_LINKS.concat(TOP_LINKS.filter(l => l.sections)).map((link) => (
                                            <button
                                                key={link.name}
                                                onClick={() => setMobileSubmenu(link.name)}
                                                className="w-full flex justify-between items-center p-5 text-sm font-bold text-zinc-900 border-b border-zinc-100 hover:bg-zinc-50 transition-colors"
                                            >
                                                <span className="uppercase tracking-widest text-[11px] font-black">{link.name}</span>
                                                <ChevronRight size={18} className="text-zinc-300" />
                                            </button>
                                        ))}

                                        {/* Static Top Links */}
                                        {TOP_LINKS.filter(l => !l.sections).map((link) => (
                                            <a
                                                key={link.name}
                                                href={link.href}
                                                className="block p-5 text-[11px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-100 hover:bg-zinc-50 transition-colors"
                                            >
                                                {link.name}
                                            </a>
                                        ))}

                                        {/* Language Selector Mobile Link */}
                                        <button
                                            onClick={() => setMobileSubmenu('Language')}
                                            className="w-full flex justify-between items-center p-5 text-sm font-bold text-zinc-900 border-b border-zinc-100 hover:bg-zinc-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="uppercase tracking-widest text-[11px] font-black">{t.language}</span>
                                                <span className="text-xs text-zinc-400 flex items-center gap-1">
                                                    ({LANGUAGES.find(l => l.code === language)?.name} <Flag code={language} className="w-4 h-auto rounded-[1px] inline-block mb-0.5 ml-1" />)
                                                </span>
                                            </div>
                                            <ChevronRight size={18} className="text-zinc-300" />
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="submenu"
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: 20, opacity: 0 }}
                                        className="bg-white min-h-full"
                                    >
                                        <button
                                            onClick={() => setMobileSubmenu(null)}
                                            className="w-full p-4 flex items-center gap-2 text-xs font-bold text-zinc-400 border-b border-zinc-100 hover:bg-zinc-50"
                                        >
                                            <ChevronDown className="rotate-90" size={16} />
                                            {t.back.toUpperCase()}
                                        </button>
                                        <div className="p-6">
                                            <div className="text-[10px] font-black text-purple-600 uppercase tracking-[0.3em] mb-6">
                                                {mobileSubmenu}
                                            </div>

                                            {/* Sections for Submenu */}
                                            {mobileSubmenu === 'Language' ? (
                                                <div className="space-y-1">
                                                    {LANGUAGES.map((lang) => (
                                                        <button
                                                            key={lang.code}
                                                            onClick={() => {
                                                                setLanguage(lang.code as any);
                                                                setMobileSubmenu(null);
                                                                setIsOpen(false);
                                                            }}
                                                            className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${language === lang.code ? 'border-purple-600 bg-purple-50' : 'border-zinc-100 hover:bg-zinc-50'}`}
                                                        >
                                                            <span className={`text-sm font-bold ${language === lang.code ? 'text-purple-700' : 'text-zinc-900'}`}>{lang.name}</span>
                                                            <div className="w-6 h-auto">
                                                                <Flag code={lang.code} className="w-full rounded-sm shadow-sm" />
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            ) : (
                                                ([...MAIN_LINKS, ...TOP_LINKS].find(l => l.name === mobileSubmenu)?.sections || [
                                                    { title: mobileSubmenu, links: [{ name: 'Overview', href: '#' }, { name: 'Details', href: '#' }] }
                                                ] as { title: string; links: { name: string; href: string }[] }[]).map((section, sidx) => (
                                                    <div key={sidx} className="mb-8 last:mb-0">
                                                        <div className="text-[9px] font-black text-purple-600 uppercase tracking-widest mb-4 border-l-2 border-purple-600 pl-3">
                                                            {section.title}
                                                        </div>
                                                        <div className="space-y-4">
                                                            {section.links.map((sub, lidx) => (
                                                                <a
                                                                    key={lidx}
                                                                    href={sub.href}
                                                                    className="block text-sm font-bold text-zinc-800 hover:text-purple-600 transition-colors border-b border-zinc-50 last:border-0 pb-3 last:pb-0"
                                                                >
                                                                    {sub.name}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* 4. MOBILE FOOTER */}
                        <div className="p-4 border-t border-zinc-100 bg-white">
                            {user ? (
                                <a href="/dashboard" className="block w-full py-4 bg-[#202124] text-white text-center rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-zinc-900/20">
                                    {t.portal}
                                </a>
                            ) : (
                                <a href="/auth/register" className="block w-full py-4 bg-[#202124] text-white text-center rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-zinc-900/20">
                                    {t.openAccount}
                                </a>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Navbar;