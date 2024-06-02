import { Link } from 'react-router-dom';
import Menu from '../../../components/ui/Menu';
import { useAuthContext } from '../context/authContext';
import useLogout from '../hooks/useLogout';
import { CiLogout } from 'react-icons/ci';
import { BiBook } from 'react-icons/bi';

const UserMenu = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  if (!user) return null;

  return (
    <Menu>
      <Menu.Open className="flex items-center justify-center w-12 h-12 rounded-full text-3xl bg-gray-600 text-white ">
        <p className="mb-1">{user?.fullName?.charAt(0) || 'A'}</p>
      </Menu.Open>
      <Menu.List className="w-40 font-medium">
        <Menu.item>
          <Link
            className="flex items-center gap-2 px-3 py-3"
            to={'/my-courses'}
          >
            <BiBook className="w-6 h-6 mt-1 text-indigo-700" />
            <span>My Courses</span>
          </Link>
        </Menu.item>
        <Menu.item>
          <button
            className="flex items-center gap-2 px-3 py-3"
            onClick={logout}
          >
            <CiLogout className="w-6 h-6 mt-1 text-indigo-700" />
            <span>Logout</span>
          </button>
        </Menu.item>
      </Menu.List>
    </Menu>
  );
};

export default UserMenu;
