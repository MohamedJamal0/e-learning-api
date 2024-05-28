import CourseSkeleton from './CourseSkeleton';
export default function CoursesLoading() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <CourseSkeleton />
      <CourseSkeleton />
      <CourseSkeleton />
      <CourseSkeleton />
      <CourseSkeleton />
      <CourseSkeleton />
      <CourseSkeleton />
      <CourseSkeleton />
      <CourseSkeleton />
    </div>
  );
}
