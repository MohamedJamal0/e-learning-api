import { useEffect, useState, useContext, createContext } from 'react';
import { getCurrentUser } from '../services/auth';

type AuthUser = {
  id: string;
  fullName: string;
  role: string;
};

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  setUser: (user: AuthUser | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setUser(user);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const value = { user, isLoading, setUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const userContext = useContext(AuthContext);

  if (!userContext) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }

  return userContext;
}
