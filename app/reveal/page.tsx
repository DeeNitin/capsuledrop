'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function RevealPage() {
  const [capsules, setCapsules] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCapsules = async () => {
      const { data, error } = await supabase
        .from('capsules')
        .select('*')
        .eq('payment_status', true)
        .eq('is_revealed', true)

      if (error) {
        console.error('Error fetching revealed capsules:', error)
        return
      }

      setCapsules(data)
      setLoading(false)
    }

    fetchCapsules()
  }, [])

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-black text-white">
        <p>Loading revealed capsules...</p>
      </main>
    )
  }

  if (capsules.length === 0) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-black text-white">
        <p>No revealed capsules yet. 👀</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">📜 Revealed Capsules</h1>
      <div className="grid gap-4 max-w-2xl mx-auto">
        {capsules.map((capsule) => (
          <div key={capsule.id} className="bg-white/10 backdrop-blur-lg p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-1">{capsule.title}</h2>
            <p className="text-sm mb-2 whitespace-pre-wrap">{capsule.message}</p>
            {capsule.country && <p className="text-xs italic text-gray-300">📍 {capsule.country}</p>}
          </div>
        ))}
      </div>
    </main>
  )
}
