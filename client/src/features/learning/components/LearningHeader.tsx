import { MdMenuOpen } from 'react-icons/md';
import { useLearningSidebarToggle } from '../context/learningSidebarToggleContext';
import Logo from '../../../components/Logo';
import { Link, useParams } from 'react-router-dom';

export default function LearningHeader() {
  const { toggleSidebar } = useLearningSidebarToggle();
  const { courseTitle } = useParams();

  return (
    <div className="fixed top-0 left-0 flex items-center w-full h-16 px-[2%] border-b bg-white ">
      <Link to="/" className="hidden lg:block">
        <Logo />
      </Link>
      <h1 className="absolute z-[-10] w-full  text-center text-xl font-medium ml-5 sm:text-3xl">
        {courseTitle}
      </h1>
      <div></div>
      <button
        onClick={toggleSidebar}
        className="p-2.5  shadow-md bg-gray-100 hover:bg-indigo-500 hover:text-white duration-200 lg:hidden"
      >
        <MdMenuOpen className="w-6 h-6" />
      </button>
    </div>
  );
}
