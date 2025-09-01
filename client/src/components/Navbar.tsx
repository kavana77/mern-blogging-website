import { useState } from "react";
import { Input } from "./ui/input";
import { IoIosSearch } from "react-icons/io";
import { RiFileEditLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { logout } from "../utils/http";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const navigate = useNavigate();
  const { isSignIn, signOut } = useAuth();

  console.log("isSignIn", isSignIn);
  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const query = e.currentTarget.value.trim();
    if (e.key === "Enter" && query) {
      navigate(`/searching?q=${query}`);
    }
  };
  const handleLogout = async () => {
    try {
      await logout();
      signOut();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className=" z-10 sticky top-0 flex md:gap-6 items-center w-full px-12 py-5 h-[80px] border-b border-grey bg-white">
      <img src="/public/blog-logo.png" className="object-cover w-28 md:w-34" />
      <div
        className={`absolute bg-white left-0 top-full w-full mt-0.5 border-b border-grey
        py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto lg:ml-80
        ${searchBoxVisibility ? "block" : "hidden"} md:block`}
      >
        <Input
          type="text"
          placeholder="Search.."
          className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full md:pl-12"
          onKeyDown={handleSearch}
        />

        <IoIosSearch className="absolute right-[10%] top-1/2 -translate-y-1/2 md:pointer-events-none md:left-5" />
      </div>
      <div className="flex items-center gap-3 md:gap-6 ml-auto">
        <button
          className="md:hidden bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center"
          onClick={() => setSearchBoxVisibility((currentVal) => !currentVal)}
        >
          <IoIosSearch />
        </button>
      </div>
      <Link
        to="editor"
        className="hidden md:flex gap-2 items-center hover:bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full p-2"
      >
        <RiFileEditLine />
        <p>Write</p>
      </Link>
      {!isSignIn ? (
        <>
          <Link
            to="signin"
            className="whitespace-nowrap bg-blue-950 text-white rounded-full py-1 px-2 capitalize hover:bg-opacity-80 ml-2 lg:ml-9"
          >
            <p>Sign In</p>
          </Link>
          <Link
            to="signup"
            className="whitespace-nowrap bg-pink-700 text-white rounded-full py-1 px-2 capitalize hover:bg-opacity-80  lg:ml-9 hidden md:block"
          >
            Sign Up
          </Link>
        </>
      ) : (
        <Button onClick={handleLogout} className="cursor-pointer">
          Logout
        </Button>
      )}
    </nav>
  );
};
export default Navbar;
