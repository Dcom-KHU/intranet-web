import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import { motion } from "framer-motion";

function AppLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // 라우트 변경될 때마다 sidebar 닫기
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block  w-64">
        <Sidebar isOpen={true} onClose={() => {}} />
      </div>

      {/* Mobile Sidebar */}
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Main Content */}
      <div className="flex-1">
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="px-4 py-2 fixed top-4 left-4 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <img src="src\assets\sidebar_icon.png" alt="sidebar" style={{width: '20px'}}/>
        </motion.button>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
        </Routes>
      </div>

    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}