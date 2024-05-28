import { UpdateLecture, CreateLecture, LectureResponse } from '../types';
import { ElearningApi } from '../../../../services/apiElearning';

export const getLectures = (courseId: string) =>
  ElearningApi.get<LectureResponse[]>(`admin/lectures`, {
    params: { courseId },
  });

export const deleteLecture = (lectureId: string) =>
  ElearningApi.delete(`admin/lectures/${lectureId}`);

export const createLecture = (lecture: CreateLecture) =>
  ElearningApi.post<LectureResponse>(`admin/lectures`, lecture);

export const updateLecture = (lectureId: string, lecture: UpdateLecture) =>
  ElearningApi.patch<LectureResponse>(`admin/lectures/${lectureId}`, lecture);

export const updateLectureOrder = (lectureId: string, newOrder: number) =>
  ElearningApi.patch(`admin/lectures/${lectureId}/update_order`, {
    order: newOrder + 1,
  });

export const publishLecture = (lectureId: string) =>
  ElearningApi.patch(`admin/lectures/${lectureId}/publish`);
