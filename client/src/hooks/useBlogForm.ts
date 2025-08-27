import { useForm } from "react-hook-form";
import { blogSchema, type BlogType } from "../lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPost, fetchBlogById, updateBlog } from "../utils/http";
import {  useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const useBlogForm = () => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate()
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
  useEffect(()=>{
    if(id){
        fetchBlogById(id).then((data)=>{
            console.log("Prefill blog data: ",data)
            reset(data)
        })
    }
  },[id,reset])

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
      navigate('/')
    } catch (error) {
      console.error(" Error submitting blog form:", error);
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
