import useFetch from '../../../../hooks/useFetch';
import { isCoursePublished as isCoursePublishedApi } from '../services';
import { handleAxiosError } from '../../../../utils';
import { useErrorBoundary } from 'react-error-boundary';

export default function useIsCoursePublished(courseId: string) {
  const { data, isLoading, error } = useFetch<{ isPublished: boolean }>(
    () => isCoursePublishedApi(courseId),
    [courseId]
  );

  const { showBoundary } = useErrorBoundary();

  if (error) {
    showBoundary(handleAxiosError(error));
  }

  return { isPublished: data?.isPublished, isLoading };
}
