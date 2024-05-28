import { MdDelete } from 'react-icons/md';
import { useChaptersContext } from '../context/chaptersContext';
export default function DeleteChapter({ chapterId }: { chapterId: string }) {
  const { deleteChapter } = useChaptersContext();
  const handleDeleteChapter = async (e: any) => {
    e.stopPropagation();
    deleteChapter(chapterId);
  };
  return (
    <button onClick={handleDeleteChapter}>
      <MdDelete className="w-5 h-5  " />
    </button>
  );
}
