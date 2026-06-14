// AppLayout.tsx

import { Outlet } from "react-router-dom";

import Navbar from "../components/nav-bar/Navbar";
import Footer from "../components/Footer";
import useAuth from "../features/auth/hooks/useAuth";

export default function AppLayout() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Outlet />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
