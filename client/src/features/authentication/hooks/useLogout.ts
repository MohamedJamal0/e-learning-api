import { logout as logoutApi } from '../services/auth';

export default function useLogout() {
  const logout = async () => {
    await logoutApi();
    window.location.reload();
  };

  return { logout };
}
