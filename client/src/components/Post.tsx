import { Link } from "react-router-dom";
import Text from "./ui/text";
import type { IPostProps } from "../types/data";

const Post = ({ post }: IPostProps) => {
  return (
    <div className="relative border-2 border-gray-200 h-40 p-2 flex gap-6 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="w-40  flex-shrink-0 overflow-hidden rounded-lg">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="space-y-2 flex-1">
        <Link to={`/blogs/${post._id}`}>
          <Text className="text-xl font-bold text-pink-600 hover:underline">
            {post.title}
          </Text>
        </Link>

        <Text variant="muted" className="line-clamp-2">
          {post.firstLine}
        </Text>
        <div className="absolute  top-2 right-4">
          <Link to={`/editor/${post._id}`} className="underline">
            Edit
          </Link>
        </div>

        <div className="text-sm text-indigo-900">
          {post.author?.name} |{" "}
          {new Date(post.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
