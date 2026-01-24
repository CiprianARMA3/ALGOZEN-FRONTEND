"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function APIDebugPage() {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [logs, setLogs] = useState<string[]>([]);
    const [testResults, setTestResults] = useState<{ [key: string]: any }>({});
    const [activeTab, setActiveTab] = useState('Terminal');

    useEffect(() => {
        checkAuth();
    }, []);

    const addLog = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
        const timestamp = new Date().toLocaleTimeString();
        const prefix = type === 'success' ? '[OK]' : type === 'error' ? '[ERR]' : '[INF]';
        setLogs(prev => [`${timestamp} ${prefix} ${message}`, ...prev].slice(0, 100));
    };

    const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            setAccessToken(session.access_token);
            setUserEmail(session.user.email || null);
            addLog(`Account synchronized: ${session.user.email}`, 'success');
        } else {
            addLog('System offline. Please log in.', 'error');
        }
    };

    const runTest = async (name: string, endpoint: string, options: RequestInit = {}) => {
        addLog(`Executing: ${name}...`);
        try {
            const headers = accessToken ? { ...options.headers, 'Authorization': `Bearer ${accessToken}` } : options.headers;
            const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
            const data = await res.json();
            setTestResults(prev => ({ ...prev, [name]: data }));
            addLog(`${name} response received (HTTP ${res.status})`, res.ok ? 'success' : 'error');
        } catch (err: any) {
            addLog(`${name} failed: ${err.message}`, 'error');
        }
    };

    return (
        <div className="min-h-screen bg-[#f0f0f0] text-black font-sans flex flex-col h-screen overflow-hidden select-none">
            {/* Top Toolbar / Menu */}
            <div className="bg-[#ece9d8] border-b border-gray-400 p-1 flex items-center space-x-4 shadow-sm z-10">
                <div className="px-2 py-0.5 hover:bg-blue-600 hover:text-white cursor-default text-sm">File</div>
                <div className="px-2 py-0.5 hover:bg-blue-600 hover:text-white cursor-default text-sm">View</div>
                <div className="px-2 py-0.5 hover:bg-blue-600 hover:text-white cursor-default text-sm">Insert</div>
                <div className="px-2 py-0.5 hover:bg-blue-600 hover:text-white cursor-default text-sm font-bold text-blue-800">API-DEBUG.v5</div>
                <div className="flex-1"></div>
                <div className="text-xs text-gray-600 pr-2">Build: 2026.01.24</div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Navigator (Sidebar) */}
                <div className="w-64 bg-[#f0f0f0] border-r border-gray-400 flex flex-col shadow-inner">
                    <div className="bg-[#ece9d8] border-b border-gray-300 px-2 py-1 text-xs font-bold uppercase tracking-wider flex items-center">
                        <span className="mr-1">📁</span> Navigator
                    </div>
                    <div className="p-2 space-y-1">
                        <div className="text-sm py-1 px-2 hover:bg-blue-100 border border-transparent hover:border-blue-300 cursor-pointer flex items-center">
                            <span className="mr-2 text-blue-600">👤</span> User: {userEmail?.split('@')[0] || 'Guest'}
                        </div>
                        <div className="text-sm py-1 px-2 hover:bg-blue-100 border border-transparent hover:border-blue-300 cursor-pointer flex items-center font-bold">
                            <span className="mr-2 text-green-600">⚡</span> Status: {accessToken ? 'Connected' : 'Disconnected'}
                        </div>
                        <div className="mt-4 border-t border-gray-300 pt-2 pb-1 text-[10px] uppercase font-bold text-gray-500 px-2">Indicators</div>
                        <div className="text-xs py-1 px-4 hover:underline cursor-pointer">Supabase Auth</div>
                        <div className="text-xs py-1 px-4 hover:underline cursor-pointer">FastAPI RLS</div>
                        <div className="text-xs py-1 px-4 hover:underline cursor-pointer font-bold text-orange-600">AI Cognitive Core</div>
                    </div>
                </div>

                {/* Main View Area */}
                <div className="flex-1 flex flex-col bg-white overflow-hidden">
                    {/* Tool Buttons */}
                    <div className="bg-[#ece9d8] border-b border-gray-400 p-2 flex flex-wrap gap-1 shadow-sm">
                        <button onClick={() => runTest('health', '/health')} className="mt5-btn bg-green-50">Health</button>
                        <button onClick={() => runTest('auth', '/api/auth/validate')} className="mt5-btn bg-blue-50">Auth</button>
                        <button onClick={() => runTest('profile', '/api/auth/me')} className="mt5-btn">Profile</button>
                        <button onClick={() => runTest('limits', '/api/accounts/limits')} className="mt5-btn">Limits</button>
                        <button onClick={() => runTest('trades', '/api/trades/?limit=5')} className="mt5-btn">Trades</button>
                        <button onClick={() => runTest('quota', '/api/trades/ai/quota')} className="mt5-btn">Quota</button>
                    </div>

                    {/* Data Display */}
                    <div className="flex-1 p-2 bg-[#d4d0c8] overflow-hidden flex flex-col">
                        <div className="bg-white border-2 border-gray-500 flex-1 overflow-auto rounded-sm p-4 font-mono shadow-inner">
                            <h3 className="text-blue-900 font-bold mb-2 border-b pb-1 text-sm border-gray-200 uppercase tracking-tighter">Result Inspector</h3>
                            <pre className="text-xs leading-relaxed text-blue-800">
                                {JSON.stringify(testResults, null, 2)}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Terminal Panel */}
            <div className="h-64 bg-[#f0f0f0] border-t border-gray-500 flex flex-col shadow-lg z-10">
                <div className="flex border-b border-gray-400">
                    {['Trade', 'History', 'News', 'Mailbox', 'Terminal', 'Experts', 'Journal'].map(tab => (
                        <div
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-1 text-xs border-r border-gray-400 cursor-default ${activeTab === tab ? 'bg-white font-bold border-b-white translate-y-px shadow-sm' : 'bg-[#ece9d8] hover:bg-gray-200'}`}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
                <div className="flex-1 bg-white p-2 overflow-auto font-mono text-[11px] leading-tight selection:bg-blue-600 selection:text-white">
                    {activeTab === 'Journal' || activeTab === 'Terminal' ? (
                        <div className="space-y-0.5">
                            {logs.map((log, i) => (
                                <div key={i} className={`flex ${log.includes('[ERR]') ? 'text-red-600' : log.includes('[OK]') ? 'text-green-700' : 'text-gray-800'}`}>
                                    <span className="mr-8 whitespace-nowrap opacity-75">{log.split(' ')[0]}</span>
                                    <span className="font-bold mr-2">{log.split(' ')[1]}</span>
                                    <span>{log.split(' ').slice(2).join(' ')}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-400 italic text-center mt-8 uppercase tracking-widest text-[9px]">Module {activeTab} data synchronized to cloud.</div>
                    )}
                </div>
            </div>

            {/* Status Bar */}
            <div className="bg-[#ece9d8] border-t border-gray-300 py-0.5 px-3 flex justify-between items-center text-[10px] font-medium text-gray-700">
                <div className="flex items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 mr-2 border border-green-700"></span>
                    <span>{accessToken ? 'AUTHORIZED (RLS ACTIVE)' : 'READY'}</span>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="border-l border-gray-400 pl-4">{SUPABASE_URL.split('//')[1]?.split('.')[0] || 'local-host'}</span>
                    <span className="border-l border-gray-400 pl-4">8000/tcp</span>
                    <span className="font-mono border-l border-gray-400 pl-4">UTC {new Date().getHours()}:00</span>
                </div>
            </div>

            <style jsx>{`
                .mt5-btn {
                    border: 1px solid #7a7a7a;
                    background: #f0f0f0;
                    padding: 2px 10px;
                    font-size: 11px;
                    box-shadow: inset -1px -1px 1px #808080, inset 1px 1px 1px #fff;
                    transition: all 0.05s;
                    cursor: default;
                }
                .mt5-btn:active {
                    box-shadow: inset 1px 1px 1px #808080, inset -1px -1px 1px #fff;
                    transform: translate(1px, 1px);
                    background: #e0e0e0;
                }
                .shadow-inner {
                    box-shadow: inset 1px 1px 3px rgba(0,0,0,0.2);
                }
            `}</style>
        </div>
    );
}
