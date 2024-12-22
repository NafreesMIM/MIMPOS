import { supabase } from '../supabase';
import type { Category } from '../../types/models';

export async function getCategories(shopId: string) {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('shop_id', shopId);
  
  if (error) throw error;
  return data as Category[];
}

export async function createCategory(category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) {
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select()
    .single();
  
  if (error) throw error;
  return data as Category;
}

export async function updateCategory(id: string, category: Partial<Category>) {
  const { data, error } = await supabase
    .from('categories')
    .update(category)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Category;
}