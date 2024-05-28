import useCourse from '../hooks/useCourse';
import PageLoading from '../../../components/ui/PageLoading';
import CourseDetails from './CourseDetails';

export default function CourseProvider() {
  const { course, isLoading } = useCourse();

  if (isLoading || !course) {
    return <PageLoading />;
  }

  return <CourseDetails course={course} />;
}
