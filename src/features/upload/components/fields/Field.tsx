type FieldProps = {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  type?: string;
  onChange: (value: string) => void;
};

export default function Field({
  label,
  name,
  placeholder,
  value,
  type = "text",
  onChange,
}: FieldProps) {
  return (
    <label className="block border-b border-gray-200 pb-2">
      <span className="block text-xs font-medium text-gray-500">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        className="mt-2 w-full text-sm font-medium text-gray-900 outline-none placeholder:text-gray-300"
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
