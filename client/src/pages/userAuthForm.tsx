import { Key, Mail, User2Icon } from "lucide-react";
import InputBox from "../components/InputBox";
import Text from "../components/ui/text";
import GoogleIcon from "../assets/icons/google.png";
import { Link } from "react-router-dom";
import type { UserAuthFormProps } from "../types/data";
import useUserAuthForm from "../hooks/useUserAuthForm";

const UserAuthForm = ({ type }: UserAuthFormProps) => {
  const { form, onSubmit, isSignIn } = useUserAuthForm(
    type as "sign-in" | "sign-up"
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center">
      <form className="w-[80%] max-w-[400px]" onSubmit={handleSubmit(onSubmit)}>
        <Text className="text-4xl text-center capitalize mb-8">
          {isSignIn ? "Welcome back" : "Join us today"}
        </Text>
        {!isSignIn && (
          <>
            <InputBox
              {...register("fullname")}
              type="text"
              placeholder="Fullname"
              icon={<User2Icon className="w-5" />}
            />
            {"fullname" in errors && (
              <p className="text-red-500">{errors.fullname?.message}</p>
            )}
          </>
        )}
        <InputBox
          {...register("email")}
          type="email"
          placeholder="Email"
          icon={<Mail className="w-5" />}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <InputBox
          {...register("password")}
          type="password"
          placeholder="Password"
          icon={<Key className="w-5" />}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <div className="flex justify-center mt-12">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`rounded-full px-4 py-2 text-white center
              ${isSignIn ? "bg-blue-950" : "bg-pink-800"}`}
          >
            {type.replace("-", " ")}
          </button>
        </div>

        <div className="relative w-full flex items-center gap-2 my-8 opacity-18 uppercase text-black font-bold">
          <hr className="w-1/2 border-black" />
          <p>or</p>
          <hr className="w-1/2 border-black" />
        </div>

        <button className="bg-gray-100 rounded-full px-4 py-2 flex gap-2 items-center justify-center w-[70%] mx-auto cursor-pointer hover:underline">
          <img src={GoogleIcon} className="w-6" />
          Continue with Google
        </button>

        {isSignIn ? (
          <Text variant="muted" className="text-center my-6">
            Don't have an account?
            <Link to="/signup" className="text-black underline ml-1">
              Sign Up
            </Link>
          </Text>
        ) : (
          <Text variant="muted" className="text-center my-6">
            Already a user?
            <Link to="/signin" className="text-black underline ml-1">
              Sign In
            </Link>
          </Text>
        )}
      </form>
    </section>
  );
};

export default UserAuthForm;
