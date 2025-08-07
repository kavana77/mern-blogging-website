import { fetchBlogs } from "../utils/http";
import { useInfiniteQuery } from "@tanstack/react-query";

const usePosts = (limit: number) => {
  return useInfiniteQuery({
    queryKey: ["blog"],
    queryFn: ({ pageParam = 0 }) => fetchBlogs(pageParam, limit),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const total = lastPage.total;
      const loaded = allPages.reduce((sum, page) => sum + page.posts.length, 0);
      return loaded < total ? allPages.length : undefined;
    },
  });
};
export default usePosts;
