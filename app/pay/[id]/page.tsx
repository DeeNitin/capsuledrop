'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function PayPage() {
  const { id } = useParams()
  const router = useRouter()
  const [capsule, setCapsule] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState(false)

  useEffect(() => {
    if (!id) return

    const fetchCapsule = async () => {
      const { data, error } = await supabase
        .from('capsules')
        .select('*')
        .eq('id', id)
        .single()

      if (error || !data) {
        console.error('Error fetching capsule:', error)
        alert('Capsule not found.')
        router.push('/')
        return
      }

      setCapsule(data)
      setLoading(false)
    }

    fetchCapsule()
  }, [id, router])

  const handlePayment = async () => {
    setPaying(true)

    // Simulated payment - update payment_status to true
    const { error } = await supabase
      .from('capsules')
      .update({ payment_status: true })
      .eq('id', id)

    setPaying(false)

    if (error) {
      alert('Payment failed. Try again.')
      console.error('Payment error:', error)
    } else {
      router.push('/reveal')
    }
  }

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-black text-white">
        <p>Loading capsule...</p>
      </main>
    )
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-4">
      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-center">💰 Pay ₹11 to Lock Your Capsule</h1>
        <p className="mb-4 text-center">Capsule Title: <strong>{capsule.title}</strong></p>
        <button
          onClick={handlePayment}
          disabled={paying}
          className="w-full bg-green-400 text-black font-bold py-2 px-4 rounded hover:bg-green-300 transition"
        >
          {paying ? 'Processing...' : 'Pay ₹11 & Lock'}
        </button>
      </div>
    </main>
  )
}
