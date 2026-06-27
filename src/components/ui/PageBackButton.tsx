import { FiChevronLeft } from "react-icons/fi";

type PageBackButtonProps = {
  label?: string;
  onClick: () => void;
};

export default function PageBackButton({
  label = "이전 페이지로 돌아가기",
  onClick,
}: PageBackButtonProps) {
  return (
    <button
      type="button"
      className="mb-4 flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-[#4988C4]"
      onClick={onClick}
    >
      <FiChevronLeft />
      {label}
    </button>
  );
}