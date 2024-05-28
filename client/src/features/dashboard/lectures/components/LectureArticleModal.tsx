import Modal from '../../../../components/ui/Modal';
import { useState } from 'react';
import { MdOutlineArticle } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa6';
import LectureArticleForm from './LectureArticleForm';

interface LectureArticleProps {
  lectureId: string;
  article: string | null;
}
export default function LectureArticleModal({
  lectureId,
  article,
}: LectureArticleProps) {
  const [isShow, setIsShow] = useState(false);

  return (
    <Modal open={isShow} onChange={() => setIsShow((prev) => !prev)}>
      <Modal.Open className="flex items-center gap-1 p-1 rounded-md border text-sm text-white font-semibold bg-indigo-500  ">
        {article ? (
          <MdOutlineArticle className="w-4 h-4 cursor-pointer" />
        ) : (
          <>
            <FaPlus className="w-3 h-3" />
            <MdOutlineArticle className="w-4 h-4 cursor-pointer" />
          </>
        )}
      </Modal.Open>
      <Modal.Window>
        <Modal.Header>Lecture Article</Modal.Header>
        <Modal.Body className="px-8 py-8 sm:w-[90vw] md:w-[70vw] lg:w-[50vw] overflow-auto">
          <LectureArticleForm lectureId={lectureId} article={article} />
        </Modal.Body>
      </Modal.Window>
    </Modal>
  );
}
