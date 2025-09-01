import { useQuery } from "@tanstack/react-query";
import { searchBlogs } from "../utils/http";

const useSearchPost = (search: string) => {
  return useQuery({
    queryKey: ["searchPosts", search],
    queryFn: () => searchBlogs(search),
    enabled: !!search,
  });
};

export default useSearchPost;
