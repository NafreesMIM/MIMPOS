import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCategories, createCategory, updateCategory } from '../api/categories';
import type { Category } from '../../types/models';

export function useCategories(shopId: string) {
  const queryClient = useQueryClient();

  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categories', shopId],
    queryFn: () => getCategories(shopId),
  });

  const { mutate: createCategoryMutation } = useMutation({
    mutationFn: (data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => 
      createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', shopId] });
    },
  });

  const { mutate: updateCategoryMutation } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Category> }) => 
      updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', shopId] });
    },
  });

  return {
    categories,
    isLoading,
    error,
    createCategory: createCategoryMutation,
    updateCategory: updateCategoryMutation,
  };
}