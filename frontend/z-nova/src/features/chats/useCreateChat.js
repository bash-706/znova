import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createChat as chatApi } from '../../services/apiChats';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCreateChat() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createChat, isLoading } = useMutation({
    mutationFn: async (data) => {
      return await chatApi(data);
    },
    onSuccess: (newChat) => {
      console.log(newChat);
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      navigate('/inbox', { state: { newChatId: newChat?.chat?._id } });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message, { duration: 5000 });
    },
  });
  return { createChat, isLoading };
}
