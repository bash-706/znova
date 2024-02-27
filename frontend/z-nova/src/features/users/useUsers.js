import { useQuery } from '@tanstack/react-query';
import { getAllUsers as userApi } from '../../services/apiUsers';

export function useUsers() {
  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => await userApi(),
    retry: false,
  });

  return { users, isLoading, error };
}
