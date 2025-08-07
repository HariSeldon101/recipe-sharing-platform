import { createClient } from '../client'
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

export async function getRecipes(): Promise<RecipeWithRelations[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('recipes')
    .select(`
      *,
      profiles (
        id,
        display_name,
        avatar_url
      ),
      ingredients (*),
      reviews (
        rating
      ),
      _count {
        reviews,
        favorites
      }
    `)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as RecipeWithRelations[]
}

export async function getRecipe(id: string): Promise<RecipeWithRelations | null> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('recipes')
    .select(`
      *,
      profiles (
        id,
        display_name,
        avatar_url
      ),
      ingredients (*),
      reviews (
        id,
        rating,
        comment,
        created_at,
        user_id,
        profiles (
          id,
          display_name,
          avatar_url
        )
      ),
      _count {
        reviews,
        favorites
      }
    `)
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data as RecipeWithRelations
}

export async function createRecipe(recipe: Database['public']['Tables']['recipes']['Insert']) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('recipes')
    .insert(recipe)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function updateRecipe(id: string, updates: Database['public']['Tables']['recipes']['Update']) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('recipes')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function deleteRecipe(id: string) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('recipes')
    .delete()
    .eq('id', id)
  
  if (error) throw error
} 