import { Key, Mail, User2Icon } from "lucide-react";
import InputBox from "../components/InputBox";
import Text from "../components/ui/text";
import GoogleIcon from "../assets/icons/google.png";
import { Link } from "react-router-dom";

interface UserAuthFormProps {
  type: string;
}
const UserAuthForm = ({ type }: UserAuthFormProps) => {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center">
      <form className="w-[80%] max-w-[400px]">
        <Text className="text-4xl text-center capitalize mb-8">
          {type === "sign-in" ? "Welcome back" : "Join us today"}
        </Text>
        {type !== "sign-in" ? (
          <InputBox
            name="fullname"
            type="text"
            placeholder="Fullname"
            icon={<User2Icon className="w-5 " />}
          />
        ) : (
          ""
        )}
        <InputBox
          name="email"
          type="email"
          placeholder="Email"
          icon={<Mail className="w-5" />}
        />
        <InputBox
          name="password"
          type="password"
          placeholder="Password"
          icon={<Key className="w-5" />}
        />
        <div className="flex justify-center mt-12">
          <button
            className={`rounded-full px-4 py-2 text-white center
                        ${type === "sign-up" ? "bg-pink-800" : "bg-blue-950"}`}
          >
            {type.replace("-", " ")}
          </button>
        </div>
        <div className="relative w-full flex items-center gap-2 my-8 opacity-18 uppercase text-black font-bold">
          <hr className="w-1/2 border-black" />
          <p>or</p>
          <hr className="w-1/2 border-black" />
        </div>
        <button className="bg-gray-100 rounded-full px-4 py-2 flex gap-2 items-center justify-center w-[70%] mx-15 cursor-pointer hover:underline">
          <img src={GoogleIcon} className="w-6" />
          continue wit google
        </button>
        {type === "sign-in" ? (
          <Text variant="muted" className="text-center my-6">
            Don't have an account ? .
            <Link to="/signup" className="text-black underline">
              Sign Up
            </Link>
          </Text>
        ) : (
          <Text variant="muted" className="text-center my-6">
            Already a user ? .
            <Link to="/signin" className="text-black underline">
              Sign In
            </Link>
          </Text>
        )}
      </form>
    </section>
  );
};

export default UserAuthForm;
