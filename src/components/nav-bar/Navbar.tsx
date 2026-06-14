// Navbar.tsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import ProfileMenu from "../ProfileMenu";
import useAuth from "../../features/auth/hooks/useAuth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { currentUser } = useAuth();

  const isAdmin =
    currentUser?.role === "ADMIN";

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <>
      {currentUser && (
        <div className="fixed right-8 top-5 z-[60]">
          <ProfileMenu user={currentUser} />
        </div>
      )}

      <DesktopNavbar
        currentPath={location.pathname}
        isAdmin={isAdmin}
        onNavigate={handleNavigate}
      />

      <MobileNavbar
        isOpen={isOpen}
        currentPath={location.pathname}
        isAdmin={isAdmin}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        onNavigate={handleNavigate}
      />
    </>
  );
}
