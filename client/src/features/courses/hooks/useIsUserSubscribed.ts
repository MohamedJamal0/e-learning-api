import { isUserSubscribed as isUserSubscribedApi } from '../services';
import useFetch from '../../../hooks/useFetch';
import { IsSubscribedResponse } from '../types';

export default function useIsUserSubscribed(courseId: string) {
  const { data, isLoading } = useFetch<IsSubscribedResponse>(
    () => isUserSubscribedApi(courseId),
    [courseId]
  );

  return { isUserSubscribed: data?.isSubscribed, isLoading };
}
