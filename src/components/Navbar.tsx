import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import type { NavigateFunction } from "react-router-dom";
import { getCurrentUser, type CurrentUser } from "../features/auth";
import ProfileMenu from "./ProfileMenu";
import dcomLogo from "../assets/dcom-logo.png";

interface NavbarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menu = [
  { label: "Home", path: "/home" },
  { label: "족보", path: "/exam-archive" },
  { label: "공지사항", path: "/notice" },
  { label: "정보 공유", path: "/info-sharing" },
  { label: "활동사진", path: "/gallery" },
];

const Navbar = ({ isOpen, onClose }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = getCurrentUser();
  const isAdmin = currentUser?.isAdmin ?? false;

  return (
    <>
      {/* 데스크탑 사이드바 */}
      <nav className="fixed top-0 left-0 right-0 h-20 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 shadow-sm">
        <NavbarContent
          navigate={navigate}
          isAdmin={isAdmin}
          currentPath={location.pathname}
          currentUser={currentUser}
          variant="desktop"
        />
      </nav>

      {/* 모바일 사이드바 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* dim */}
            <motion.div
              className="fixed inset-0 z-[70] bg-black/50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            {/* sidebar */}
            <motion.div
              className="fixed top-0 left-0 z-[80] h-full w-64 bg-black p-5 text-white shadow-lg md:hidden"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <NavbarContent
                navigate={navigate}
                isAdmin={isAdmin}
                currentPath={location.pathname}
                currentUser={currentUser}
                variant="mobile"
                onNavigate={onClose}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

interface NavbarContentProps {
  navigate: NavigateFunction;
  isAdmin: boolean;
  currentPath: string;
  currentUser: CurrentUser | null;
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
}

const NavbarContent = ({
  navigate,
  isAdmin,
  currentPath,
  currentUser,
  variant,
  onNavigate,
}: NavbarContentProps) => {
  const isActive = (path: string) => currentPath === path;
  const isMobile = variant === "mobile";
  const handleNavigate = (path: string) => {
    navigate(path);
    onNavigate?.();
  };

  return (
    <div
      className={
        isMobile
          ? "flex h-full flex-col items-start gap-8"
          : "flex h-full items-center justify-between px-4 md:px-10"
      }
    >      
      <h2
        className={isMobile ? "cursor-pointer" : "ml-16 cursor-pointer md:ml-0"}
        onClick={() => handleNavigate("/home")}
      >
        <img
          src={dcomLogo}
          alt="DCOM Logo"
          className="mr-2 inline-block w-20 flex-shrink-0"
        />
      </h2>

      <div className={isMobile ? "flex w-full flex-col gap-8" : "hidden items-center gap-20 md:flex"}>
        <ul className={isMobile ? "flex flex-col gap-5" : "flex flex-row gap-10"}>
          {menu.map((item) => (
            <li
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              className={`cursor-pointer transition-colors hover:text-blue-400 ${
                isActive(item.path)
                  ? isMobile
                    ? "text-white font-bold"
                    : "text-black font-bold"
                  : isMobile
                    ? "text-gray-300 font-bold"
                    : "text-blue-500 font-bold"
              }`}
            >
              {item.label}
            </li>
          ))}

          {isAdmin && (
            <li
              onClick={() => handleNavigate("/manage")}
              className={`cursor-pointer transition-colors hover:text-blue-400 ${
                isActive("/manage")
                  ? isMobile
                    ? "text-white font-bold"
                    : "text-black font-bold"
                  : isMobile
                    ? "text-gray-300 font-bold"
                    : "text-blue-500 font-bold"
              }`}
            >
              관리
            </li>
          )}
        </ul>

        {currentUser && <ProfileMenu user={currentUser} />}
      </div>
    </div>

  );
};
