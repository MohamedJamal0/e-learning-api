import useCreateCourse from '../hooks/useCreateCourse';
import { FaPlus } from 'react-icons/fa6';

export default function CreateCourseBtn() {
  const { createCourse } = useCreateCourse();

  return (
    <button
      onClick={createCourse}
      className="flex items-center gap-2  rounded-md font-semibold text-indigo-500  hover:text-orange-500 duration-300"
    >
      <FaPlus className="w-5 h-5 mt-1" />
      <span>Create Course</span>
    </button>
  );
}
