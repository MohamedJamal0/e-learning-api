import CourseCardItem from './CourseCardItem';
import { CourseResponse } from '../types';

interface CourseListProps {
  courses: CourseResponse[];
}

export default function CourseCardsList({ courses }: CourseListProps) {
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4   ">
      {courses?.map((course) => (
        <CourseCardItem key={course._id} course={course} />
      ))}
    </ul>
  );
}
