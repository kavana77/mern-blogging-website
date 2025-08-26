import { Button } from "./ui/button";
import DefaultBanner from "../assets/images/blogbanner.png";
import useBlogForm from "../hooks/useBlogForm";
import { Editor } from "primereact/editor";
import { useEffect, useState } from "react";
import { blogSchema } from "../lib/zodSchema";
import { ArrowLeftIcon} from "lucide-react";
import { Link } from "react-router-dom";
const BlogForm = () => {
  const categories = blogSchema.shape.category.options;

  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    setValue,
    watch,
    getValues,
  } = useBlogForm();
  const [showPreview, setShowPreview] = useState(false);
  const [newTag, setNewTag] = useState("");

  const content = watch("content", "");
  const tags = watch("tags", []);

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.ceil(wordCount / 100);

  useEffect(() => {
    setValue("readingTime", readingTime);
  }, [readingTime, setValue]);

  const handleAddTag = (tag: string) => {
    const trimmed = tag.trim();
    const currentTags: string[] = getValues("tags") || [];
    if (trimmed && !currentTags.includes(trimmed)) {
      setValue("tags", [...currentTags, trimmed], { shouldValidate: true });
    }
    setNewTag("");
  };

  const handleRemoveTag = (tag: string) => {
    const currentTags: string[] = getValues("tags") || [];
    setValue(
      "tags",
      currentTags.filter((t) => t !== tag),
      { shouldValidate: true }
    );
  };

  return (
    <>
      <nav className="sticky top-0 flex justify-between items-center w-full px-12 py-5 h-[80px] border-b border-grey bg-white">
        <Link to="/" className="absolute z-10 left-7 text-gray-500 ">
        <ArrowLeftIcon />
        </Link>
        <img
          src="/public/blog-logo.png"
          className="object-cover w-28 md:w-34"
        />
      </nav>

      <section className="mx-auto max-w-[900px] w-full p-12 my-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="aspect-video bg-white border-4 border-gray-200 mb-6">
            <label htmlFor="uploadBanner" className="cursor-pointer">
              <img
                src={
                  watch("image") && watch("image") instanceof File
                    ? URL.createObjectURL(watch("image") as File)
                    : DefaultBanner
                }
                className="w-full h-full object-cover"
              />
              <input
                {...register("image", { required: "Image is required" })}
                id="uploadBanner"
                type="file"
                accept=".png,.jpg,.jpeg"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setValue("image", file, { shouldValidate: true });
                }}
              />
              {errors.image && (
                <p className="text-red-500">{errors.image.message}</p>
              )}
            </label>
          </div>

          <textarea
            {...register("title", { required: "Title is required" })}
            placeholder="Blog Title"
            className="text-3xl font-medium w-full h-20 outline-none resize-none mt-4 leading-tight border-b-2 border-gray-300"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}

          <textarea
            {...register("firstLine", { required: "First line is required" })}
            placeholder="eg: This is my blog content...."
            className="text-2xl font-medium w-full h-20 outline-none resize-none mt-4 leading-tight border-b-2 border-gray-300"
          />
          {errors.firstLine && (
            <p className="text-red-500">{errors.firstLine.message}</p>
          )}

          <div className="my-9">
            <Editor
              {...register("content")}
              value={content}
              onTextChange={(e) => setValue("content", e.textValue || "")}
              placeholder="Write your blog content here..."
            />
            {errors.content && (
              <p className="text-red-500">{errors.content.message}</p>
            )}

            <Button
              type="button"
              className="mt-4"
              onClick={() => setShowPreview(true)}
            >
              Save
            </Button>

            {showPreview && (
              <div className="mt-6 p-4 border rounded bg-gray-50">
                <h3 className="font-semibold mb-2">Preview</h3>
                <p className="whitespace-pre-wrap">
                  {content || "No content yet."}
                </p>
              </div>
            )}
          </div>

          <div className="mb-12 flex flex-wrap gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add tag"
              className="border rounded px-2 py-1 mr-2"
            />
            {errors.tags && (
              <p className="text-red-500">{errors.tags.message}</p>
            )}

            <button
              type="button"
              onClick={() => handleAddTag(newTag)}
              className="bg-blue-950 text-white px-3 py-1 rounded"
            >
              Add
            </button>

            {tags?.map((tag: string) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center gap-1"
              >
                {tag}
                <button type="button" onClick={() => handleRemoveTag(tag)}>
                  ×
                </button>
              </span>
            ))}
          </div>

          <div className="my-14">
            <label className="mr-2 font-semibold">Category:</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="border rounded px-2 py-1 mb-4"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="mr-2 font-semibold">Reading Time:</label>
            <input
              {...register("readingTime", { valueAsNumber: true })}
              type="number"
              readOnly
              className="border rounded px-2 py-1 bg-gray-100 cursor-not-allowed"
            />
            {errors.readingTime && (
              <p className="text-red-500">{errors.readingTime.message}</p>
            )}
          </div>

          <Button
            type="submit" disabled={isSubmitting}
            className="bg-blue-950 rounded-full cursor-pointer hover:bg-blue-900"
          >
            {isSubmitting ? "Publishing..." :"Publish"}
          </Button>
        </form>
      </section>
    </>
  );
};

export default BlogForm;
