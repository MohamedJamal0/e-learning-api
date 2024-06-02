import { useState } from 'react';
import { login as loginApi } from '../services/auth';
import { useAuthContext } from '../context/authContext';
import { handleAxiosError } from '../../../utils';

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuthContext();
  const [error, setIsError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await loginApi(email, password);
      setUser(user);
      window.location.reload();
    } catch (err: any) {
      const error = handleAxiosError(err);
      if (error.status === 400) {
        setIsError(error.message);
      } else {
        console.log(error);
        setIsError('Failed to login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}
