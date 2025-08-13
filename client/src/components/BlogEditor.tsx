import { Button } from "./ui/button";
import DeffaultBanner from "../assets/images/blogbanner.png"
import useBlogForm from "../hooks/useBlogForm";
import { Editor } from 'primereact/editor';
        

interface BlogEditorProps {
    onNext: () => void
}
const BlogEditor = ({onNext}: BlogEditorProps) => {

   const {register, handleSubmit, onSubmit,errors} = useBlogForm()
   
    const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0]
        console.log("File uploaded:", file)
    }
    const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>)=>{
        if(e.keyCode === 13 ){
            e.preventDefault()
        }
    }
    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        const title = e.target
        title.style.height = "auto"
        title.style.height = title.scrollHeight + "px"
    }

    return (
        <>
       <nav className="sticky top-0 flex justify-between items-center w-full px-12 py-5 h-[80px] border-b border-grey bg-white">
            <img src="/public/blog-logo.png" className="object-cover w-28 md:w-34" />
            <Button className="bg-blue-950 rounded-full" onClick={onNext}
            >Publish</Button>
       </nav>
       <section>
            <form  className="mx-auto max-w-[900px] w-full p-12 my-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="relative aspect-video bg-white border-4 border-gray-200">
                    <label htmlFor="uploadBanner">
                        <img src={DeffaultBanner} className="z-20"/>
                        <input id="uploadBanner"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={handleBannerUpload}/>
                    </label>
                </div>
                <textarea {...register("title")}
                placeholder="Blog Title"
                className="text-3xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight border-b-2 border-gray-300"
                onChange={handleTitleChange}
                onKeyDown={handleTitleKeyDown}
                ></textarea>
                {errors.title && (<p className="text-red-500">{errors.title.message}</p>)}
                <Editor
                    {...register("content")}
                    className="mt-6 h-[300px] mb-24 md:mb-18"
                    placeholder="Write your blog content here..."
                    />
                {/* <Button 
                    onClick={() => handleEditorContentSave(content)}
                 className="rounded-full ">Save</Button> */}

            </form>
       </section>
       </>
     );
}
 
export default BlogEditor;