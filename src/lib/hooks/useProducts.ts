import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, createProduct, updateProduct } from '../api/products';
import type { Product } from '../../types/models';

export function useProducts(shopId: string) {
  const queryClient = useQueryClient();

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', shopId],
    queryFn: () => getProducts(shopId),
  });

  const { mutate: createProductMutation } = useMutation({
    mutationFn: (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => 
      createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', shopId] });
    },
  });

  const { mutate: updateProductMutation } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) => 
      updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', shopId] });
    },
  });

  return {
    products,
    isLoading,
    error,
    createProduct: createProductMutation,
    updateProduct: updateProductMutation,
  };
}