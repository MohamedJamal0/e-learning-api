import { getLastJoinedStudentsData } from '../services';
import { handleAxiosError } from '../../../../utils';
import { useErrorBoundary } from 'react-error-boundary';
import useFetch from '../../../../hooks/useFetch';

export default function useLastJoinedStudentsData() {
  const { data, isLoading, error } = useFetch(getLastJoinedStudentsData);

  const { showBoundary } = useErrorBoundary();

  if (error) {
    showBoundary(handleAxiosError(error));
  }

  return {
    lastJoinedStudentsData: data,
    lastJoinedStudentsDataLoading: isLoading,
  };
}
