import UploadLectureVideo from './UploadLectureVideo';
import LectureVideoModal from './LectureVideoModal';

interface LectureVideoProps {
  videoUrl: string | null;
  lectureId: string;
}

export default function LectureVideo({
  videoUrl,
  lectureId,
}: LectureVideoProps) {
  if (!videoUrl) return <UploadLectureVideo lectureId={lectureId} />;
  if (videoUrl) return <LectureVideoModal videoUrl={videoUrl} />;
}
