import { useParams } from 'react-router-dom';
import { getLectureContent } from '../services';
import useFetch from '../../../hooks/useFetch';
import { LectureContentResponse } from '../types';
import { useErrorBoundary } from 'react-error-boundary';
import { handleAxiosError } from '../../../utils';
export default function useLectureContent() {
  const { lectureId } = useParams() as {
    lectureId: string;
  };

  const { showBoundary } = useErrorBoundary();

  const { data, isLoading, error } = useFetch<LectureContentResponse>(
    () => getLectureContent(lectureId),
    [lectureId]
  );

  if (error) {
    showBoundary(handleAxiosError(error));
  }

  return { data, isLoading };
}
