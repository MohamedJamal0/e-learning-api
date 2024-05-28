import { getPurchases } from '../services';

import { handleAxiosError } from '../../../../utils';
import { useErrorBoundary } from 'react-error-boundary';

import useFetch from '../../../../hooks/useFetch';
import { PurchaseResponse } from '../types';

export default function usePurchases() {
  const { data, isLoading, error } = useFetch(getPurchases);

  const { showBoundary } = useErrorBoundary();

  if (error) {
    showBoundary(handleAxiosError(error));
  }

  return {
    purchases: data as PurchaseResponse[],
    purchasesLoading: isLoading,
  };
}
