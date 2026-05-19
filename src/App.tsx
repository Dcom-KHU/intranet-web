import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileMenu from "./components/ProfileMenu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ExamArchive from "./pages/Exam-Archive";
import ExamArchiveDetail from "./pages/Exam-Archive-Detail";
import Page2 from "./pages/Page2";
import Manage from "./pages/Manage";
import Profile from "./pages/Profile";
import { motion } from "framer-motion";
import { getCurrentUser, isLoggedIn as checkIsLoggedIn } from "./features/auth";

function AppLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => checkIsLoggedIn());
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  const location = useLocation();

  // 라우트 변경될 때마다 sidebar 닫기
  useEffect(() => {
    setIsOpen(false);
    setIsLoggedIn(checkIsLoggedIn());
    setCurrentUser(getCurrentUser());
  }, [location.pathname]);

  return (
    <div className="flex font-sans">

      {isLoggedIn && (
        <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}

      {isLoggedIn && currentUser && <ProfileMenu user={currentUser} />}

      {/* Main Content */}
      <div className={`flex-1 ${isLoggedIn ? "md:ml-64" : ""}`}>
        {isLoggedIn && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="px-4 py-2 fixed top-4 left-4 md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {
              !isOpen &&
                <img src="src\assets\sidebar_icon.png" alt="sidebar" style={{width: '20px'}}/>

            }
          </motion.button>
        )}

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam-archive"
            element={
              <ProtectedRoute>
                <ExamArchive />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam-archive/:id"
            element={
              <ProtectedRoute>
                <ExamArchiveDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/page2"
            element={
              <ProtectedRoute>
                <Page2 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage"
            element={
              <ProtectedRoute requireAdmin>
                <Manage />
              </ProtectedRoute>
            }
          />

          <Route path="/profile" element={<Profile />} />

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
