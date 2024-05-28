import { Link } from 'react-router-dom';
import { StudentCourseResponse } from '../types';

interface StudentCourseCardItemProps {
  course: StudentCourseResponse;
}

export default function StudentCourseCardItem({
  course,
}: StudentCourseCardItemProps) {
  return (
    <li>
      <Link
        className=" block rounded-md shadow-md p-4 hover:scale-105 hover:rotate-2 duration-500"
        to={`/learning/${course.title}/lecture/${course.firstLectureId}`}
      >
        <img
          className="w-full h-40 rounded-md object-cover"
          src={course.coverImage}
          alt=""
        />
        <h3 className="mt-3 text-lg font-medium">{course.title}</h3>
        <p>{course.completionPercentage || 0}%</p>
        <div className="relative bg-gray-300 h-3 rounded-md overflow-hidden">
          <span
            style={{ width: `${course.completionPercentage || 0}%` }}
            className="absolute top-0 left-0 h-full bg-green-500"
          ></span>
        </div>
      </Link>
    </li>
  );
}
