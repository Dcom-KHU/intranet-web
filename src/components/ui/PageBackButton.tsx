import { FiChevronLeft } from "react-icons/fi";
import { useNavigate, type To } from "react-router-dom";

type PageBackButtonProps = {
  label?: string;
  fallbackPath?: To;
  onClick?: () => void;
};

export default function PageBackButton({
  label = "이전 페이지로 돌아가기",
  fallbackPath = "/",
  onClick,
}: PageBackButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    const historyIndex = window.history.state?.idx;

    if (typeof historyIndex === "number" && historyIndex > 0) {
      navigate(-1);
      return;
    }

    navigate(fallbackPath, { replace: true });
  };

  return (
    <button
      type="button"
      className="mb-4 flex items-center gap-1 text-xs text-gray-400 transition-colors hover:text-[#4988C4]"
      onClick={handleClick}
    >
      <FiChevronLeft />
      {label}
    </button>
  );
}
