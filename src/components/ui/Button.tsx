import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "third" | "refusal";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingLabel?: string;
};

const baseStyle =
  "relative py-2 rounded-xl transition-all font-medium";

const variants: Record<Variant, string> = {
  // 남색 배경에 흰색 텍스트, 호버 시 밝은 파란색 배경
  primary: "bg-[#0F2854] text-white transition-all hover:bg-[#1B3F7F]",
  // 흰색 배경에 남색 텍스트 + 테두리, 호버 시 연한 회색 배경
  secondary: "bg-white text-sm text-[#0F2854] border border-[#0F2854] transition-all hover:bg-[#F3F6FB]",
  // 흰색 배경에 하늘색 텍스트 + 테두리, 호버 시 연한 하늘색 배경
  third: "bg-white text-sm text-blue-500 border border-blue-500 transition-all hover:bg-[#f0f8ff] hover:shadow-md",
  // 흰색 배경에 회색 텍스트 + 테두리, 호버 시 더 연한 회색 배경
  refusal: "bg-white text-sm text-gray-400 border border-gray-400 transition-all hover:bg-gray-200 hover:shadow-md",
};

export function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  isLoading = false,
  loadingLabel = "처리 중",
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={`
        ${baseStyle}
        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {isLoading ? (
        <>
          <span className="invisible">{children}</span>
          <span
            className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-2 border-current/30 border-t-current"
            role="status"
            aria-label={loadingLabel}
          />
        </>
      ) : (
        children
      )}
    </button>
  );
}
