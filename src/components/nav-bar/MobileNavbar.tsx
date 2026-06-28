import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { MdMenu } from "react-icons/md";

import { navMenu } from "./navMenu";
import dcomLogo from "../../assets/dcom-logo-white.png";


interface MobileNavbarProps {
  isOpen: boolean;
  isAdmin: boolean;
  onOpen: () => void;
  onClose: () => void;
  onNavigate: (path: string) => void;
  profileMenu?: ReactNode;
}

export default function MobileNavbar({
  isOpen,
  isAdmin,
  onOpen,
  onClose,
  onNavigate,
  profileMenu,
}: MobileNavbarProps) {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ||
    location.pathname.startsWith(path + "/");  
    
  const handleNavigate = (path: string) => {
    onNavigate(path);
    onClose();
  };

  return (
    <>
        <nav className="fixed left-0 top-0 z-20 h-[80px] w-full bg-white/95 md:hidden">
          {!isOpen && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="ml-8 mt-6 md:hidden"
            onClick={onOpen}
            aria-label="Open navigation menu"
          >
            <MdMenu size={8} />
          </motion.button>
          )}
          {profileMenu && (
            <div className="absolute right-8 top-5">{profileMenu}</div>
          )}
        </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-20 bg-black/50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            <motion.nav
              className="fixed left-0 top-0 z-20 h-full w-64 bg-black p-5 text-white shadow-lg md:hidden"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex h-full flex-col items-start gap-8">
                <h2
                  className="cursor-pointer"
                  onClick={() => handleNavigate("/home")}
                >
                  <img
                    src={dcomLogo}
                    alt="DCOM Logo"
                    className="mr-2 inline-block w-28 flex-shrink-0"
                  />
                </h2>

                <div className="flex w-full flex-col gap-8">
                  <ul className="flex flex-col gap-7">
                    {navMenu.map((item) => (
                      <li
                        key={item.path}
                        onClick={() => handleNavigate(item.path)}
                        className={`cursor-pointer font-bold transition-colors hover:text-blue-400 ${
                          isActive(item.path) ? "text-white" : "text-gray-300"
                        }`}
                      >
                        {item.label}
                      </li>
                    ))}

                    {isAdmin && (
                      <li
                        onClick={() => handleNavigate("/manage")}
                        className={`cursor-pointer font-bold transition-colors hover:text-blue-400 ${
                          isActive("/manage") ? "text-white" : "text-gray-300"
                        }`}
                      >
                        관리
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
