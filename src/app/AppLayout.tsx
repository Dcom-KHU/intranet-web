// AppLayout.tsx

import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../components/Sidebar";
import ProfileMenu from "../components/ProfileMenu";
import MobileSidebarButton from "../components/MobileSidebarButton";

import useAuth from "../features/useAuth";

export default function AppLayout() {
  const [isOpen, setIsOpen] = useState(false);

  const { currentUser, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Outlet />;
  }

  return (
    <div className="flex">
      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      {currentUser && (
        <ProfileMenu user={currentUser} />
      )}

      <div className="flex-1 md:ml-64">
        <MobileSidebarButton
          isOpen={isOpen}
          onClick={() =>
            setIsOpen((prev) => !prev)
          }
        />

        <Outlet />
      </div>
    </div>
  );
}