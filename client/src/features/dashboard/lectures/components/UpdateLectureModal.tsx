import { useState } from 'react';
import UpdateLectureForm from './UpdateLectureForm';
import { FiEdit } from 'react-icons/fi';

import Modal from '../../../../components/ui/Modal';
import { LectureResponse } from '../types';

interface UpdateLectureModalProps {
  lecture: LectureResponse;
  lectureId: string;
}

export default function UpdateLectureModal({
  lecture,
}: UpdateLectureModalProps) {
  const [open, setOpen] = useState(false);
  return (
    <Modal open={open} onChange={() => setOpen(!open)}>
      <Modal.Open>
        <FiEdit className="w-5 h-5 text-indigo-600 " />
      </Modal.Open>
      <Modal.Window>
        <Modal.Header>Update Lecture</Modal.Header>
        <Modal.Body className="px-6 py-8 w-[90vw] md:w-[70vw] lg:w-[50vw]  overflow-auto">
          <UpdateLectureForm {...lecture} onCloseModal={() => setOpen(false)} />
        </Modal.Body>
      </Modal.Window>
    </Modal>
  );
}
