import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  fullWidth?: boolean;
};

const baseStyle =
  "py-2 rounded-xl transition-colors font-medium";

const variants: Record<Variant, string> = {
  primary: "bg-[#0F2854] text-white hover:bg-[#a1c4ff]",
  secondary: "bg-white text-[#0F2854] border border-[#0F2854] hover:bg-gray-300",
  danger: "bg-red-500 text-white hover:bg-red-600",
};

export function Button({
  variant = "primary",
  fullWidth = true,
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