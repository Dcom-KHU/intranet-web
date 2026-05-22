import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../features/auth";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import ProfileMenu from "../ProfileMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = getCurrentUser();
  const isAdmin = currentUser?.isAdmin ?? false;

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <DesktopNavbar
        currentPath={location.pathname}
        isAdmin={isAdmin}
        onNavigate={handleNavigate}
      />

      {currentUser && (
        <div className="fixed right-8 top-4 z-[90]">
          <ProfileMenu user={currentUser} />
        </div>
      )}

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
