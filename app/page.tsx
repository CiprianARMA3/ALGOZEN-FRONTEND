"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { LanguageProvider } from './context/LanguageContext'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default function DashboardRedirect() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  /* 
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        router.push('/dashboard')
      } else {
        setLoading(false)
      }
    }
    checkUser()
  }, [router])
  */

  // Set loading to false immediately if we want to show the page regardless
  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) return null

  return (
    <LanguageProvider>
      <Navbar />
      <Hero />
    </LanguageProvider>
  )
}
