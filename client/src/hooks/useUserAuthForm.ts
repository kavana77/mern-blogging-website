import { useForm, type FieldValues } from "react-hook-form";
import {
  signInSchema,
  type SignInType,
  signUpSchema,
  type SignUpType,
} from "../lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { signInUser, signUpUser } from "../utils/http";
import { useNavigate } from "react-router-dom";

const useUserAuthForm = (type: "sign-in" | "sign-up") => {
  const isSignIn = type === "sign-in";
  const navigate = useNavigate();
  const form = useForm<SignUpType | SignInType>({
    resolver: zodResolver(isSignIn ? signInSchema : signUpSchema),
  });
  const { reset } = form;

  useEffect(() => {
    reset();
  }, [type, reset]);

  const onSubmit = async (data: FieldValues) => {
    try {
      if (isSignIn) {
        await signInUser(data as SignInType);
        navigate("/");
      } else {
        await signUpUser(data as SignUpType);
        navigate("/signin");
      }
      reset();
    } catch (error) {
      console.error("Auth error: ", error);
      alert((error as Error).message);
    }
  };
  return { form, onSubmit, isSignIn };
};

export default useUserAuthForm;
