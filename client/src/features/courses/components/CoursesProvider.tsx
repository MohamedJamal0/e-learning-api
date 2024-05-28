import CourseList from './CourseCardsList';
import useCourses from '../hooks/useCourses';
import CoursesLoading from './CoursesLoading';
export default function CoursesProvider() {
  const { courses, isLoading } = useCourses();

  if (isLoading)
    return (
      <div>
        <CoursesLoading />
      </div>
    );
  if (!courses) return <div>No courses found</div>;

  return <CourseList courses={courses} />;
}
