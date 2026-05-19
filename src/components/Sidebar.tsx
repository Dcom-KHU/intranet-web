import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import type { NavigateFunction } from "react-router-dom";
import { getCurrentUser } from "../features/auth";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menu = [
  { label: "Home", path: "/home" },
  { label: "족보", path: "/exam-archive" },
  { label: "정보 공유", path: "/info-sharing" },
  { label: "활동사진", path: "/gallery" },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = getCurrentUser();
  const isAdmin = currentUser?.isAdmin ?? false;

  return (
    <>
      {/* 데스크탑 사이드바 */}
      <div className="hidden md:block fixed top-0 left-0 h-full w-64 bg-black text-white p-5 flex-col">
        <SidebarContent
          navigate={navigate}
          isAdmin={isAdmin}
          currentPath={location.pathname}
        />
      </div>

      {/* 모바일 사이드바 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* dim */}
            <motion.div
              className="fixed inset-0 bg-black/50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            {/* sidebar */}
            <motion.div
              className="fixed top-0 left-0 h-full w-64 bg-black text-white shadow-lg p-5"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <SidebarContent
                navigate={navigate}
                isAdmin={isAdmin}
                currentPath={location.pathname}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;

interface SidebarContentProps {
  navigate: NavigateFunction;
  isAdmin: boolean;
  currentPath: string;
}

const SidebarContent = ({
  navigate,
  isAdmin,
  currentPath,
}: SidebarContentProps) => {
  const isActive = (path: string) => currentPath === path;

  return (
    <div className="flex flex-col gap-10 mt-5">
      <h2
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/home")}
      >
        Menu
      </h2>

      <ul className="flex flex-col gap-5">
        {menu.map((item) => (
          <li
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`cursor-pointer transition-colors hover:text-blue-400 ${
              isActive(item.path)
                ? "text-blue-500 font-bold"
                : "text-white"
            }`}
          >
            {item.label}
          </li>
        ))}

        {isAdmin && (
          <li
            onClick={() => navigate("/manage")}
            className={`cursor-pointer transition-colors hover:text-blue-400 ${
              isActive("/manage")
                ? "text-blue-500 font-bold"
                : "text-white"
            }`}
          >
            관리
          </li>
        )}
      </ul>
    </div>
  );
};