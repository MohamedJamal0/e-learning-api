import { StudentCourseResponse } from '../types';
import StudentCourseCardItem from './StudentCourseCardItem';

interface StudentCoursesCardListProps {
  courses: StudentCourseResponse[];
}
export default function StudentCoursesCardList({
  courses,
}: StudentCoursesCardListProps) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses?.map((course) => (
        <StudentCourseCardItem key={course.id} course={course} />
      ))}
    </ul>
  );
}
