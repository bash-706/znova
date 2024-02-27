import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
// import { toast } from 'react-hot-toast';

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: async ({
      name,
      email,
      photo,
      username,
      password,
      passwordConfirm,
    }) => {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('photo', photo);
      formData.append('username', username);
      formData.append('password', password);
      formData.append('passwordConfirm', passwordConfirm);
      return await signupApi(formData);
    },
    onSuccess: (data) => {
      toast.success(data?.message, { duration: 5000 });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { signup, isLoading };
}
