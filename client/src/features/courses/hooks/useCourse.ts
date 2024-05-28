import { CourseDetailsResponse } from '../types';
import { getCourse } from '../services';
import { useErrorBoundary } from 'react-error-boundary';
import { handleAxiosError } from '../../../utils';
import useFetch from '../../../hooks/useFetch';
import { useParams } from 'react-router-dom';

export default function useCourse() {
  const { courseTitle } = useParams() as { courseTitle: string };

  const _courseTitle = courseTitle
    .split('-')
    .filter((a) => a !== '-')
    .join(' ');

  const {
    data: course,
    error,
    isLoading,
  } = useFetch<CourseDetailsResponse>(
    () => getCourse(_courseTitle),
    [courseTitle]
  );

  const { showBoundary } = useErrorBoundary();

  if (error) {
    showBoundary(handleAxiosError(error));
  }

  return { course, isLoading };
}
