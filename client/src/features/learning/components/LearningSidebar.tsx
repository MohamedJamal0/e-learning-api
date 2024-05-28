import { MdMenuOpen } from 'react-icons/md';
import { HiArrowLeft } from 'react-icons/hi2';
import ChapterAccordion from './ChapterAccordion';
import { useLearningSidebarToggle } from '../context/learningSidebarToggleContext';
import { useLearningContext } from '../context/learningContext';
import { useNavigate, useParams } from 'react-router-dom';

export default function LearningSidebar() {
  const { isSidebarOpen, toggleSidebar } = useLearningSidebarToggle();
  const { getCourseCompletionPercentage } = useLearningContext();
  const { chapters } = useLearningContext();
  const navigate = useNavigate();
  const { courseTitle } = useParams();

  if (!isSidebarOpen)
    return (
      <button
        onClick={toggleSidebar}
        className="p-2.5 shadow-md bg-gray-100 hover:bg-indigo-500 hover:text-white duration-200 hidden lg:block"
      >
        <MdMenuOpen className="w-6 h-6" />
      </button>
    );

  return (
    <div className=" z-[999] absolute top-16 left-0 shrink-0 w-full h-[calc(100vh-4rem)] pb-6 overflow-auto   border-r bg-white lg:static lg:w-[23rem]">
      <div className=" w-full  fixed bg-white  z-10 pt-2.5  pr-2.5 pl-5 lg:w-[23rem]">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate(`/course/${courseTitle}`)}
            className=" hidden items-center gap-2.5 p-2.5 rounded-md shadow-md bg-gray-100 hover:bg-indigo-500 hover:text-white duration-200 lg:flex"
          >
            <HiArrowLeft className="w-6 h-6 mt-0.5" />
            <span className=" font-medium">Back to course home</span>
          </button>
          <button
            onClick={toggleSidebar}
            className="p-2.5 rounded-md shadow-md bg-gray-100 hover:bg-indigo-500 hover:text-white duration-200 hidden lg:block"
          >
            <MdMenuOpen className="w-6 h-6" />
          </button>
        </div>
        <div className="my-5">
          <p className="text-sm mb-2 text-gray-800">
            {getCourseCompletionPercentage() || 0}% completed
          </p>
          <div className="relative w-full h-1.5 rounded-full bg-gray-300 block">
            <span
              className="absolute top-0 left-0 bg-indigo-500 h-1.5 rounded-full"
              style={{ width: `${getCourseCompletionPercentage() || 0}%` }}
            ></span>
          </div>
        </div>
      </div>
      <div className=" mt-16 flex flex-col  overflow-auto lg:mt-28">
        {chapters?.map((chapter) => (
          <ChapterAccordion key={chapter._id} chapter={chapter} />
        ))}
      </div>
    </div>
  );
}
