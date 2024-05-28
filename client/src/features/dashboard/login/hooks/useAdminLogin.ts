import { useState } from 'react';
import { adminLogin as adminLoginApi } from '../services';
import { useAuthContext } from '../../../../features/authentication/context/authContext';
import { useNavigate } from 'react-router-dom';
import { handleAxiosError } from '../../../../utils';
import { AxiosError } from 'axios';

export default function useAdminLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAuthContext();
  const navigate = useNavigate();
  const adminLogin = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await adminLoginApi(username, password);

      setUser(user);
      navigate('/dashboard');
    } catch (err) {
      const error = handleAxiosError(err as AxiosError);

      if (error.status === 400) {
        setError(error.message);
      } else {
        setError('Failed to login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { adminLogin, isLoading, errorMessage: error };
}
