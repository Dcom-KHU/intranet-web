// Navbar.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import ProfileMenu from "../ProfileMenu";
import useAuth from "../../features/auth/hooks/useAuth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const isAdmin =
    currentUser?.role === "ADMIN";

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <DesktopNavbar
        isAdmin={isAdmin}
        onNavigate={handleNavigate}
      />

      {currentUser && (
        <div className="fixed right-8 top-5 z-20 hidden md:block">
          <ProfileMenu user={currentUser} />
        </div>
      )}

      <MobileNavbar
        isOpen={isOpen}
        isAdmin={isAdmin}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        onNavigate={handleNavigate}
        profileMenu={
          currentUser ? <ProfileMenu user={currentUser} /> : undefined
        }
      />
    </>
  );
}
