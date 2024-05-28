import AuthModal from './AuthModal';
import { CiLogin } from 'react-icons/ci';

export default function SignUpModal() {
  return (
    <AuthModal initCurrentForm="signUp">
      <CiLogin className="w-4 h-4 mt-1" />
      <span>Sign Up</span>
    </AuthModal>
  );
}

