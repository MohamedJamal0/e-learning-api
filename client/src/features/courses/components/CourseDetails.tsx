import { secondsToHoursMinutes } from '../../../utils';
import { CourseDetailsResponse } from '../types';
import CourseChapters from './CourseChapters';
import CoursePriceCard from './CoursePriceCard';
import { calculateCourseDuration } from '../../../utils';

interface CourseDetailsProps {
  course: CourseDetailsResponse;
}

export default function CourseDetails({ course }: CourseDetailsProps) {
  const numOfLectures = course?.chapters.reduce(
    (acc, curr) => acc + curr.lectures.length,
    0
  );

  const courseDuration = calculateCourseDuration(course);

  const { hours, minutes } = secondsToHoursMinutes(courseDuration);

  const firstLecture = course?.chapters[0].lectures[0]._id;

  return (
    <>
      <div className="py-12 text-white bg-blue-950">
        <div className=" relative max-w-7xl px-[2%] mx-auto">
          <div className="max-w-3xl">
            <h1 className="mb-2.5 text-3xl font-medium">{course?.title}</h1>
            <p className="mb-6 text-lg">{course?.subtitle}</p>
            <div className="flex items-center gap-2">
              <span className="bg-blue-600 px-3 py-1 rounded bg-opacity-70">
                {course?.level}
              </span>
              <span className="min-w-[60px] px-3 py-1 rounded bg-blue-600  bg-opacity-70">
                {`${hours ? `${hours}h` : ''} ${minutes}m`}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative max-w-7xl mx-auto py-10 px-[2%]">
        <div className="lg:w-[60vw] lg:max-w-4xl">
          <h2 className="text-2xl font-medium mb-4">Course Overview</h2>
          <div
            className="xl:max-w-3xl"
            dangerouslySetInnerHTML={{ __html: course?.description }}
          ></div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos tenetur
            magni quos nisi obcaecati voluptas excepturi nostrum laboriosam
            nihil delectus, sint at, enim modi id. Sequi harum sunt molestias
            corporis.
          </p>
          <CoursePriceCard {...course} firstLecture={firstLecture} />

          <div className="flex items-center justify-between py-8 mb-5">
            <h2 className="text-2xl font-medium">Course Content</h2>
            <div className=" font-medium text-blue-950">
              <span>{course?.chapters.length} chapters</span>
              <span> • </span>
              <span> {numOfLectures} lectures</span>
            </div>
          </div>
          <div className="border rounded-md space-y-2 shadow-md p-3">
            <CourseChapters
              courseTitle={course?.title}
              chapters={course?.chapters}
            />
          </div>
        </div>
      </div>
    </>
  );
}
