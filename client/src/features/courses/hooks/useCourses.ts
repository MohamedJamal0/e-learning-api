import { getCourses } from '../services';
import { CourseResponse } from '../types';
import { useErrorBoundary } from 'react-error-boundary';
import { handleAxiosError } from '../../../utils';
import useFetch from '../../../hooks/useFetch';
export default function useCourses() {
  const {
    data: courses,
    error,
    isLoading,
  } = useFetch<CourseResponse[]>(getCourses);
  const { showBoundary } = useErrorBoundary();

  if (error) {
    showBoundary(handleAxiosError(error));
  }

  return { courses, isLoading };
}
