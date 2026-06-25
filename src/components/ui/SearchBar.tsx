import { IoSearchOutline } from "react-icons/io5";

import Input from "./Input";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
};

const SearchBar = ({
  value,
  onChange,
  onSearch,
  placeholder = "\uAC80\uC0C9\uC5B4\uB97C \uC785\uB825\uD558\uC138\uC694",
  ariaLabel = "\uAC80\uC0C9",
  className = "",
}: SearchBarProps) => {
  return (
    <form
      className={`relative w-full max-w-[450px] ${className}`}
      onSubmit={(event) => {
        event.preventDefault();
        onSearch();
      }}
    >
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="pr-10 text-xs"
      />

      <button
        type="submit"
        aria-label={ariaLabel}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#4988C4]"
      >
        <IoSearchOutline size={18} />
      </button>
    </form>
  );
};

export default SearchBar;
