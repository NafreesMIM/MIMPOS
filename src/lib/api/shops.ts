import { supabase } from '../supabase';
import type { Shop } from '../../types/models';

export async function getShops() {
  const { data, error } = await supabase
    .from('shops')
    .select('*');
  
  if (error) throw error;
  return data as Shop[];
}

export async function getShopById(id: string) {
  const { data, error } = await supabase
    .from('shops')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data as Shop;
}

export async function createShop(shop: Omit<Shop, 'id' | 'createdAt' | 'updatedAt'>) {
  const { data, error } = await supabase
    .from('shops')
    .insert(shop)
    .select()
    .single();
  
  if (error) throw error;
  return data as Shop;
}

export async function updateShop(id: string, shop: Partial<Shop>) {
  const { data, error } = await supabase
    .from('shops')
    .update(shop)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Shop;
}