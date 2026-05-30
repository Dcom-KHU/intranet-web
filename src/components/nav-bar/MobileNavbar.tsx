import { AnimatePresence, motion } from "framer-motion";
import dcomLogo from "../../assets/dcom-logo-white.png";
import sidebar from "../../assets/icon/sidebar.png"
import { navMenu } from "./navMenu";

interface MobileNavbarProps {
  isOpen: boolean;
  currentPath: string;
  isAdmin: boolean;
  onOpen: () => void;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export default function MobileNavbar({
  isOpen,
  currentPath,
  isAdmin,
  onOpen,
  onClose,
  onNavigate,
}: MobileNavbarProps) {
  const isActive = (path: string) => currentPath === path;
  const handleNavigate = (path: string) => {
    onNavigate(path);
    onClose();
  };

  return (
    <>

      
        <nav className="fixed left-0 top-0 z-[50] w-full h-[80px] bg-white/95">
          {!isOpen && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="ml-8 mt-6 md:hidden"
            onClick={onOpen}
            aria-label="Open navigation menu"
          >
            <img src={sidebar} alt="sidbar-icon" className="w-8 "/>
          </motion.button>
          )}
        </nav>
      

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[90] bg-black/50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            <motion.nav
              className="fixed left-0 top-0 z-[100] h-full w-64 bg-black p-5 text-white shadow-lg md:hidden"
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
