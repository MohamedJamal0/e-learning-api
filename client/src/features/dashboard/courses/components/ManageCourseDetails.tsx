import { useParams } from 'react-router-dom';
import useAdminCourse from '../hooks/useAdminCourse';
import UpdateCourseForm from './UpdateCourseForm';
import Spinner from '../../../../components/ui/Spinner';

export default function ManageCourseDetails() {
  const { courseId } = useParams() as { courseId: string };

  const { course, isLoading } = useAdminCourse(courseId);

  return (
    <div>
      <div className=" py-6 px-12 border-b">
        <h1 className="text-3xl font-medium">Curriculum</h1>
      </div>
      <div className="p-12">
        {isLoading ? <Spinner /> : <UpdateCourseForm course={course} />}
      </div>
    </div>
  );
}
