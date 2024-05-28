import Switch from '../../../../components/ui/Switch';
import { useParams } from 'react-router-dom';
import usePublishCourse from '../hooks/usePublishCourse';
import { useState } from 'react';

interface PublishCourseBtnProps {
  isPublished: boolean;
}
export default function PublishCourseBtn({
  isPublished,
}: PublishCourseBtnProps) {
  const { courseId } = useParams();

  const [isPublishedInput, setIsPublished] = useState(isPublished);

  const { publishCourse } = usePublishCourse(courseId as string);

  const handlePublishCourse = async () => {
    setIsPublished((prev) => !prev);
    try {
      await publishCourse();
    } catch (err) {
      setIsPublished((prev) => !prev);
    }
  };

  return (
    <div className="flex items-center gap-3 mb-8 ">
      <div className=" font-medium">Publish</div>
      <Switch onChange={handlePublishCourse} value={isPublishedInput} />
    </div>
  );
}
