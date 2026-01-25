"use client";

import {
    LayoutGrid,
    KanbanSquare,
    Calendar,
    Workflow,
    Bot,
    ChevronRight,
    LogOut,
    Search,
    Settings,
    UserCog,
    BrainCog,
    Route,
    GitBranch,
    ClipboardCheck,
    Database,
    Logs,
    PanelLeftClose,
    PanelLeftOpen,
    Menu as MenuIcon,
    X,
    Bell,
    Activity,
    User as UserIcon,
    ChevronDown,
    Loader2,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuProps {
    project: any;
    user: any;
    isCollapsed: boolean;
    onToggle: () => void;
}

const isKeyboardEvent = (e: React.FormEvent | React.KeyboardEvent<HTMLInputElement>): e is React.KeyboardEvent<HTMLInputElement> => {
    return (e as React.KeyboardEvent<HTMLInputElement>).key !== undefined;
};

// Mock Account Data
const ACCOUNTS = [
    { id: '1', broker: 'MT5', name: 'MetaTrader 5 Live', balance: 12450.00, currency: '$', logo: '/Terminal.ico' },
    { id: '2', broker: 'Capital.com', name: 'Capital.com Trading', balance: 3500.50, currency: '$', logo: '/capitalcom.svg' },
];

// Extracted SidebarContent Component used to prevent re-renders
const SidebarContent = ({
    collapsed = false,
    isMobile = false,
    selectedAccount,
    setSelectedAccount,
    isAccountSelectOpen,
    setIsAccountSelectOpen,
    filteredSections,
    isActive,
    signOut,
    onToggle
}: {
    collapsed?: boolean;
    isMobile?: boolean;
    selectedAccount: any;
    setSelectedAccount: (acc: any) => void;
    isAccountSelectOpen: boolean;
    setIsAccountSelectOpen: (val: boolean) => void;
    filteredSections: any[];
    isActive: (href: string) => boolean;
    signOut: () => void;
    onToggle: () => void;
}) => (
    <div className="flex flex-col h-full bg-white dark:bg-[#0a0a0a]">
        {/* Sidebar Top: Account Selection */}
        <div className={`h-[52px] flex items-center justify-center border-b border-gray-200 dark:border-white/[0.03] relative ${collapsed && !isMobile ? 'px-0' : 'px-2'}`}>
            <div className="relative w-full">
                <button
                    onClick={() => {
                        if (collapsed && !isMobile) {
                            onToggle();
                            // Open account selector after menu expands
                            setTimeout(() => setIsAccountSelectOpen(true), 300);
                        } else {
                            setIsAccountSelectOpen(!isAccountSelectOpen);
                        }
                    }}
                    className={`flex items-center gap-3 w-full px-3 py-2 bg-transparent hover:bg-gray-100 dark:hover:bg-white/5 rounded transition-all text-left group`}
                >
                    <div className="w-6 h-6 rounded bg-gray-100 dark:bg-white/5 flex items-center justify-center overflow-hidden shrink-0 border border-gray-200 dark:border-white/5">
                        <img src={selectedAccount.logo} alt={selectedAccount.broker} className="w-full h-full object-contain transition-all duration-300 ease-in-out" />
                    </div>
                    {(!collapsed || isMobile) && (
                        <>
                            <div className="flex flex-col leading-none flex-1 min-w-0">
                                <span className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300 truncate">{selectedAccount.name}</span>
                                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-500">{selectedAccount.currency}{selectedAccount.balance.toLocaleString()}</span>
                            </div>
                            <ChevronDown size={12} className={`text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-transform ${isAccountSelectOpen ? 'rotate-180' : ''}`} />
                        </>
                    )}
                </button>

                <AnimatePresence>
                    {isAccountSelectOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: (collapsed && !isMobile) ? 20 : 0, y: (collapsed && !isMobile) ? 0 : 8 }}
                            animate={{ opacity: 1, x: (collapsed && !isMobile) ? 10 : 0, y: (collapsed && !isMobile) ? 0 : 4 }}
                            exit={{ opacity: 0, x: (collapsed && !isMobile) ? 20 : 0, y: (collapsed && !isMobile) ? 0 : 8 }}
                            className={`absolute bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-lg shadow-2xl z-[100] p-1 overflow-hidden min-w-[200px]
              ${(collapsed && !isMobile) ? 'left-full top-0 ml-2' : 'top-full left-1/2 -translate-x-1/2 mt-1'}
            `}
                        >
                            <div className="px-3 py-2 text-[9px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-600 border-b border-gray-100 dark:border-white/5 mb-1">
                                Broker Accounts
                            </div>
                            {ACCOUNTS.map((acc) => (
                                <button
                                    key={acc.id}
                                    onClick={() => {
                                        setSelectedAccount(acc);
                                        setIsAccountSelectOpen(false);
                                    }}
                                    className={`flex items-center gap-3 w-full px-3 py-2.5 rounded transition-all hover:bg-gray-50 dark:hover:bg-white/5 text-left group
                  ${selectedAccount.id === acc.id ? 'bg-gray-50 dark:bg-white/[0.02]' : ''}
                `}
                                >
                                    <div className="w-7 h-7 rounded bg-gray-100 dark:bg-white/5 flex items-center justify-center overflow-hidden shrink-0 border border-gray-200 dark:border-white/5 p-1">
                                        <img src={acc.logo} alt={acc.broker} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex flex-col leading-none flex-1">
                                        <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">{acc.name}</span>
                                        <span className="text-[10px] font-mono text-emerald-600/80 dark:text-emerald-500/80">{acc.currency}{acc.balance.toLocaleString()}</span>
                                    </div>
                                    {selectedAccount.id === acc.id && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                    )}
                                </button>
                            ))}
                            <div className="mt-1 p-2 border-t border-gray-100 dark:border-white/5">
                                <button className="text-[10px] font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors flex items-center gap-2 px-1 w-full">
                                    <div className="w-4 h-4 rounded-full border border-dashed border-zinc-400 dark:border-zinc-700 flex items-center justify-center text-[10px]">+</div>
                                    Add Account
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>

        <nav className="flex-1 overflow-y-auto overflow-x-hidden pt-4 px-2 space-y-6 custom-scrollbar">
            {filteredSections.map((section, index) => (
                <div key={section.title} className="space-y-1">
                    {collapsed && !isMobile && index > 0 && (
                        <div className="h-px bg-gray-200 dark:bg-white/5 my-2 mx-2" />
                    )}
                    {(!collapsed || isMobile) && (
                        <h3 className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-600 font-bold px-3 mb-2">
                            {section.title}
                        </h3>
                    )}

                    <div className="space-y-0.5">
                        {section.items.map((item: any) => {
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`
                  group flex items-center gap-2.5 px-2 py-2 rounded text-[12px] font-bold transition-all duration-150 
                  ${active ?
                                            "bg-blue-50 text-blue-600 dark:bg-blue-500/20 dark:text-white border-l-2 border-blue-500 rounded-l-none" :
                                            "text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 hover:bg-gray-100 dark:hover:bg-white/[0.03]"
                                        }
                `}
                                    title={collapsed && !isMobile ? item.label : ""}
                                >
                                    <item.icon className={`
                  w-4 h-4 shrink-0 transition-all duration-300 ease-in-out
                  ${active ? "text-blue-500 dark:text-blue-400" : "text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400"}
                `} />

                                    {(!collapsed || isMobile) && (
                                        <span className="whitespace-nowrap transition-opacity duration-200">
                                            {item.label}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ))}
        </nav>

        <div className={`border-t border-gray-200 dark:border-white/[0.03] py-4 ${collapsed && !isMobile ? 'px-0' : 'px-4'}`}>
            <button
                onClick={() => signOut()}
                className={`flex items-center gap-3 w-full px-4 py-2 text-[10px] font-bold text-zinc-500 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors`}
                title={collapsed && !isMobile ? "Sign Out" : ""}
            >
                <LogOut className="w-4 h-4 transition-all duration-300 ease-in-out" />
                {(!collapsed || isMobile) && <span>Exit</span>}
            </button>
        </div>
    </div>
);

export default function Menu({ project, user, isCollapsed, onToggle }: MenuProps) {
    const pathname = usePathname();
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(ACCOUNTS[0]);
    const [isAccountSelectOpen, setIsAccountSelectOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    // Close mobile search on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isMobileSearchOpen) {
                setIsMobileSearchOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isMobileSearchOpen]);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const allSections = [
        {
            title: "Navigation",
            items: [
                { label: "Dashboard", icon: LayoutGrid, href: `/dashboard/projects/${project.id}` },
                { label: "Market Overview", icon: Activity, href: `/dashboard/projects/${project.id}/market` },
            ],
        },
        {
            title: "Development",
            items: [
                { label: "Tasks", icon: ClipboardCheck, href: `/dashboard/projects/${project.id}/development/tasks` },
            ],
        },
        {
            title: "Artificial Intelligence",
            items: [
                { label: "AI Assistant", icon: Activity, href: `/dashboard/projects/${project.id}/ai/ai-assistant` },
            ],
        },
        {
            title: "Configure",
            items: [
                { label: "Settings", icon: Settings, href: `/dashboard/projects/${project.id}/settings/project-settings` },
            ],
        },
    ];

    const filteredSections = useMemo(() => {
        if (loading) return [];
        return allSections.map(section => {
            const allowedItems = section.items.filter(item => {
                const pathSuffix = item.href.replace(`/dashboard/projects/${project.id}`, '');
                if (pathSuffix === '' || pathSuffix === '/') return true;
                return true;
            });
            return { ...section, items: allowedItems };
        }).filter(section => section.items.length > 0);
    }, [allSections, loading, project.id]);

    const isActive = (href: string) => pathname === href;

    const availableRoutes = useMemo(() => {
        return filteredSections.flatMap(section => section.items).map(item => ({
            label: item.label,
            href: item.href,
        }));
    }, [filteredSections]);

    const filteredResults = availableRoutes.filter(route =>
        route.label.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);

    const isDropdownOpen = searchQuery.length > 0;

    const handleResultClick = (href: string) => {
        setSearchQuery('');
        router.push(href);
    };

    const handleSearchSubmit = (e: React.FormEvent | React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const query = searchQuery.trim();
        if (isKeyboardEvent(e) && e.key === 'Enter' && filteredResults.length > 0) {
            handleResultClick(filteredResults[0].href);
            return;
        }
        if (query) {
            router.push(`/dashboard/projects/${project.id}/search?q=${encodeURIComponent(query)}`);
            setSearchQuery('');
        }
    };

    const signOut = () => console.log("Sign out (Mock)");

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-[#0A0A0A]">
                <Loader2 className="w-10 h-10 animate-spin text-purple-600 mb-4" strokeWidth={3} />
            </div>
        );
    }

    return (
        <>
            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; height: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.03); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.06); }
      `}</style>

            {/* Header */}
            <header className={`fixed top-0 left-0 right-0 h-[52px] bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-white/[0.03] z-[40] flex items-center justify-between px-4 ${isCollapsed ? 'lg:ml-12' : 'lg:ml-52'} ml-0 transition-all duration-300 ease-in-out`}>
                {/* Left: Toggle & Search (Desktop) / Menu Button (Mobile) */}
                <div className="flex items-center gap-4 w-1/3">
                    {/* Desktop Toggle */}
                    <button
                        onClick={onToggle}
                        className="hidden lg:flex p-1.5 hover:bg-gray-100 dark:hover:bg-white/5 rounded text-zinc-500 transition-colors"
                    >
                        {isCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
                    </button>

                    {/* Desktop Search Bar */}
                    <div className="hidden lg:block relative group w-full max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 dark:text-zinc-600 group-focus-within:text-purple-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Symbol or Company name"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-gray-100 dark:bg-[#1a1a1a] border border-transparent text-[12px] text-zinc-900 dark:text-zinc-300 rounded pl-9 pr-4 py-1.5 w-full focus:outline-none focus:border-black/5 dark:focus:border-white/10 transition-all placeholder:text-zinc-500 dark:placeholder:text-zinc-600"
                        />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="flex lg:hidden p-1.5 text-zinc-500"
                    >
                        <MenuIcon size={20} />
                    </button>
                </div>

                {/* Center: Brand */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-md font-normal tracking-tight text-black dark:text-white/90 ">
                            Invest <span className="text-purple-600 dark:text-purple-300 font-black tracking-tighter shadow-purple-500/20">ZEN</span>
                        </span>
                    </Link>
                </div>

                {/* Right: Stats & User (Desktop) / Search Icon (Mobile) */}
                <div className="flex items-center justify-end gap-6 w-1/3">
                    {/* Desktop Stats */}
                    <div className="hidden xl:flex items-center gap-6">
                        <div className="flex flex-col items-end">
                            <span className="text-[9px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">Net Liquidity</span>
                            <span className="text-[11px] font-mono text-black dark:text-white/90">2,114,718 EUR</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[9px] uppercase font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">Daily P&L</span>
                            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-500">7,621.04 EUR</span>
                        </div>
                    </div>

                    {/* Desktop User Icons */}
                    <div className="hidden lg:flex items-center gap-3 border-l border-gray-200 dark:border-white/5 pl-6">
                        <button className="text-zinc-400 hover:text-black dark:text-zinc-500 dark:hover:text-white transition-colors relative">
                            <Bell size={18} />
                            <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 rounded-full border border-white dark:border-[#0d0d0d]" />
                        </button>
                        <div className="w-7 h-7 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-white/10 cursor-pointer transition-colors">
                            <UserIcon size={16} />
                        </div>
                    </div>

                    {/* Mobile Icons */}
                    <div className="flex lg:hidden items-center gap-3">
                        {/* Mobile User Icon */}


                        {/* Mobile Search Icon */}
                        <button
                            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                            className={`p-1.5 rounded transition-colors ${isMobileSearchOpen ? 'bg-purple-50 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400' : 'text-zinc-500 hover:bg-gray-100 dark:hover:bg-white/5'}`}
                        >
                            {isMobileSearchOpen ? <X size={18} /> : <Search size={18} />}
                        </button>
                        <div className="w-7 h-7 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-white/10 cursor-pointer transition-colors">
                            <UserIcon size={16} />
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Search Dropdown */}
            <AnimatePresence>
                {isMobileSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="fixed top-[52px] left-0 right-0 bg-white dark:bg-[#0d0d0d] border-b border-gray-200 dark:border-white/[0.03] z-[39] lg:hidden shadow-lg"
                    >
                        <div className="px-4 py-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-600" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Symbol or Company name"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearchSubmit(e);
                                            setIsMobileSearchOpen(false);
                                        }
                                    }}
                                    className="w-full bg-gray-100 dark:bg-[#1a1a1a] border-2 border-gray-200 dark:border-white/10 text-sm text-zinc-900 dark:text-zinc-300 rounded-lg pl-10 pr-20 py-3 focus:outline-none focus:border-purple-600/30 dark:focus:border-purple-500/30 transition-all placeholder:text-zinc-500 dark:placeholder:text-zinc-600"
                                />
                                <button
                                    onClick={() => {
                                        if (searchQuery.trim()) {
                                            handleSearchSubmit(new Event('submit') as any);
                                            setIsMobileSearchOpen(false);
                                        }
                                    }}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 dark:bg-purple-500 text-white px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isCollapsed ? 48 : 208 }}
                transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
                className="hidden lg:block fixed inset-y-0 left-0 bg-white dark:bg-[#0a0a0a] border-r border-gray-200 dark:border-white/5 z-[50] overflow-hidden"
            >
                <SidebarContent
                    collapsed={isCollapsed}
                    selectedAccount={selectedAccount}
                    setSelectedAccount={setSelectedAccount}
                    isAccountSelectOpen={isAccountSelectOpen}
                    setIsAccountSelectOpen={setIsAccountSelectOpen}
                    filteredSections={filteredSections}
                    isActive={isActive}
                    signOut={signOut}
                    onToggle={onToggle}
                />
            </motion.aside>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-[#0a0a0a] border-r border-gray-200 dark:border-white/10 z-[110] lg:hidden"
                        >
                            <SidebarContent
                                isMobile={true}
                                selectedAccount={selectedAccount}
                                setSelectedAccount={setSelectedAccount}
                                isAccountSelectOpen={isAccountSelectOpen}
                                setIsAccountSelectOpen={setIsAccountSelectOpen}
                                filteredSections={filteredSections}
                                isActive={isActive}
                                signOut={signOut}
                                onToggle={() => setIsMobileMenuOpen(false)}
                            />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
