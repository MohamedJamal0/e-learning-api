import { ElearningApi } from '../../../../services/apiElearning';
import {
  ChapterResponse,
  CreateChapter,
  UpdateChapter,
} from '../types/chapter';

export const getChapters = (courseId: string) =>
  ElearningApi.get<ChapterResponse[]>(`admin/chapters?courseId=${courseId}`);

export const createChapter = (chapter: CreateChapter) =>
  ElearningApi.post<ChapterResponse>(`admin/chapters`, chapter);

export const updateChapter = (chapterId: string, chapter: UpdateChapter) =>
  ElearningApi.patch<ChapterResponse>(`admin/chapters/${chapterId}`, chapter);

export const deleteChapter = (chapterId: string) =>
  ElearningApi.delete(`admin/chapters/${chapterId}`);

export const publishChapter = (chapterId: string) =>
  ElearningApi.patch(`admin/chapters/${chapterId}/publish`);

export const updateChapterOrder = (chapterId: string, order: number) =>
  ElearningApi.patch(`admin/chapters/${chapterId}/update_order`, {
    order: order + 1,
  });
