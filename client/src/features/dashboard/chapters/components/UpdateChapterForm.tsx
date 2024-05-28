import { FormEvent, useState } from 'react';
import Input from '../../../../components/ui/Input';
import { useChaptersContext } from '../context/chaptersContext';
interface UpdateChapterFormProps {
  chapterId: string;
  title: string;
  onCloseModal: () => void;
}
export default function UpdateChapterForm({
  chapterId,
  title,
  onCloseModal,
}: UpdateChapterFormProps) {
  const [titleInput, setTitleInput] = useState<string>(title);

  const { updateChapter, updating } = useChaptersContext();

  const handleUpdateChapter = async (e: FormEvent) => {
    e.preventDefault();
    if (updating) return;

    await updateChapter(chapterId, { title: titleInput });
    setTitleInput('');
    onCloseModal();
  };

  return (
    <form onSubmit={handleUpdateChapter}>
      <Input
        id="title"
        name="title"
        label="Title"
        type="text"
        value={titleInput}
        onChange={(e) => setTitleInput(e.target.value)}
      />
      <div className="flex justify-end gap-1 mt-2 ">
        <button
          className="font-medium mr-2"
          type="button"
          onClick={onCloseModal}
        >
          Cancel
        </button>
        <button
          disabled={updating || !titleInput}
          className="py-1 px-3   rounded-md font-medium text-white bg-indigo-600"
        >
          {updating ? 'Updating...' : 'Update'}
        </button>
      </div>
    </form>
  );
}
