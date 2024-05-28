import { useLecturesContext } from '../context/lecturesContext';
import { useState } from 'react';
import Switch from '../../../../components/ui/Switch';
import Input from '../../../../components/ui/Input';
type LectureForm = {
  title: string;
  isFree: boolean;
};

interface UpdateLectureFormProps {
  _id: string;
  title: string;
  isFree: boolean;
  onCloseModal: () => void;
}
export default function UpdateLectureForm({
  _id,
  title,
  isFree,
  onCloseModal,
}: UpdateLectureFormProps) {
  const [lectureForm, setLectureForm] = useState<LectureForm>({
    title,
    isFree,
  });

  const { updateLecture, updating } = useLecturesContext();

  const handleOnChangeInput = (
    key: keyof LectureForm,
    value: string | boolean
  ) => {
    setLectureForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleOnSaveUpdates = async () => {
    if (updating) return;
    await updateLecture(_id, { ...lectureForm });
    onCloseModal();
  };

  return (
    <div className="">
      <Input
        id="title"
        name="title"
        label="Lecture Title"
        type="text"
        placeholder="Lecture title"
        value={lectureForm.title}
        onChange={(e) => handleOnChangeInput('title', e.target.value)}
        className="mb-4"
      />

      <div className="flex gap-10 ">
        <div className="flex items-center">
          <label className="mr-2">Free</label>
          <Switch
            value={lectureForm.isFree}
            onChange={(value) => handleOnChangeInput('isFree', value)}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="py-1 px-3  rounded-md font-medium text-white bg-indigo-600"
          onClick={handleOnSaveUpdates}
          disabled={updating || !lectureForm.title}
        >
          {updating ? 'Updating...' : 'Update'}
        </button>
      </div>
    </div>
  );
}
