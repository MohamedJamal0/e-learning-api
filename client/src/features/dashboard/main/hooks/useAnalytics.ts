import { handleAxiosError } from '../../../../utils';
import { getAnalytics } from '../services';
import { useErrorBoundary } from 'react-error-boundary';
import useFetch from '../../../../hooks/useFetch';
import { AnalyticsResponse } from '../types';
export default function useAnalytics() {
  const { data, isLoading, error } = useFetch(getAnalytics);
  const { showBoundary } = useErrorBoundary();

  if (error) {
    showBoundary(handleAxiosError(error));
  }

  return {
    analytics: data as AnalyticsResponse,
    analyticsLoading: isLoading,
  };
}
