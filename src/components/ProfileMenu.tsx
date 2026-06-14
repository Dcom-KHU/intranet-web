import { useRef, useState, useEffect } from "react";
import type { AuthUser } from "../features/auth/types/authuser.type";
import UserDisplayName from "./ui/UserDisplay";
import { logout } from "../features/auth/utils/auth.utils";
import { useNavigate } from "react-router-dom";

interface ProfileMenuProps {
  user: AuthUser;
}

const ProfileMenu = ({ user }: ProfileMenuProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const initial = user.userID.charAt(0).toUpperCase();

  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 메뉴 외부 클릭 시 닫기
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <div className="flex flex-row items-center gap-5">
        <UserDisplayName user={user} />
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-bold text-white shadow-lg transition hover:bg-gray-800"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open profile"
      >
        {initial}
      </button>
    </div>


      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 rounded-lg border border-gray-200 bg-white p-4 text-gray-900 shadow-xl z-60">
          <p className="text-sm font-semibold text-gray-500">My Profile</p>

          <div className="mt-4 space-y-3">
            <div>
              <p className="text-xs font-medium text-gray-500">User ID</p>
              <p className="mt-1 text-sm font-semibold">{user.userID}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500">Student Number</p>
              <p className="mt-1 text-sm font-semibold">
                {user.studentNumber || "Not provided"}
              </p>
            </div>

            <button
              className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
              onClick={() => {
                navigate("/profile");
                setIsOpen(false);
              }}
            >
              My Profile
            </button>

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
