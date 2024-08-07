import { useMutation } from '@tanstack/react-query';
// import { toast } from "react-hot-toast";
import { updateAccount as updateAccountApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useUpdateAccount() {
  // const queryClient = useQueryClient();

  const { mutate: updateAccount, isLoading: isUpdating } = useMutation({
    mutationFn: async ({
      name,
      email,
      username,
      country,
      photo,
      skills,
      languages,
      biodata,
    }) => {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('username', username);
      formData.append('country', country);
      formData.append('photo', photo);
      formData.append('skills', skills);
      formData.append('languages', languages);
      formData.append('biodata', biodata);
      await updateAccountApi(formData, 'data');
    },
    onSuccess: () => {
      toast.success('Account updated successfully!');
      // queryClient.setQueryData(['user'], user);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateAccount, isUpdating };
}
