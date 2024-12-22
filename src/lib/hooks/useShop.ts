import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getShopById, updateShop } from '../api/shops';
import type { Shop } from '../../types/models';

export function useShop(id: string) {
  const queryClient = useQueryClient();

  const { data: shop, isLoading, error } = useQuery({
    queryKey: ['shop', id],
    queryFn: () => getShopById(id),
  });

  const { mutate: updateShopMutation } = useMutation({
    mutationFn: (data: Partial<Shop>) => updateShop(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shop', id] });
    },
  });

  return {
    shop,
    isLoading,
    error,
    updateShop: updateShopMutation,
  };
}