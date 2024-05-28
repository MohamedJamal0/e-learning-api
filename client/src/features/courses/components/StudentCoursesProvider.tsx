import PageLoading from '../../../components/ui/PageLoading';
import useStudentCourses from '../hooks/useStudentCourses';
import StudentCoursesCardList from './StudentCoursesCardList';

export default function StudentCoursesProvider() {
  const { studentCourses, isLoading } = useStudentCourses();

  if (isLoading) return <PageLoading />;

  if (studentCourses?.length === 0)
    return (
      <div className="text-xl text-center font-medium">No courses found</div>
    );
  return <StudentCoursesCardList courses={studentCourses} />;
}
