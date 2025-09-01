import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Text from "../components/ui/text";
import { fetchBlogById } from "../utils/http";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !data?.blog) return <p>Something went wrong...</p>;

  const blog = data.blog;

  return (
    <div className="max-w-3xl mx-auto p-8 text-left space-y-4">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-auto rounded-lg"
      />
      <Text className="text-3xl font-bold">{blog.title}</Text>
      <Text className="text-gray-700 leading-7">{blog.content}</Text>

      <div className="text-xs text-gray-400 mt-2">
        Category: {blog.category}
      </div>
      <div className="text-xs text-gray-400">Tags: {blog.tags.join(", ")}</div>
      <div>Reading Time: {blog.readingTime} min 📖</div>
    </div>
  );
};

export default BlogDetail;
