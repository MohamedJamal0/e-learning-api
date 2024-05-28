import { useErrorBoundary } from 'react-error-boundary';
import { getCourse as getCourseApi } from '../services';
import { handleAxiosError } from '../../../../utils';
import useFetch from '../../../../hooks/useFetch';
import { UpdateCourseResponse } from '../types';
export default function useAdminCourse(id: string) {
  const { data, isLoading, error } = useFetch<UpdateCourseResponse>(
    () => getCourseApi(id),
    [id]
  );

  const { showBoundary } = useErrorBoundary();

  if (error) {
    showBoundary(handleAxiosError(error));
  }

  return { course: data as UpdateCourseResponse, isLoading };
}
