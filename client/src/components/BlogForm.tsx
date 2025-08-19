import { Button } from "./ui/button";
import DefaultBanner from "../assets/images/blogbanner.png";
import useBlogForm from "../hooks/useBlogForm";
import { Editor } from "primereact/editor";
import { useEffect, useState } from "react";
import { blogSchema } from "../lib/zodSchema";
import type { FieldValues } from "react-hook-form";

const BlogForm = () => {
  const categories = blogSchema.shape.category.options;

  const { register, handleSubmit, onSubmit, errors } = useBlogForm();
  const [banner, setBanner] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [content, setContent] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.ceil(wordCount / 100);
    setReadingTime(minutes || 0);
  }, [content]);

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setBanner(file);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleFormSubmit = (data: FieldValues) => {

    if (!banner) {
      alert("Please upload a banner image!");
      return;
    }

    onSubmit({
      title: data.title,
      firstLine: data.firstLine,
      content: content,
      image: banner, 
      tags: tags,
      category: data.category,
      readingTime: readingTime,
    });
  };

  return (
    <>
      <nav className="sticky top-0 flex justify-between items-center w-full px-12 py-5 h-[80px] border-b border-grey bg-white">
        <img src="/public/blog-logo.png" className="object-cover w-28 md:w-34" />
      </nav>

      <section className="mx-auto max-w-[900px] w-full p-12 my-8">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="aspect-video bg-white border-4 border-gray-200 mb-6">
            <label htmlFor="uploadBanner" className="cursor-pointer">
              <img
                src={banner ? URL.createObjectURL(banner) : DefaultBanner}
                className="w-full h-full object-cover"
              />
              <input
                id="uploadBanner"
                type="file"
                accept=".png,.jpg,.jpeg"
                hidden
                onChange={handleBannerUpload}
              />
            </label>
          </div>

          <textarea
            {...register("title", { required: "Title is required" })}
            placeholder="Blog Title"
            className="text-3xl font-medium w-full h-20 outline-none resize-none mt-4 leading-tight border-b-2 border-gray-300"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}

          <textarea
            {...register("firstLine", { required: "First line is required" })}
            placeholder="eg: This is my blog content...."
            className="text-2xl font-medium w-full h-20 outline-none resize-none mt-4 leading-tight border-b-2 border-gray-300"
          />
          {errors.firstLine && <p className="text-red-500">{errors.firstLine.message}</p>}

          <div className="my-9">
            <Editor
              value={content}
              onTextChange={(e) => setContent(e.textValue || "")}
              placeholder="Write your blog content here..."
            />
            <Button type="button" className="mt-4" onClick={() => setShowPreview(true)}>
              Save
            </Button>
            {showPreview && (
              <div className="mt-6 p-4 border rounded bg-gray-50">
                <h3 className="font-semibold mb-2">Preview</h3>
                <p className="whitespace-pre-wrap">{content || "No content yet."}</p>
              </div>
            )}
          </div>

          <div className="mb-12 flex flex-wrap gap-2">
            <input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add tag"
              className="border rounded px-2 py-1 mr-2"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-blue-950 text-white px-3 py-1 rounded"
            >
              Add
            </button>
            {tags.map((tag) => (
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
            <select {...register("category", { required: "Category is required" })} className="border rounded px-2 py-1 mb-4">
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label className="mr-2 font-semibold">Reading Time:</label>
            <input
              type="text"
              value={readingTime ? `${readingTime} min` : ""}
              readOnly
              className="border rounded px-2 py-1 bg-gray-100 cursor-not-allowed"
            />
          </div>
          <Button
            type="submit"
            className="bg-blue-950 rounded-full cursor-pointer hover:bg-blue-900"
          >
            Publish
          </Button>
        </form>
      </section>
    </>
  );
};

export default BlogForm;
