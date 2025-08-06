import { useForm, type FieldValues } from "react-hook-form";
import { signInSchema,type SignInType, signUpSchema,type SignUpType } from "../lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { signInUser, signUpUser } from "../utils/http";

const useUserAuthForm = (type: "sign-in" | "sign-up") => {
    const isSignIn = type === "sign-in"

    const form= useForm<SignUpType | SignInType>({
        resolver: zodResolver(isSignIn ? signInSchema : signUpSchema)
    })
    const {reset} = form;

    useEffect(() => {
        reset()
    },[type, reset])

    const onSubmit = async (data: FieldValues)=> {
        try {
            if(isSignIn){
                const signInData = await signInUser(data as SignInType)
                console.log("Sign In Successful: ", signInData)
            }else{
                const signUpData = await signUpUser(data as SignUpType)
                console.log("Sign up successful: ", signUpData)
            }
            reset()
        } catch (error) {
            console.error("Auth error: ", error)
            alert((error as Error).message)
        }
    }
    return {form, onSubmit, isSignIn}
}
 
export default useUserAuthForm;