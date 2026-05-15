import { useState } from "react";
import type { CurrentUser } from "../auth/auth";
import { logout } from "../auth/auth";

interface ProfileMenuProps {
  user: CurrentUser;
}

const ProfileMenu = ({ user }: ProfileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const initial = user.username.charAt(0).toUpperCase();

  return (
    <div className="fixed top-4 right-4 z-40">
      <button
        type="button"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-sm font-bold text-white shadow-lg transition hover:bg-gray-800"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open profile"
      >
        {initial}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 rounded-lg border border-gray-200 bg-white p-4 text-gray-900 shadow-xl">
          <p className="text-sm font-semibold text-gray-500">My Profile</p>

          <div className="mt-4 space-y-3">
            <div>
              <p className="text-xs font-medium text-gray-500">Username</p>
              <p className="mt-1 text-sm font-semibold">{user.username}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500">Student Number</p>
              <p className="mt-1 text-sm font-semibold">
                {user.studentNumber || "Not provided"}
              </p>
            </div>

            <button 
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
