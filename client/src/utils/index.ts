import { AxiosError } from 'axios';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CourseDetailsResponse } from '../features/courses/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dragELement<T>(array: T[], from: number, to: number) {
  const updatedArray = [...array];

  const [removed] = updatedArray.splice(from, 1);

  updatedArray.splice(to, 0, removed);

  return updatedArray;
}

export function secondsToHoursMinutes(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const remainingSeconds = seconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  return { hours, minutes };
}

interface ErrorResponse {
  message: string;
  status?: number;
}

export function handleAxiosError(error: AxiosError): ErrorResponse {
  const errorResponse: any = error.response;
  if (errorResponse) {
    return {
      message: `${errorResponse.data.msg || errorResponse.data.error}`,
      status: errorResponse.status,
    };
  } else if (error.request) {
    return { message: 'Network error. Please check your internet connection.' };
  } else {
    return { message: 'Error occurred while fetching data.' };
  }
}

export const removeEmptyValues = (object: any) =>
  Object.fromEntries(
    Object.entries(object).filter(([_, value]) => value !== '')
  );

export const calculateChapterDuration = (
  chapter: CourseDetailsResponse['chapters'][0]
) => {
  return chapter.lectures.reduce((acc, curr) => acc + curr.duration, 0);
};

export const calculateCourseDuration = (course: CourseDetailsResponse) => {
  return course.chapters.reduce(
    (acc, curr) => acc + calculateChapterDuration(curr),
    0
  );
};
