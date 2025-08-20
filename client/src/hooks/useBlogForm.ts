import { useForm } from "react-hook-form";
import { blogSchema, type BlogType } from "../lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPost } from "../utils/http";

const useBlogForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    getValues,
  } = useForm<BlogType>({
    resolver: zodResolver(blogSchema),
  });

  const onSubmit = async (data: BlogType) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("firstLine", data.firstLine);
      formData.append("content", data.content);
      formData.append("file", data.image);
      formData.append("tags", data.tags.join(" , "));
      formData.append("category", data.category);
      formData.append("readingTime", data.readingTime.toString());

      const response = await createPost(formData);
      console.log(" Blog created:", response);
      reset();
    } catch (error) {
      console.error(" Error submitting blog form:", error);
      alert((error as Error).message);
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
