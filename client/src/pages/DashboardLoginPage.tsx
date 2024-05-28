import { useEffect } from 'react';
import Logo from '../components/Logo';
import AdminLogin from '../features/dashboard/login/components/AdminLogin';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../features/authentication/context/authContext';
import { useNavigate } from 'react-router-dom';

export default function DashboardLoginPage() {
  const navigate = useNavigate();

  const { user, isLoading } = useAuthContext();

  useEffect(() => {
    if (isLoading) return;
    if (user) navigate('/dashboard');
  }, [user, isLoading]);

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex justify-center mt-10">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="w-[90%] h-[70%] mt-10 mx-auto shadow-custom border rounded-md lg:w-[60%]">
        <div className="grid grid-cols-1 md:grid-cols-2   h-full py-10">
          <div className="px-10 border-r "></div>
          <div className="px-10">
            <span className="w-8 h-[2px] rounded-md inline-block bg-indigo-500"></span>
            <h1 className=" text-xl font-medium">Login as an Admin user</h1>
            <AdminLogin />
          </div>
        </div>
      </div>
    </div>
  );
}
