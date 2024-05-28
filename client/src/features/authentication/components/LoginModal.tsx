import AuthModal from './AuthModal';
import { FiUserPlus } from 'react-icons/fi';

export default function LoginModal() {
  return (
    <AuthModal initCurrentForm="login">
      <FiUserPlus className="w-4 h-4 mt-1" />
      <span>Log In</span>
    </AuthModal>
  );
}
