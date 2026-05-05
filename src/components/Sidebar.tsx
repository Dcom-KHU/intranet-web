import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({isOpen, onClose}: SidebarProps) => {
    const navigate = useNavigate();

    return(
      <>
        {/* 데스크탑 사이드바 (화면 크기 md 이상에서만 보임) */}
        <div className="hidden md:block fixed top-0 left-0 h-full w-64 bg-black text-white p-5 flex-col">        
          <SidebarContent navigate={navigate} />
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
              <SidebarContent navigate={navigate} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
    )
}

export default Sidebar

const SidebarContent = ({ navigate }: { navigate: any }) => (
  <div className="flex flex-col gap-4">
    <h2 className="text-xl font-bold">Menu</h2>

    <ul className="flex flex-col gap-3">
      <li onClick={() => navigate('/')} className="hover:text-blue-500 cursor-pointer">
        Home
      </li>
      <li onClick={() => navigate('/page1')} className="hover:text-blue-500 cursor-pointer">
        게시판
      </li>
      <li onClick={() => navigate('/page2')} className="hover:text-blue-500 cursor-pointer">
        Page 2
      </li>
    </ul>
  </div>
);