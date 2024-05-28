import { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';

function useFetch<T>(
  asyncFunc: () => Promise<AxiosResponse<T>>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const { data: result } = await asyncFunc();
        setData(result);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [...dependencies]);

  return { data, error, isLoading };
}

export default useFetch;
