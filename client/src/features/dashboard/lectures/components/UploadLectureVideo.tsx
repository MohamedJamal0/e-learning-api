import { FaPlus, FaVideo } from 'react-icons/fa6';
import { useLecturesContext } from '../context/lecturesContext';
import UploadWidget from '../../../../components/UploadWidget';

interface UploadLectureVideoProps {
  lectureId: string;
}

export default function UploadLectureVideo({
  lectureId,
}: UploadLectureVideoProps) {
  const { updateLecture } = useLecturesContext();
  return (
    <div className=" relative overflow-hidden">
      <UploadWidget
        onUpload={(file) =>
          updateLecture(lectureId, {
            videoUrl: file.url,
            duration: file.duration,
          })
        }
        resourceType="video"
        maxFileSize={300 * 1024 * 1024}
      >
        <div className="flex items-center gap-1 p-1 border   rounded-md font-semibold  text-sm bg-indigo-500 text-white">
          <FaPlus className="w-4 h-4 " />
          <FaVideo className="w-4 h-4 " />
        </div>
      </UploadWidget>
    </div>
  );
}
