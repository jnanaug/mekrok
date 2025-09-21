import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useEquipment = (filters = {}) => {
  const [equipment, setEquipment] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchEquipment = async (appliedFilters = {}) => {
    try {
      setLoading(true)
      let query = supabase?.from('equipment')?.select(`
          id,
          name,
          manufacturer,
          model,
          year,
          hours_operated,
          condition,
          status,
          price,
          location,
          description,
          specifications,
          images,
          featured_image,
          is_featured,
          views_count,
          created_at,
          updated_at,
          categories (
            id,
            name,
            slug
          ),
          user_profiles (
            id,
            full_name,
            email,
            company_name,
            phone
          )
        `)?.eq('status', 'available')

      // Apply filters with optional chaining
      if (appliedFilters?.category) {
        query = query?.eq('categories.slug', appliedFilters?.category)
      }
      if (appliedFilters?.condition) {
        query = query?.eq('condition', appliedFilters?.condition)
      }
      if (appliedFilters?.manufacturer) {
        query = query?.ilike('manufacturer', `%${appliedFilters?.manufacturer}%`)
      }
      if (appliedFilters?.priceRange?.min) {
        query = query?.gte('price', appliedFilters?.priceRange?.min)
      }
      if (appliedFilters?.priceRange?.max) {
        query = query?.lte('price', appliedFilters?.priceRange?.max)
      }
      if (appliedFilters?.location) {
        query = query?.ilike('location', `%${appliedFilters?.location}%`)
      }
      if (appliedFilters?.search) {
        query = query?.or(`name.ilike.%${appliedFilters?.search}%,manufacturer.ilike.%${appliedFilters?.search}%,model.ilike.%${appliedFilters?.search}%`)
      }

      // Sorting
      if (appliedFilters?.sortBy === 'price_asc') {
        query = query?.order('price', { ascending: true })
      } else if (appliedFilters?.sortBy === 'price_desc') {
        query = query?.order('price', { ascending: false })
      } else if (appliedFilters?.sortBy === 'year_desc') {
        query = query?.order('year', { ascending: false })
      } else {
        query = query?.order('created_at', { ascending: false })
      }

      const { data, error } = await query

      if (error) throw error
      setEquipment(data || [])
    } catch (err) {
      setError(err?.message)
    } finally {
      setLoading(false)
    }
  }

  const addEquipment = async (equipmentData) => {
    try {
      const { data, error } = await supabase?.from('equipment')?.insert([equipmentData])?.select()

      if (error) throw error
      
      setEquipment(prev => [...prev, ...(data || [])])
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err?.message }
    }
  }

  const updateEquipment = async (id, updates) => {
    try {
      const { data, error } = await supabase?.from('equipment')?.update(updates)?.eq('id', id)?.select()

      if (error) throw error

      setEquipment(prev =>
        prev?.map(item =>
          item?.id === id ? { ...item, ...updates } : item
        )
      )
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err?.message }
    }
  }

  const deleteEquipment = async (id) => {
    try {
      const { error } = await supabase?.from('equipment')?.delete()?.eq('id', id)

      if (error) throw error

      setEquipment(prev => prev?.filter(item => item?.id !== id))
      return { error: null }
    } catch (err) {
      return { error: err?.message }
    }
  }

  useEffect(() => {
    fetchEquipment(filters)
  }, [])

  return {
    equipment,
    loading,
    error,
    fetchEquipment,
    addEquipment,
    updateEquipment,
    deleteEquipment
  }
}