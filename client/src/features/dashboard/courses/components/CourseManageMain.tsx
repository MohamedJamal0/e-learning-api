import { Outlet } from 'react-router-dom';

export default function CourseManageMain() {
  return (
    <div className="flex-1 border shadow-md rounded-md mt-12 lg:mt-0">
      <Outlet />
    </div>
  );
}
