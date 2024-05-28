import { getCourses } from '../services';
import { handleAxiosError } from '../../../../utils';
import { useErrorBoundary } from 'react-error-boundary';
import { DashboardCourseResponse } from '../types';
import useFetch from '../../../../hooks/useFetch';

export default function useAdminCourses() {
  const { data, isLoading, error } =
    useFetch<DashboardCourseResponse[]>(getCourses);

  const { showBoundary } = useErrorBoundary();

  if (error) {
    showBoundary(handleAxiosError(error));
  }

  return {
    adminCourses: data as DashboardCourseResponse[],
    adminCoursesLoading: isLoading,
  };
}
