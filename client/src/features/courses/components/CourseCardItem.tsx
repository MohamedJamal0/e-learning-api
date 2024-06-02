import { Link } from 'react-router-dom';
import { CourseResponse } from '../types';
import CldImage from '../../../components/CldImage';

interface CourseItemProps {
  course: CourseResponse;
}

export default function CourseCardItem({ course }: CourseItemProps) {
  const { title, subtitle, coverImage, price } = course;

  return (
    <li>
      <Link
        className=" flex flex-col h-[320px] rounded-md border shadow-custom bg-white hover:-translate-y-2 duration-500"
        to={`/course/${title.split(' ').join('-')}`}
      >
        <CldImage
          url={coverImage}
          width={300}
          height={200}
          className="rounded-t-md w-full h-40"
        />
        <div className="p-3">
          <h1 className=" font-medium text-lg text-blue-700">{title}</h1>
          <p className="mt-2 text-blue-600">
            {subtitle.length > 100 ? `${subtitle.slice(0, 100)}...` : subtitle}
          </p>
        </div>
        <div className="px-3 py-4 flex justify-between items-end flex-1 ">
          <p className="text-2xl font-medium text-blue-700">
            {course.isFree ? 'Free' : `$${price}`}
          </p>
          <button className=" px-3 py-1 rounded-md font-medium text-white bg-blue-700 hover:bg-indigo-900 duration-200">
            Buy Now
          </button>
        </div>
      </Link>
    </li>
  );
}
