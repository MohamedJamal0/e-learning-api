import { useLecturesContext } from '../context/lecturesContext';
import Switch from '../../../../components/ui/Switch';

interface PublishLectureProps {
  isPublished: boolean;
  lectureId: string;
  isDisabled: boolean;
}
export default function PublishLecture({
  isPublished,
  lectureId,
  isDisabled,
}: PublishLectureProps) {
  const { publishLecture } = useLecturesContext();

  return (
    <Switch
      value={isPublished}
      onChange={() => publishLecture(lectureId)}
      isDisabled={isDisabled}
    />
  );
}
