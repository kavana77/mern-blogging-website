import { Loader2 } from "lucide-react";
import usePosts from "../hooks/usePosts";
import InfiniteScrollContainer from "../components/InfiniteScrollContainer";
import Post from "../components/Post";

const BlogListPage = () => {
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = usePosts(10);
  const posts = data?.pages.flatMap((page) => page.posts);

  if (isPending) {
    return <Loader2 className="animate-spin mx-auto" />;
  }
  return (
    <section className="space-y-4 mb-10 p-12">
      {posts && posts.length > 0 && (
        <InfiniteScrollContainer
          onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
          className="space-y-3"
        >
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
          {isFetchingNextPage && (
            <div className="flex justify-centermy-4">
              <Loader2 className="animate-spin" />
            </div>
          )}
        </InfiniteScrollContainer>
      )}
      {!isError && !posts?.length && (
        <div className="text-center">No comments yet..</div>
      )}
      {isError && <div> Error loading posts: {error.message}</div>}
    </section>
  );
};

export default BlogListPage;
