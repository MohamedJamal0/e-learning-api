import { Link } from 'react-router-dom';
import { LuCheckCircle } from 'react-icons/lu';

export default function CourseManageSidebar() {
  return (
    <div className=" absolute lg:block lg:static lg:h-screen lg:pt-8">
      <h1 className="hidden font-medium text-lg px-4 mb-3 lg:block">
        Plane your learning
      </h1>
      <ul className="flex text-sm gap-1 sm:gap-4 md:text-lg lg:flex-col">
        <li>
          <Link
            to={''}
            className="flex items-center gap-2 px-1 py-1 rounded-md hover:bg-gray-100 duration-300 md:px-4"
          >
            <LuCheckCircle className="w-5 h-5" />
            {/* <LuCircle className="w-5 h-5" /> */}
            <span>Course landing page</span>
          </Link>
        </li>
        <li>
          <Link
            to={'curriculum'}
            className="flex items-center gap-2 px-1 py-1 rounded-md hover:bg-gray-100 duration-300 md:px-4"
          >
            <LuCheckCircle className="w-5 h-5" />
            <span>Curriculum</span>
          </Link>
        </li>
        <li>
          <Link
            to={'settings'}
            className="flex items-center gap-2 px-1 py-1 rounded-md hover:bg-gray-100 duration-300 md:px-4"
          >
            <LuCheckCircle className="w-5 h-5 " />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
