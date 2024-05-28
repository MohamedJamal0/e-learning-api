import { useState } from 'react';
import { TextEditor } from '../../../../components/TextEditor';
import { useLecturesContext } from '../context/lecturesContext';

interface LectureArticleFormProps {
  article: string | null;
  lectureId: string;
}
export default function LectureArticleForm({
  article,
  lectureId,
}: LectureArticleFormProps) {
  const [articleInput, setArticleInput] = useState(article || '');
  const { updateLecture } = useLecturesContext();

  const handleSubmitUpdateArticle = async (event: React.FormEvent) => {
    event.preventDefault();

    await updateLecture(lectureId, { article: articleInput });
  };

  return (
    <form onSubmit={handleSubmitUpdateArticle}>
      <TextEditor
        className=" w-full h-60 mb-14"
        value={articleInput}
        onChange={setArticleInput}
      />
      <div className="flex justify-end mt-3">
        <button className="py-1 px-3 rounded-md font-medium text-white bg-indigo-600">
          save
        </button>
      </div>
    </form>
  );
}
