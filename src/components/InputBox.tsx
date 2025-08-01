import { Eye, EyeClosed } from "lucide-react";
import { useState, type ReactNode } from "react";

interface InputBoxProps {
  name: string;
  type: string;
  id?: string;
  value?: string;
  placeholder: string;
  icon?: ReactNode;
}
const InputBox = ({
  name,
  type,
  id,
  value,
  placeholder,
  icon,
}: InputBoxProps) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  return (
    <div className="relative w-full mb-4">
      <input
        name={name}
        type={
          type === "password"
            ? passwordVisibility
              ? "text"
              : "password"
            : type
        }
        id={id}
        defaultValue={value}
        placeholder={placeholder}
        className="w-full rounded-md p-2 bg-gray-100 pl-14 border border-gray-300 focus:bg-transparent placeholder:text-gray-500"
      />
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
        {icon}
      </div>
      {type === "password" && (
        <button
          type="button"
          onClick={() => setPasswordVisibility((currentVal) => !currentVal)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {passwordVisibility ? (
            <Eye className="w-5 h-5" />
          ) : (
            <EyeClosed className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
  );
};

export default InputBox;
