"use client"

import { useEffect, useState } from 'react'
import { getRecipes } from '@/lib/supabase/queries/recipes'
import type { Database } from '@/types/database.types'

type Recipe = Database['public']['Tables']['recipes']['Row']
type RecipeWithRelations = Recipe & {
  profiles: Database['public']['Tables']['profiles']['Row']
  ingredients: Database['public']['Tables']['ingredients']['Row'][]
  reviews: Database['public']['Tables']['reviews']['Row'][]
  _count: {
    reviews: number
    favorites: number
  }
}

export function useRecipes() {
  const [recipes, setRecipes] = useState<RecipeWithRelations[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getRecipes()
        setRecipes(data)
      } catch (err) {
        setError(err as Error)
        console.error('Error fetching recipes:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  return { recipes, isLoading, error }
} 