import useStudentCourses from '../hooks/useStudentCourses';

import StudentCoursesCardList from './StudentCoursesCardList';
import StudentCoursesLoading from './StudentCoursesLoading';
import { Link } from 'react-router-dom';

export default function StudentCoursesProvider() {
  const { studentCourses, isLoading } = useStudentCourses();

  return (
    <div>
      <h1 className="text-3xl font-medium border-b pb-10 mb-10 ">My Courses</h1>
      {isLoading ? (
        <StudentCoursesLoading />
      ) : studentCourses?.length === 0 ? (
        <div className="space-y-4">
          <p className="text-xl font-medium ">No courses purchased yet!</p>
          <p className="text-lg">
            Time to explore and enroll in courses that interest you.
          </p>
          <Link to="/" className="block w-fit px-4 py-2 border font-medium rounded-md">
            Start searching available courses.
          </Link>
        </div>
      ) : (
        <StudentCoursesCardList courses={studentCourses} />
      )}
    </div>
  );
}
