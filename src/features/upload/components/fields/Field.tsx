type FieldProps = {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  type?: string;
  required?: boolean;
  onChange: (value: string) => void;
};

export default function Field({
  label,
  name,
  placeholder,
  value,
  type = "text",
  required = false,
  onChange,
}: FieldProps) {
  return (
    <label className="block border-b border-gray-200 pb-2">
      <span className="block px-2 text-xs font-medium text-gray-500">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </span>
      <input
        name={name}
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full px-2 text-sm font-medium text-gray-900 outline-none placeholder:text-gray-300"
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
