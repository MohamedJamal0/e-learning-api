import useLogout from '../hooks/useLogout';

export default function Logout() {
  const { logout } = useLogout();

  return (
    <button
      className=" text-orange-700 hover:text-orange-500 duration-200 font-medium"
      onClick={logout}
    >
      Logout
    </button>
  );
}
