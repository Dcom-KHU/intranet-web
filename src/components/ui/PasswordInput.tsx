import { useState, type ComponentProps } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import Input from "./Input";

type PasswordInputProps = Omit<ComponentProps<typeof Input>, "type">;

export default function PasswordInput(props: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  const hidePassword = () => setIsVisible(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={isVisible ? "text" : "password"}
        className={`pr-10 ${props.className ?? ""}`}
      />
      <button
        type="button"
        disabled={props.disabled}
        aria-label="누르는 동안 비밀번호 보기"
        className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-gray-400 transition-colors hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-40"
        onPointerDown={() => setIsVisible(true)}
        onPointerUp={hidePassword}
        onPointerLeave={hidePassword}
        onPointerCancel={hidePassword}
        onBlur={hidePassword}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setIsVisible(true);
          }
        }}
        onKeyUp={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            hidePassword();
          }
        }}
      >
        {isVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
      </button>
    </div>
  );
}
