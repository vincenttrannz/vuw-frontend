import { useEffect, useState } from 'react';

export default function useFetch(url: string) {
  const [data, setData] = useState<any>([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url);
        const json = await res.json();

        setData(json);
        setLoading(false);
      } catch (error) {
        setErr(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { loading, err, data };
}
