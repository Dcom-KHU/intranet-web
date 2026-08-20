import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { IoCheckmark, IoChevronDown } from "react-icons/io5";

type SelectFieldProps = {
  label: string;
  name: string;
  options: string[];
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
};

export default function SelectField({
  label,
  name,
  options,
  value,
  required = false,
  onChange,
}: SelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const labelId = useId();
  const listboxId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [isOpen]);

  const selectOption = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const currentIndex = Math.max(0, options.indexOf(value));

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex =
        (currentIndex + direction + options.length) % options.length;
      onChange(options[nextIndex]);
      setIsOpen(true);
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen((current) => !current);
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <span
        id={labelId}
        className="mb-2 px-2 block text-xs font-medium text-gray-500"
      >
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </span>

      <input type="hidden" name={name} value={value} required={required} />
      <button
        type="button"
        aria-labelledby={labelId}
        aria-controls={listboxId}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`flex w-full items-center justify-between rounded-xl border bg-[#F8F9FC] px-4 py-2 text-left text-sm font-medium text-[#0F2854] outline-none transition-all hover:bg-white focus:ring-2 focus:ring-[#4988C4]/10 ${
          isOpen ? "border-[#4988C4] bg-white" : "border-gray-200"
        }`}
        onClick={() => setIsOpen((current) => !current)}
        onKeyDown={handleKeyDown}
      >
        <span>{value}</span>
        <IoChevronDown
          aria-hidden="true"
          className={`shrink-0 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#4988C4]" : ""
          }`}
          size={16}
        />
      </button>

      {isOpen && (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={labelId}
          className="absolute left-0 right-0 top-full z-30 mt-2 max-h-64 overflow-y-auto rounded-xl border border-[#B5D4F4] bg-white p-1.5 shadow-lg"
        >
          {options.map((option) => {
            const isSelected = option === value;

            return (
              <li
                key={option}
                role="option"
                aria-selected={isSelected}
              >
                <button
                  type="button"
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    isSelected
                      ? "bg-[#4988C4]/10 font-semibold text-[#4988C4]"
                      : "text-gray-600 hover:bg-[#F4F7FB] hover:text-[#0F2854]"
                  }`}
                  onClick={() => selectOption(option)}
                >
                  <span>{option}</span>
                  {isSelected && <IoCheckmark aria-hidden="true" size={16} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
