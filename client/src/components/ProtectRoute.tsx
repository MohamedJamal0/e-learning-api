import { useEffect } from 'react';
import { useAuthContext } from '../features/authentication/context/authContext';
import { useNavigate } from 'react-router-dom';

interface ProtectRouteProps {
  roles: string[];
  children: React.ReactNode;
}
export default function ProtectRoute({ roles, children }: ProtectRouteProps) {
  const { user, isLoading } = useAuthContext();

  const isAuthenticated = !isLoading && user && roles.includes(user.role);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) navigate('/dashboard/login');
  }, [isAuthenticated, isLoading, navigate]);

  return isAuthenticated ? children : <></>;
}
