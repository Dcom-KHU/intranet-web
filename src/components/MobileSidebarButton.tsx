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
      className="fixed top-4 left-4 px-4 py-2 md:hidden"
      onClick={onClick}
    >
      <img
        src="/src/assets/sidebar_icon.png"
        alt="sidebar"
        className="w-5"
      />
    </motion.button>
  );
}