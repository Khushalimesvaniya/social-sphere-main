// Example implementation of useUser hook
import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useUser = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/users/${userId}` : null,
    fetcher
  );

  // console.log("useUser hook - data:", data);
  // console.log("useUser hook - error:", error);
  // console.log("useUser hook - isLoading:", isLoading);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
