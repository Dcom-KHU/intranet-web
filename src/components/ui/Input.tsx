type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  className = "w-full px-3 py-2 border rounded",
  ...props
}: InputProps) {
  return (
    <input
      className={`w-full px-3 py-2 border rounded ${className}`}
      {...props}
    />
  );
}