import { motion } from "framer-motion";

interface Props {
  isOpen: boolean;
  onClick: () => void;
}

export default function MobileSidebarButton({
  isOpen,
  onClick,
}: Props) {
  if (isOpen) return null;

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className="fixed left-4 top-4 z-[60] flex h-12 w-12 items-center justify-center rounded-md bg-white shadow-md md:hidden"
      onClick={onClick}
      aria-label="Open navigation menu"
    >
      <span className="flex flex-col gap-1.5">
        <span className="h-0.5 w-5 rounded bg-gray-800" />
        <span className="h-0.5 w-5 rounded bg-gray-800" />
        <span className="h-0.5 w-5 rounded bg-gray-800" />
      </span>
    </motion.button>
  );
}
