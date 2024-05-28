import { useState } from 'react';
import { signup as signupApi } from '../services/auth';
import { handleAxiosError } from '../../../utils';

export default function useSignUp() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setIsError] = useState<string>('');
  const signUp = async (user: any) => {
    setIsLoading(true);
    try {
      await signupApi(user);
      window.location.reload();
    } catch (error: any) {
      const _error = handleAxiosError(error);

      if (_error.status === 400) {
        setIsError(_error.message);
      } else {
        setIsError('Failed to signup');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, isLoading, error };
}
