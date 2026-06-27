type SelectFieldProps = {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

export default function SelectField({
  label,
  name,
  options,
  value,
  onChange,
}: SelectFieldProps) {
  return (
    <label className="block border-b border-gray-200 pb-2">
      <span className="block text-xs font-medium text-gray-500">{label}</span>
      <select
        name={name}
        value={value}
        className="mt-2 w-full bg-transparent text-sm font-medium text-gray-900 outline-none"
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
