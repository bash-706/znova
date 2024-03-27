import { useMutation } from '@tanstack/react-query';
import { contact as contactApi } from '../../services/apiContact';
import { toast } from 'react-hot-toast';

export default function useContact() {
  const { mutate: contact, isLoading } = useMutation({
    mutationFn: async ({ name, email, subject, message }) => {
      await contactApi(name, email, subject, message);
    },
    onSuccess: () => {
      toast.success(
        'Your message has been sent successfully! We will get back to you shortly.',
        { duration: 2000 },
      );
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message, { duration: 5000 });
    },
  });
  return { contact, isLoading };
}
