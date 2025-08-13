import { useForm } from "react-hook-form";
import { blogSchema, type BlogType  } from "../lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
const useBlogForm = () => {
    const blogForm = useForm<BlogType>({resolver:zodResolver( blogSchema)})
    const { reset, handleSubmit, register, formState: { errors, isSubmitting}} = blogForm;
    const onSubmit = async (data: BlogType)=>{
        try {
            console.log("Blog Data: ", data)
            reset()
        } catch (error) {
            console.error("Error submitting blog form: ", error)
            alert((error as Error).message)
        }
    }
    return { handleSubmit, register, errors, isSubmitting, onSubmit}
}
 
export default useBlogForm;