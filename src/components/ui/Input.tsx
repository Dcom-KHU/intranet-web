type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      className={`w-full px-3 py-2 border border-gray-200 rounded-xl text-xs text-gray-500 placeholder:text-gray-200 ${className}`}
      {...props}
    />
  );
}