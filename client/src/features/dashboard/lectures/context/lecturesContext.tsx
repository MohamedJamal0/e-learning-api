import { createContext, useContext, useEffect, useState } from 'react';
import { CreateLecture, LectureResponse, UpdateLecture } from '../types';
import {
  createLecture as createLectureApi,
  updateLecture as updateLectureApi,
  deleteLecture as deleteLectureApi,
  getLectures as getLecturesApi,
  publishLecture as publishLectureApi,
  updateLectureOrder as updateLectureOrderApi,
} from '../services';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { dragELement, handleAxiosError } from '../../../../utils';
import { useErrorBoundary } from 'react-error-boundary';
import { AxiosError } from 'axios';

interface LectureContextType {
  lectures: LectureResponse[];
  loading: boolean;
  isUploading: boolean;
  updating: boolean;
  creating: boolean;
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
  createLecture: (lecture: CreateLecture) => Promise<void>;
  updateLecture: (lectureId: string, lecture: UpdateLecture) => Promise<void>;
  deleteLecture: (lectureId: string) => Promise<void>;
  publishLecture: (lectureId: string) => Promise<void>;
  updateLectureOrder: (currentOrder: number, newOrder: number) => Promise<void>;
}

const LectureContext = createContext<LectureContextType | null>(null);

export const LectureProvider = ({ children }: any) => {
  const [lectures, setLectures] = useState<LectureResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [creating, setCreating] = useState(false);

  const { showBoundary } = useErrorBoundary();

  const { courseId } = useParams() as { courseId: string };

  const createLecture = async (lecture: CreateLecture) => {
    setCreating(true);
    try {
      const { data: newLecture } = await createLectureApi(lecture);
      setLectures((prev) => [...prev, newLecture]);
    } catch (err) {
      toast.error('Failed to create lecture');
    } finally {
      setCreating(false);
    }
  };

  const updateLecture = async (lectureId: string, lecture: UpdateLecture) => {
    setUpdating(true);
    try {
      const { data: updatedLecture } = await updateLectureApi(
        lectureId,
        lecture
      );
      setLectures((prev) =>
        prev.map((lec) => (lec._id === lectureId ? updatedLecture : lec))
      );
      toast.success('Lecture updated successfully');
    } catch (err) {
      toast.error('Failed to update lecture');
    } finally {
      setUpdating(false);
    }
  };

  const deleteLecture = async (lectureId: string) => {
    try {
      await deleteLectureApi(lectureId);
      setLectures((prev) => prev.filter((lec) => lec._id !== lectureId));
    } catch (err) {
      const error = handleAxiosError(err as AxiosError);
      if (error.status === 401) toast.error(`${error.message}`);
      else toast.error('Failed to delete lecture');
    }
  };

  const getLectures = async () => {
    setLoading(true);
    try {
      const { data: lectures } = await getLecturesApi(courseId);
      setLectures(lectures);
    } catch (err) {
      showBoundary(handleAxiosError(err as AxiosError));
    } finally {
      setLoading(false);
    }
  };

  const publishLecture = async (lectureId: string) => {
    try {
      setLectures((prev) =>
        prev.map((lecture) =>
          lecture._id === lectureId
            ? { ...lecture, isPublished: !lecture.isPublished }
            : lecture
        )
      );
      await publishLectureApi(lectureId);
    } catch (err) {
      setLectures((prev) =>
        prev.map((lecture) =>
          lecture._id === lectureId
            ? { ...lecture, isPublished: !lecture.isPublished }
            : lecture
        )
      );
      toast.error('Failed to update lecture status');
      throw err;
    }
  };

  const updateLectureOrder = async (currentOrder: number, newOrder: number) => {
    setLectures((prev) => dragELement(prev, currentOrder, newOrder));
    const lectureId = lectures[currentOrder]._id;
    try {
      await updateLectureOrderApi(lectureId, newOrder);
    } catch (err) {
      setLectures((prev) => dragELement(prev, newOrder, currentOrder));
      toast.error('Failed to update lecture order');
    }
  };

  useEffect(() => {
    getLectures();
  }, []);

  const value = {
    lectures,
    loading,
    isUploading,
    updating,
    creating,
    setIsUploading,
    createLecture,
    updateLecture,
    deleteLecture,
    updateLectureOrder,
    publishLecture,
  };

  return (
    <LectureContext.Provider value={value}>{children}</LectureContext.Provider>
  );
};

export const useLecturesContext = () => {
  const context = useContext(LectureContext);
  if (!context) {
    throw new Error('useLecturesContext must be used within a LectureProvider');
  }
  return context;
};
