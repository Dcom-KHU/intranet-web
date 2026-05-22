import type { LabelHTMLAttributes } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: React.ReactNode;
};

const InputLabel = ({ children, className = "", ...props }: LabelProps) => {
  return (
    <label
      className={`mb-2 block text-gray-700 text-xs ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};

export default InputLabel;