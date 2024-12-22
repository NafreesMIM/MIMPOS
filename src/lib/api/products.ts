import { supabase } from '../supabase';
import type { Product } from '../../types/models';

export async function getProducts(shopId: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('shop_id', shopId);
  
  if (error) throw error;
  return data as (Product & { categories: Category })[];
}

export async function createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();
  
  if (error) throw error;
  return data as Product;
}

export async function updateProduct(id: string, product: Partial<Product>) {
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Product;
}