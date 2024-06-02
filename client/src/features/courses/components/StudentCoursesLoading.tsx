import Skeleton from '../../../components/ui/Skeleton';

const StudentCoursesLoading = () => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <li key={index} className="block rounded-md shadow-md p-4">
          <Skeleton className="w-full h-40 rounded-md" />
          <Skeleton className="mt-3 h-6 w-3/4 rounded-md" />
          <Skeleton className="mt-2 h-4 w-1/4 rounded-md" />
          <Skeleton className="mt-2 h-3 w-full rounded-md" />
        </li>
      ))}
    </ul>
  );
};

export default StudentCoursesLoading;
