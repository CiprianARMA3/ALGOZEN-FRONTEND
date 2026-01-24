"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default function DashboardPage() {
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                router.push('/auth/login')
            } else {
                setUser(session.user)
                setLoading(false)
            }
        }
        getSession()
    }, [router])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/auth/login')
    }

    if (loading) return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
            <div className="animate-pulse text-blue-500 font-bold text-xl">Initializing Terminal...</div>
        </div>
    )

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Navigation */}
            <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
                            <span className="text-xl font-bold tracking-tighter">AIMT5</span>
                        </div>

                        <div className="flex items-center gap-6">
                            <Link href="/accounts" className="text-gray-400 hover:text-white transition-colors">Accounts</Link>
                            <Link href="/api-debug" className="text-gray-400 hover:text-white transition-colors">API Debug</Link>
                            <button
                                onClick={handleLogout}
                                className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm font-medium transition-all"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full"></div>

                    <div className="relative z-10">
                        <h2 className="text-gray-400 font-medium mb-4">Welcome back, {user?.email}</h2>
                        <h1 className="text-5xl font-black mb-8 leading-tight max-w-2xl">
                            The market is moving.<br />
                            <span className="text-blue-400">Get your AI insights now.</span>
                        </h1>

                        <div className="flex gap-4">
                            <Link href="/trades" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105">
                                View Recent Trades
                            </Link>
                            <Link href="/accounts" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105">
                                Link New Broker
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
                    {[
                        { label: 'Total Volume', value: '$0.00', icon: '📈', color: 'blue' },
                        { label: 'AI Analyses', value: '0', icon: '🧠', color: 'purple' },
                        { label: 'Linked Accounts', value: '0', icon: '🔗', color: 'pink' },
                        { label: 'Active Strategy', value: 'None', icon: '⚡', color: 'orange' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-2xl">{stat.icon}</span>
                                <div className={`w-2 h-2 rounded-full bg-${stat.color}-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]`}></div>
                            </div>
                            <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                            <div className="text-2xl font-bold text-white mt-1 group-hover:translate-x-1 transition-transform">{stat.value}</div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}
