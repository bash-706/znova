import { useQuery } from '@tanstack/react-query';
import { getUserNotifications as userNotificationsApi } from '../../services/apiNotifications';

export function useUserNotifications() {
  const {
    data: userNotifications,
    status,
    refetch,
  } = useQuery({
    queryKey: ['userNotifications'],
    queryFn: async () => await userNotificationsApi(),
    retry: false,
  });
  return { userNotifications, status, refetch };
}
