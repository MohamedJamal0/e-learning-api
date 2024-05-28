import { ElearningApi } from '../../../../services/apiElearning';

import { DashboardCourseResponse, UpdateCourseResponse } from '../types';
import { removeEmptyValues } from '../../../../utils';

export const getCourses = () =>
  ElearningApi.get<DashboardCourseResponse[]>('admin/courses');

export const getCourse = (id: string) =>
  ElearningApi.get<UpdateCourseResponse>(`admin/courses/${id}`);

export const createCourse = () => ElearningApi.post('admin/courses');

export const updateCourse = (
  courseId: string,
  course: UpdateCourseResponse
) => {
  const _course = removeEmptyValues(course);
  return ElearningApi.patch(`admin/courses/${courseId}`, _course);
};

export async function deleteCourse(id: string) {
  await ElearningApi.delete(`admin/courses/${id}`);
}

export const publishCourse = (id: string) =>
  ElearningApi.patch(`admin/courses/${id}/publish`);

export const isCoursePublished = (id: string) =>
  ElearningApi.get<{ isPublished: boolean }>(`admin/courses/${id}/is-published`);
