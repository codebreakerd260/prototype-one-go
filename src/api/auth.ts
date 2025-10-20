import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@/types';

export const fetchUser = async (): Promise<User | null> => {
  const response = await fetch('/api/me');
  if (response.status === 401) {
    return null;
  }
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
};

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (!response.ok) {
        throw new Error('Logout failed');
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
    },
  });
};
