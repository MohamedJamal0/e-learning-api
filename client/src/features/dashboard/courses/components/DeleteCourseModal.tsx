import { useState } from 'react';

import useDeleteCourse from '../hooks/useDeleteCourse';
import Modal from '../../../../components/ui/Modal';
import { useParams } from 'react-router-dom';

export default function DeleteCourseModal() {
  const [isShow, setIsShow] = useState(false);
  const { deleteCourse, isDeleting } = useDeleteCourse();

  const { courseId } = useParams();

  const handleDeleteCourse = async () => {
    if (!courseId) return;
    await deleteCourse(courseId);
  };

  return (
    <Modal open={isShow} onChange={() => setIsShow((prev) => (prev = !prev))}>
      <Modal.Open className="border border-black w-48 py-3 hover:bg-slate-100 duration-200 font-medium">
        Delete Course
      </Modal.Open>
      <Modal.Window>
        <Modal.Header>Delete Course</Modal.Header>

        <Modal.Body className="px-8 py-6">
          <p>Are you sure you want to delete this course?</p>
          <div className="flex justify-end gap-5 mt-3">
            <button onClick={() => setIsShow(false)}>No</button>
            <button
              onClick={handleDeleteCourse}
              className="px-3 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 duration-100"
            >
              {isDeleting ? '...' : 'Yes'}
            </button>
          </div>
        </Modal.Body>
      </Modal.Window>
    </Modal>
  );
}
