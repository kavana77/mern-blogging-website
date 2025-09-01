import { Loader2 } from "lucide-react";
import usePosts from "../hooks/usePosts";
import InfiniteScrollContainer from "../components/InfiniteScrollContainer";
import Post from "../components/Post";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useSearchPost from "../hooks/useSearchPost";
import type { BlogList } from "../types/data";

const BlogListPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("q") || "";
  const { isSignIn } = useAuth();
  const navigate = useNavigate();
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = usePosts(5);
  const {
    data: searchResult,
    isLoading: isSearching,
    isError: isSearchError,
  } = useSearchPost(search);

  const posts = data?.pages.flatMap((page) => page.posts);

  if (isPending) {
    return <Loader2 className="animate-spin mx-auto" />;
  }
  return (
    <section className="space-y-4 mb-10 p-12">
      {search ? (
        <>
          {isSearching && <Loader2 className="animate-spin mx-auto" />}
          {isSearchError && <div>Error loading search result</div>}
          {searchResult?.blogs && searchResult.blogs.length > 0
            ? searchResult.blogs.map((post: BlogList) => (
                <Post key={post._id} post={post} />
              ))
            : !searchResult && (
                <div className="text-ce">No result found...</div>
              )}
        </>
      ) : (
        <>
          {posts && posts.length > 0 && (
            <InfiniteScrollContainer
              onBottomReached={() =>
                hasNextPage && !isFetching && fetchNextPage()
              }
              className="space-y-3"
            >
              {posts.map((post) => (
                <Post key={post._id} post={post} />
              ))}
              {isFetchingNextPage && (
                <div className="flex justify-centermy-4">
                  <Loader2 className="animate-spin" />
                </div>
              )}
            </InfiniteScrollContainer>
          )}
          {!posts?.length && <div className="text-center">No posts yet..</div>}
          {isError && <div> Error loading posts: {error.message}</div>}
          {!isSignIn && (
            <div className="flex justify-center  w-full fixed bottom-0 py-6  bg-white">
              <button
                onClick={() => navigate("/signin")}
                className="bg-gradient-to-l from-blue-950 to-pink-900 text-white px-6 py-4 rounded-full cursor-pointer"
              >
                View more...
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default BlogListPage;
