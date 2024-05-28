import Logo from './Logo';
import { useAuthContext } from '../features/authentication/context/authContext';
import Logout from '../features/authentication/components/Logout';
import { Link } from 'react-router-dom';
import SignUpModal from '../features/authentication/components/SignupModal';
import LoginModal from '../features/authentication/components/LoginModal';

export default function Header() {
  const { user, isLoading } = useAuthContext();

  return (
    <header className=" flex justify-between items-center gap-4 h-20 px-[3%] bg-white border-b border-gray-200">
      <Link to="/" className="shrink-0 ">
        <Logo />
      </Link>

      {!user && !isLoading && (
        <div className="flex  items-center gap-4">
          <LoginModal />
          <SignUpModal />
        </div>
      )}
      {user && (
        <div className="flex gap-3">
          <Link className=" text-indigo-700 font-medium" to="/my-courses">
            My Courses
          </Link>
          <Logout />
        </div>
      )}
    </header>
  );
}
