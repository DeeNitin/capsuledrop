// app/api/auto-reveal/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET() {
  const now = new Date().toISOString()

  const { data: unrevealedCapsules, error } = await supabase
    .from('capsules')
    .select('*')
    .eq('payment_status', true)
    .eq('is_revealed', false)
    .lt('reveal_date', now)

  if (error) {
    console.error('Error fetching capsules to reveal:', error)
    return NextResponse.json({ success: false, error })
  }

  if (!unrevealedCapsules || unrevealedCapsules.length === 0) {
    return NextResponse.json({ success: true, updated: 0 })
  }

  const ids = unrevealedCapsules.map((c) => c.id)

  const { error: updateError } = await supabase
    .from('capsules')
    .update({ is_revealed: true })
    .in('id', ids)

  if (updateError) {
    console.error('Error updating capsules:', updateError)
    return NextResponse.json({ success: false, error: updateError })
  }

  return NextResponse.json({ success: true, updated: ids.length })
}
