import { useState } from 'react';
import Modal from '../../../../components/ui/Modal';
import { FaPen } from 'react-icons/fa6';
import UpdateChapterForm from './UpdateChapterForm';

interface UpdateChapterModalProps {
  chapterId: string;
  title: string;
}
export default function UpdateChapterModal({
  chapterId,
  title,
}: UpdateChapterModalProps) {
  const [isShow, setIsShow] = useState<boolean>(false);

  const handleOnCloseModal = () => {
    setIsShow(false);
  };

  return (
    <Modal open={isShow} onChange={() => setIsShow((prev) => !prev)}>
      <Modal.Open>
        <FaPen className="w-4 h-4 cursor-pointer" />
      </Modal.Open>
      <Modal.Window>
        <Modal.Body className="px-8 py-4">
          <UpdateChapterForm
            chapterId={chapterId}
            title={title}
            onCloseModal={handleOnCloseModal}
          />
        </Modal.Body>
      </Modal.Window>
    </Modal>
  );
}
