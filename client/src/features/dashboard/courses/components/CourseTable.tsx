import CourseRow from './CourseRow';
import CreateCourseBtn from './CreateCourseBtn';
import { DashboardCourseResponse } from '../types';

export interface CourseTableProps {
  courses: DashboardCourseResponse[];
}
export default function CourseTable({ courses }: CourseTableProps) {
  return (
    <div className=" flex-1">
      <div className="flex items-start justify-between mb-8 ">
        <h2 className="text-lg font-semibold">My Courses</h2>
        <CreateCourseBtn />
      </div>

      <div className="shadow-md sm:rounded-lg">
        <table className="w-full   overflow-auto  text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>

              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                n. Students
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {courses?.map((course) => (
              <CourseRow key={course._id} course={course} />
            ))}
            {courses?.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center">
                  No courses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
