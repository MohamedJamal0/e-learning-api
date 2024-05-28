import { createContext, useContext, useEffect, useState } from 'react';
import {
  getChapters as getChaptersApi,
  deleteChapter as deleteChapterApi,
  createChapter as createChapterApi,
  updateChapter as updateChapterApi,
  publishChapter as publishChapterApi,
  updateChapterOrder as updateChapterOrderApi,
} from '../services';
import {
  CreateChapter,
  UpdateChapter,
  ChapterResponse,
} from '../types/chapter';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { dragELement, handleAxiosError } from '../../../../utils';
import { useErrorBoundary } from 'react-error-boundary';
import { AxiosError } from 'axios';

interface ChapterContextType {
  chapters: ChapterResponse[];
  loading: boolean;
  updating: boolean;
  creating: boolean;
  createChapter: (chapter: CreateChapter) => Promise<void>;
  updateChapter: (chapterId: string, chapter: UpdateChapter) => Promise<void>;
  deleteChapter: (chapterId: string) => Promise<void>;
  publishChapter: (chapterId: string) => Promise<void>;
  updateChapterOrder: (currentOrder: number, newOrder: number) => Promise<void>;
}

const ChapterContext = createContext<ChapterContextType | null>(null);

export function ChapterProvider({ children }: any) {
  const [chapters, setChapters] = useState<ChapterResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [creating, setCreating] = useState(false);

  const { courseId } = useParams() as { courseId: string };

  const { showBoundary } = useErrorBoundary();

  const getChapters = async () => {
    setLoading(true);
    try {
      const { data: chapters } = await getChaptersApi(courseId);
      setChapters(chapters);
    } catch (err) {
      showBoundary(handleAxiosError(err as AxiosError));
    } finally {
      setLoading(false);
    }
  };

  const createChapter = async (chapter: CreateChapter) => {
    setCreating(true);
    try {
      const { data: createdChapter } = await createChapterApi(chapter);
      setChapters((prev) => [...prev, createdChapter]);
    } catch (err) {
      toast.error('Failed to create chapter');
    } finally {
      setCreating(false);
    }
  };

  const updateChapter = async (chapterId: string, chapter: UpdateChapter) => {
    setUpdating(true);
    try {
      const { data: updatedChapter } = await updateChapterApi(
        chapterId,
        chapter
      );
      setChapters((prev) =>
        prev.map((chapt) => (chapt._id === chapterId ? updatedChapter : chapt))
      );
    } catch (err) {
      toast.error('Failed to update chapter');
    } finally {
      setUpdating(false);
    }
  };

  const publishChapter = async (chapterId: string) => {
    try {
      setChapters((prev) =>
        prev.map((chapter) =>
          chapter._id === chapterId
            ? { ...chapter, isPublished: !chapter.isPublished }
            : chapter
        )
      );
      await publishChapterApi(chapterId);
    } catch (err) {
      setChapters((prev) =>
        prev.map((chapter) =>
          chapter._id === chapterId
            ? { ...chapter, isPublished: !chapter.isPublished }
            : chapter
        )
      );
      toast.error('something went wrong please try again');
    }
  };

  const updateChapterOrder = async (currentOrder: number, newOrder: number) => {
    try {
      setChapters((prev) =>
        dragELement<ChapterResponse>(prev, currentOrder, newOrder)
      );
      const chapterId = chapters[currentOrder]._id;
      await updateChapterOrderApi(chapterId, newOrder);
    } catch (error) {
      toast.error('Failed to update chapter order');
      setChapters((prev) =>
        dragELement<ChapterResponse>(prev, newOrder, currentOrder)
      );
    }
  };

  const deleteChapter = async (chapterId: string) => {
    try {
      await deleteChapterApi(chapterId);

      setChapters((prev) =>
        prev?.filter((chapter) => chapter._id !== chapterId)
      );
    } catch (err) {
      const error = handleAxiosError(err as AxiosError);
      if (error.status === 401) toast.error(`${error.message}`);
      else toast.error('Failed to delete chapter');
    }
  };

  useEffect(() => {
    getChapters();
  }, [courseId]);

  const contextValue = {
    chapters,
    loading,
    updating,
    creating,
    createChapter,
    updateChapter,
    deleteChapter,
    publishChapter,
    updateChapterOrder,
  };

  return (
    <ChapterContext.Provider value={contextValue}>
      {children}
    </ChapterContext.Provider>
  );
}

export const useChaptersContext = () => {
  const context = useContext(ChapterContext);
  if (!context) {
    throw new Error('useChaptersContext must be used within a ChapterProvider');
  }
  return context;
};
