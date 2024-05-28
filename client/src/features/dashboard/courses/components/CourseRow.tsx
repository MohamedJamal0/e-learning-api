import { Link } from 'react-router-dom';
import { DashboardCourseResponse } from '../types';

export interface CourseRowProps {
  course: DashboardCourseResponse;
}
export default function CourseRow({ course }: CourseRowProps) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {course.title || 'N/A'}
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        ${course.price || 'N/A'}
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {course.isPublished ? (
          <span className="text-green-500">Published</span>
        ) : (
          <span className="text-red-500">Not Published</span>
        )}
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {course.numberOfStudents}
      </td>
      <td className="px-6 py-4">
        <Link
          to={`/dashboard/course/${course._id}/manage`}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
}
