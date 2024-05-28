import { Link } from 'react-router-dom';
import Logo from '../../../../components/Logo';
import Logout from '../../../authentication/components/Logout';
export default function DashboardHeader() {
  return (
    <div className="flex justify-between items-center px-[5%] h-[64px] border-b">
      <Link to={'/'}>
        <Logo />
      </Link>
      <Logout />
    </div>
  );
}
