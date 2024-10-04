import { useEffect, useState } from 'react';

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export const useFetch = <T = unknown>(url: string): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setError(null);
    const controller = new AbortController();

    if (url) {
      (async () => {
        try {
          setLoading(true);
          const response = await fetch(url, { signal: controller.signal });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const result: T = await response.json();
          setData(result);
        } catch (err) {
          if (err instanceof Error) {
            if (err.name !== 'AbortError') {
              setError(err);
            }
          }
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setData(null);
      setLoading(false);
    }

    return () => {
      controller.abort();
    };
  }, [url]);

  return { loading, error, data };
};
