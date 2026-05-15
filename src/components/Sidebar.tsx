import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { NavigateFunction } from "react-router-dom";
import { getCurrentUser } from "../auth/auth";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({isOpen, onClose}: SidebarProps) => {

    const navigate = useNavigate();
    const currentUser = getCurrentUser();
    const isAdmin = currentUser?.isAdmin ?? false;

    return(
      <>
        {/* 데스크탑 사이드바 (화면 크기 md 이상에서만 보임) */}
        <div className="hidden md:block fixed top-0 left-0 h-full w-64 bg-black text-white p-5 flex-col">        
          <SidebarContent navigate={navigate} isAdmin={isAdmin} />
        </div>

        {/* 모바일 사이드바 (토글) */}
        <AnimatePresence>
        {isOpen && (
          <>
            {/* 배경 dim */}
            <motion.div
            // 흐려보이게 함
              className="fixed inset-0 bg-black/50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            {/* 사이드바 */}
            <motion.div
              className="fixed top-0 left-0 h-full w-64 bg-black text-white shadow-lg p-5"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <SidebarContent navigate={navigate} isAdmin={isAdmin} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
    )
}

export default Sidebar

interface SidebarContentProps {
  navigate: NavigateFunction;
  isAdmin: boolean;
}

const SidebarContent = ({ navigate, isAdmin }: SidebarContentProps) => (
  <div className="flex flex-col gap-10 mt-5">
    <h2 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/home')}>
      Menu
    </h2>

    <ul className="flex flex-col gap-5">
      <li onClick={() => navigate('/home')} className="hover:text-blue-800 cursor-pointer">
        Home
      </li>
      <li onClick={() => navigate('/page1')} className="hover:text-blue-800 cursor-pointer">
        게시판
      </li>
      <li onClick={() => navigate('/page2')} className="hover:text-blue-800 cursor-pointer">
        Page 2
      </li>
      {isAdmin && (
        <li onClick={() => navigate('/setting')} className="hover:text-blue-800 cursor-pointer">
          관리
        </li>
      )}
    </ul>
  </div>
);
