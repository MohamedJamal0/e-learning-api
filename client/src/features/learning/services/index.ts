import { ElearningApi } from '../../../services/apiElearning';
import { CourseWithProgressResponse, LectureContentResponse } from '../types';

export const getCourseWithProgress = async (courseTitle: string) =>
  await ElearningApi.get<CourseWithProgressResponse>(
    `/courses/${courseTitle}/learning`
  );

export const getLectureContent = async (lectureId: string) =>
  await ElearningApi.get<LectureContentResponse>(
    `admin/lectures/${lectureId}/content`
  );

export async function toggleLectureCompletion(
  courseId: string,
  lectureId: string
) {
  await ElearningApi.post(
    `/courses/${courseId}/lectures/${lectureId}/complete`
  );
}
