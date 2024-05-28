import { useState } from 'react';
import { uploadVideo } from '../../../../services/apiCloudinary';
import { useLecturesContext } from '../context/lecturesContext';
import toast from 'react-hot-toast';
export default function useAddLectureVideo(lectureId: string) {
  const [progressPar, setProgressPar] = useState<number>(0);
  const { updateLecture, setIsUploading } = useLecturesContext();

  const addLectureVideo = async (video: File) => {
    setIsUploading(true);
    try {
      const { url: videoUrl, duration } = await uploadVideo(
        video,
        setProgressPar
      );
      await updateLecture(lectureId, { videoUrl, duration });
    } catch (err) {
      toast.error('Failed to upload video try again');
    } finally {
      setProgressPar(0);
      setIsUploading(false);
    }
  };
  return { addLectureVideo, progressPar };
}
