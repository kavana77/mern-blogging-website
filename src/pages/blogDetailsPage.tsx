import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Text from "../components/ui/text";

const fetchBlogById = async (id: string) => {
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  if (!res.ok) throw new Error("Failed to load blog");
  return res.json();
};

const BlogDetail = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id!),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong...</p>;

  return (
    <div className="max-w-3xl mx-auto p-18 text-center">
      <Text className="text-2xl font-bold px-12">{data.title}</Text>
      <Text className="text-gray-600 mt-2 p-2">{data.body}</Text>
      <div className="mt-4 text-sm text-gray-500">
        👀 {data.views} | 👍 {data.reactions.likes} | 👎{" "}
        {data.reactions.dislikes}
      </div>
      <div className="mt-2 text-xs text-gray-400">
        Tags: {data.tags.join(", ")}
      </div>
    </div>
  );
};

export default BlogDetail;
