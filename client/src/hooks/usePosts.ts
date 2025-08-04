import { fetchBlogs } from "../utils/http";
import { useInfiniteQuery } from "@tanstack/react-query";

const usePosts = (limit: number) => {
  return useInfiniteQuery({
    queryKey: ["blog"],
    queryFn: ({ pageParam = 0 }) => fetchBlogs(limit, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const total = lastPage.total;
      const loaded = allPages.length * limit;
      return loaded < total ? loaded : undefined;
    },
  });
};

export default usePosts;
