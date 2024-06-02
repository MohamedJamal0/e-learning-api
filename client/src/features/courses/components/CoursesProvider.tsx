import CourseList from './CourseCardsList';
import useCourses from '../hooks/useCourses';
import CoursesLoading from './CoursesLoading';
import NoCoursesFound from './NoCoursesFound';
export default function CoursesProvider() {
  const { courses, isLoading } = useCourses();

  if (isLoading)
    return (
      <div>
        <CoursesLoading />
      </div>
    );
  if (courses?.length === 0) return <NoCoursesFound />;

  return <CourseList courses={courses} />;
}
