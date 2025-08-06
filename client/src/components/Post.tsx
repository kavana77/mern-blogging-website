import type { IPostProps } from "../types/data";
import { Link } from "react-router-dom";
import Text from "./ui/text";

const Post = ({ post }: IPostProps) => {
  return (
    <div className="border-2 border-gray-200 p-6 flex gap-6">
      <div>
        <img src={post.image} />
      </div>
      <div className="space-y-2">
        <Link to={`/${post._id}`}>
          <Text className="text-xl font-bold text-pink-600 hover:underline">
            {post.title}
          </Text>
        </Link>
        <Text variant="muted">{post.firstLine}</Text>
        <div className="text-indigo-900">
          {post.author?.name} | {new Date(post.createdAt).toLocaleDateString()} 
        </div>
      </div>
    </div>
  );
};

export default Post;
