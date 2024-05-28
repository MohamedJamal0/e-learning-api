import { MdDelete } from 'react-icons/md';
import { useLecturesContext } from '../context/lecturesContext';

interface DeleteChapterProps {
  lectureId: string;
  chapterId: string;
}
export default function DeleteLecture({ lectureId }: DeleteChapterProps) {
  const { deleteLecture } = useLecturesContext();
  const handleDeleteLecture = async () => {
    deleteLecture(lectureId);
  };
  return (
    <button  onClick={handleDeleteLecture}>
      <MdDelete className="w-5 h-5" />
    </button>
  );
}
