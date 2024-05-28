import { useParams } from 'react-router-dom';
import useIsCoursePublished from '../hooks/useIsCoursePublished';
import DeleteCourseModal from './DeleteCourseModal';
import PublishCourseBtn from './PublishCourseBtn';
import Spinner from '../../../../components/ui/Spinner';

export default function ManageCourseSettings() {
  const { courseId } = useParams() as { courseId: string };
  const { isPublished, isLoading } = useIsCoursePublished(courseId);

  return (
    <div>
      <div className=" py-6 px-12 border-b">
        <h1 className="text-3xl font-medium">Settings</h1>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="p-12">
          <h2 className="font-semibold text-lg mb-2">Course Status</h2>
          <p className="mb-6">
            This course is not published, it will not be visible in the
            marketplace.
          </p>
          <div>
            <PublishCourseBtn isPublished={isPublished as boolean} />
            <DeleteCourseModal />
          </div>
        </div>
      )}
    </div>
  );
}
