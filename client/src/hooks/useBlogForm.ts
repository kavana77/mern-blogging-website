import { useForm } from "react-hook-form";
import { blogSchema, type BlogType } from "../lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPost, fetchBlogById, updateBlog } from "../utils/http";
import { useNavigate, useParams } from "react-router-dom";

const useBlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    getValues,
  } = useForm<BlogType>({
    resolver: zodResolver(blogSchema),
    defaultValues: async () => {
      const data = await fetchBlogById(id);
      return {
        title: data.blog.title,
        firstLine: data.blog.firstLine,
        content: data.blog.content,
        image: data.blog.image,
        tags: data.blog.tags,
        category: data.blog.category,
        readingTime: data.blog.readingTime,
      };
    },
  });

  const onSubmit = async (formData: BlogType) => {
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("firstLine", formData.firstLine);
      data.append("content", formData.content);
      data.append("file", formData.image);
      data.append("tags", formData.tags.join(" , "));
      data.append("category", formData.category);
      data.append("readingTime", formData.readingTime.toString());
      if (id) {
        await updateBlog(id, data);
      } else {
        await createPost(data);
      }
      navigate("/");
    } catch (error) {
      console.error(" Error submitting blog form:", error);
      alert("You must be signed in to create a blog");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    setValue,
    watch,
    getValues,
  };
};

export default useBlogForm;
