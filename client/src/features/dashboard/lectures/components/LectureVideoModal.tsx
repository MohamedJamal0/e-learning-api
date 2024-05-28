import { useState } from 'react';
import Modal from '../../../../components/ui/Modal';
import { FaVideo } from 'react-icons/fa6';
interface LectureVideoModalProps {
  videoUrl: string;
}
export default function LectureVideoModal({
  videoUrl,
}: LectureVideoModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Modal open={open} onChange={() => setOpen(!open)}>
      <Modal.Open className="flex items-center gap-1 p-1 border  rounded-md font-semibold  text-sm bg-indigo-500 text-white">
        <FaVideo className="w-4 h-4 " />
      </Modal.Open>
      <Modal.Window>
        <Modal.Body>
          <div className="w-full aspect-video">
            <video
              className="w-full h-full"
              controlsList="nodownload"
              controls
              autoPlay
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag
            </video>
          </div>
        </Modal.Body>
      </Modal.Window>
    </Modal>
  );
}
