'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [country, setCountry] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const router = useRouter()

  const handleSubmit = async () => {
    if (!title || !message) {
      alert('Please fill in all required fields.')
      return
    }

    setSubmitting(true)
    const revealDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)

    const { data, error } = await supabase
      .from('capsules')
      .insert([
        {
          title,
          message,
          reveal_date: revealDate.toISOString(),
          country,
          payment_status: false,
          reveal_early: false,
          is_revealed: false,
        },
      ])
      .select()
      .single()

    setSubmitting(false)

    if (error || !data) {
      console.error('Capsule Save Error:', error)
      alert('There was a problem saving your capsule.')
      return
    }

    router.push(`/pay/${data.id}`)
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-4">
      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-center">⏳ Drop Your Capsule</h1>

        <input
          type="text"
          placeholder="Title"
          className="w-full mb-2 p-2 rounded bg-black/30 text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Your secret message"
          className="w-full mb-2 p-2 h-32 rounded bg-black/30 text-white"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your Country (optional)"
          className="w-full mb-4 p-2 rounded bg-black/30 text-white"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-white text-black font-bold py-2 px-4 rounded hover:bg-green-400 transition"
        >
          {submitting ? 'Saving...' : 'Lock for ₹11'}
        </button>
      </div>
    </main>
  )
}
