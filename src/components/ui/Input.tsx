type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  className = "w-full px-5 py-2 border rounded-xl",
  ...props
}: InputProps) {
  return (
    <input
      className={`w-full px-5 py-2 border rounded-xl ${className}`}
      {...props}
    />
  );
}