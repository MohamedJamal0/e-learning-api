import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import Input from '../../../../components/ui/Input';
import { useLecturesContext } from '../context/lecturesContext';
import { FormEvent } from 'react';
import { useParams } from 'react-router-dom';

export default function CreateLecture({ chapterId }: { chapterId: string }) {
  const [isShow, setIsShow] = useState(false);
  const [title, setTitle] = useState('');

  const { createLecture, creating } = useLecturesContext();

  const { courseId } = useParams() as { courseId: string };

  const handleCreateLecture = async (e: FormEvent) => {
    e.preventDefault();
    if (creating) return;
    await createLecture({ title, chapterId, courseId });
    setIsShow(false);
    setTitle('');
  };

  return (
    <div className="mt-6 px-12 pb-6">
      <button
        className="flex items-center gap-2 font-medium text-indigo-600 hover:text-orange-400 duration-200"
        onClick={() => setIsShow(!isShow)}
      >
        <FaPlus className="w-4 h-4" />
        lecture
      </button>
      {isShow && (
        <form
          onSubmit={handleCreateLecture}
          className="p-5 mt-2 border border-black bg-white rounded-md"
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
              disabled={!title || creating}
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
