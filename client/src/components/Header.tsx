import Logo from './Logo';
import { useAuthContext } from '../features/authentication/context/authContext';

import { Link } from 'react-router-dom';
import SignUpModal from '../features/authentication/components/SignupModal';
import LoginModal from '../features/authentication/components/LoginModal';
import { MdOutlineDashboard } from 'react-icons/md';
import UserMenu from '../features/authentication/components/UserMenu';

export default function Header() {
  const { user, isLoading } = useAuthContext();

  return (
    <header className="flex justify-between items-center gap-4 h-20 px-[3%] bg-white shadow-sm">
      <Link to="/" className="shrink-0 ">
        <Logo />
      </Link>

      {!user && !isLoading && (
        <div className="flex  items-center gap-4">
          <LoginModal />
          <SignUpModal />
          <Link
            className="flex items-center gap-1 text-indigo-700 font-medium hover:text-orange-500 duration-300 "
            to="/dashboard"
          >
            <MdOutlineDashboard className="w-4 h-4" />
            Dashboard
          </Link>
        </div>
      )}
      {user && <UserMenu />}
    </header>
  );
}
