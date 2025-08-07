"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function TestSupabase() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const testConnection = async () => {
      try {
        const supabase = createClient()
        
        // Test a simple query
        const { data, error } = await supabase
          .from('recipes')
          .select('count')
          .limit(1)
        
        if (error) {
          setStatus('error')
          setMessage(`Connection failed: ${error.message}`)
        } else {
          setStatus('success')
          setMessage('Supabase connection successful!')
        }
      } catch (err) {
        setStatus('error')
        setMessage(`Connection failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Supabase Connection Test</h3>
      <div className={`text-sm ${
        status === 'loading' ? 'text-yellow-600' :
        status === 'success' ? 'text-green-600' :
        'text-red-600'
      }`}>
        {status === 'loading' && 'Testing connection...'}
        {status === 'success' && message}
        {status === 'error' && message}
      </div>
    </div>
  )
} 