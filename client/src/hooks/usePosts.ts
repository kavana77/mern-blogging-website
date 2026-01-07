import { fetchBlogs, fetchPublicBlogs } from "../utils/http";
import { useInfiniteQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const usePosts = (limit: number) => {
  const { isSignIn, token } = useAuth();

  return useInfiniteQuery({
    queryKey: ["posts", { isSignIn }],
    queryFn: async ({ pageParam = 0 }) => {
      if (isSignIn) {
        return await fetchBlogs(pageParam, limit, token);
      } else {
        return await fetchPublicBlogs();
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!isSignIn) return undefined;
      const total = lastPage.total;
      const loaded = allPages.reduce((sum, page) => sum + page.posts.length, 0);
      return loaded < total ? allPages.length : undefined;
    },
  });
};

export default usePosts;
