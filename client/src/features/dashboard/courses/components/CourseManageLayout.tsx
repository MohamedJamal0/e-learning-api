import { Link } from 'react-router-dom';
import CourseManageMain from './CourseManageMain';
import CourseManageSidebar from './CourseManageSidebar';

export default function CourseManageLayout() {
  return (
    <div>
      <div className="fixed top-0 left-0 flex items-center w-full h-14 bg-black opacity-90 z-10">
        <h1 className="text-white text-2xl pl-10">
          <Link to={'/dashboard'}>
            <span>Back to dashboard</span>
          </Link>
        </h1>
      </div>
      <div className="relative flex gap-5 max-w-7xl  mx-auto py-20 px-[5%] ">
        <CourseManageSidebar />
        <CourseManageMain />
      </div>
    </div>
  );
}
