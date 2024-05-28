import {
  CourseResponse,
  CourseDetailsResponse,
  IsSubscribedResponse,
  StudentCourseResponse,
} from '../types';
import { ElearningApi } from '../../../services/apiElearning';

export const getCourses = () => ElearningApi.get<CourseResponse[]>('courses');

export const getCourse = (courseTitle: string) =>
  ElearningApi.get<CourseDetailsResponse>(`courses/${courseTitle}`);

export const getStudentCourses = () =>
  ElearningApi.get<StudentCourseResponse[]>('courses/student-courses');

export const isUserSubscribed = (courseId: string) =>
  ElearningApi.get<IsSubscribedResponse>(`courses/${courseId}/is-subscribed`);

export const attendFreeCourse = (courseId: string) =>
  ElearningApi.post(`courses/${courseId}/attend-free`);
