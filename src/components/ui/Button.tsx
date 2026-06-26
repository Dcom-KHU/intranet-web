import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "third" | "refusal";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  fullWidth?: boolean;
};

const baseStyle =
  "py-2 rounded-xl transition-colors font-medium";

const variants: Record<Variant, string> = {
  // 남색 배경에 흰색 텍스트, 호버 시 밝은 파란색 배경
  primary: "bg-[#0F2854] text-white hover:bg-[#1B3F7F]",
  // 흰색 배경에 남색 텍스트 + 테두리, 호버 시 연한 회색 배경
  secondary: "bg-white text-sm text-[#0F2854] border border-[#0F2854] hover:bg-[#F3F6FB]",
  // 흰색 배경에 하늘색 텍스트 + 테두리, 호버 시 연한 하늘색 배경
  third: "bg-white text-sm text-blue-500 border border-blue-500 hover:bg-[#f0f8ff] hover:shadow-md",
  // 흰색 배경에 회색 텍스트 + 테두리, 호버 시 더 연한 회색 배경
  refusal: "bg-white text-sm text-gray-400 border border-gray-400 hover:bg-gray-200 hover:shadow-md",
};

export function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`
        ${baseStyle}
        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    />
  );
}