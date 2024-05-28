import { Outlet } from 'react-router-dom';
import ProtectRoute from '../components/ProtectRoute';

export default function DashboardPage() {
  return (
    <ProtectRoute roles={['admin', 'superadmin']}>
      <Outlet />
    </ProtectRoute>
  );
}
