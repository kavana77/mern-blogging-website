import type { IPostProps } from "../types/data";
import { Link } from "react-router-dom";
import Text from "./ui/text";

const Post = ({ post }: IPostProps) => {
  return (
    <div className="border-2 border-gray-200 p-6 flex gap-6">
      <div className="space-y-2">
        <Link to={`/${post.id}`}>
          <Text className="text-xl font-bold text-pink-600 hover:underline">
            {post.title}
          </Text>
        </Link>
        <Text variant="muted">{post.body}</Text>
        <div className="text-indigo-900">
          👀 {post.views} | 👍{post.reactions.likes} | 👎
          {post.reactions.dislikes}
        </div>
      </div>
    </div>
  );
};

export default Post;
