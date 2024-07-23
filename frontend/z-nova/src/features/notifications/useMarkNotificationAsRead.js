import { useMutation, useQueryClient } from '@tanstack/react-query';
import { markNotificationAsRead as markNotificationApi } from '../../services/apiNotifications';

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  const { mutate: markNotification, status } = useMutation({
    mutationFn: async (notificationId) => {
      return await markNotificationApi(notificationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userNotifications'],
      });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { markNotification, status };
}
