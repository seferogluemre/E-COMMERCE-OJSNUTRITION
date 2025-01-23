import { useEffect, useState } from "react";
import { BASE_URL } from "../routes/pages/Products/components/types";
import axios from "axios";

const useFetch = <T>(slug: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(BASE_URL + `/products/${slug}`);
        setData(response.data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  return { data, loading, error };
};

export default useFetch;
