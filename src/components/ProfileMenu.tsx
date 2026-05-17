import { useRef, useState, useEffect } from "react";
import type { CurrentUser } from "../features/auth";
import { logout } from "../features/auth";

interface ProfileMenuProps {
  user: CurrentUser;
}

const ProfileMenu = ({ user }: ProfileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const initial = user.username.charAt(0).toUpperCase();

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
    <div ref={menuRef} className="fixed top-4 right-4 z-40">
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
