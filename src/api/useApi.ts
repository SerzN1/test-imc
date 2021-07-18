import { useEffect, useState } from 'react';

export const useApi = (url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setError(null);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(error);
        setIsLoading(false);
        setError(err);
        setData([]);
      });
  }, [url, error]);

  return {
    isLoading,
    data,
    error,
  };
};
