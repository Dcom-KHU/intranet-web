import { useRef, useState, useEffect } from "react";
import type { AuthUser } from "../features/auth/types/auth-user.type";
import UserDisplayName from "./ui/UserDisplay";
import { logout } from "../features/auth/utils/auth.utils";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

interface ProfileMenuProps {
  user: AuthUser;
}

const ProfileMenu = ({ user }: ProfileMenuProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative flex items-center">
      {/* trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-md px-2 py-1 transition"
      >
        <UserDisplayName user={user} />

        <FaUserCircle
          size={26}
          className="text-slate-300"
        />
      </button>

      {/* dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full z-20 mt-3 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          
          {/* header */}
          <div className="px-4 py-5">
            <p className="text-xs text-gray-500">User ID</p>
            <p className="text-sm font-semibold text-gray-800">
              {user.userID}
            </p>
          </div>

          {/* body */}
          <div className="px-4 space-y-3 mb-4 text-sm">
            <div>
              <p className="text-xs text-gray-500">학번</p>
              <p className="font-medium text-gray-800">
                {user.studentNumber || "Not provided"}
              </p>
            </div>
          </div>

          {/* actions */}
          <div className="border-t p-2 flex flex-col gap-2">
            <button
              className="w-full rounded-md bg-gray-100 py-2 text-sm hover:bg-gray-200"
              onClick={() => {
                navigate("/my-page");
                setIsOpen(false);
              }}
            >
              My Profile
            </button>

            <button
              className="w-full rounded-md bg-blue-500 py-2 text-sm text-white hover:bg-blue-600"
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
