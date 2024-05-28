import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import Input from '../../../../components/ui/Input';
import { FormEvent } from 'react';
import { useChaptersContext } from '../context/chaptersContext';
import { useParams } from 'react-router-dom';

export default function CreateChapter() {
  const [isShow, setIsShow] = useState(false);
  const [title, setTitle] = useState('');

  const { createChapter, creating } = useChaptersContext();

  const { courseId } = useParams() as { courseId: string };

  const handleCreateChapter = async (e: FormEvent) => {
    e.preventDefault();
    if (creating) return;
    await createChapter({ courseId, title });

    setIsShow(false);
    setTitle('');
  };

  return (
    <div className="mt-6">
      <button
        className="flex items-center gap-2 font-medium px-6  text-indigo-600 hover:text-orange-400 duration-200"
        onClick={() => setIsShow(!isShow)}
      >
        <FaPlus className="w-4 h-4" />
        Chapter
      </button>
      {isShow && (
        <form
          onSubmit={handleCreateChapter}
          className="p-5 mt-2 border border-black rounded-md w-full"
        >
          <Input
            id="title"
            name="title"
            label="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="flex justify-end gap-1 mt-2 ">
            <button
              className="font-medium mr-2"
              type="button"
              onClick={() => setIsShow(false)}
            >
              Cancel
            </button>
            <button
              disabled={creating || !title}
              className="py-1 px-3  rounded-md font-medium text-white bg-indigo-600"
            >
              {creating ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
