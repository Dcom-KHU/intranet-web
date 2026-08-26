import { useRef, useState, useEffect } from "react";
import { type AuthUser } from "../features/auth/types/auth-user.type";
import UserDisplayName from "./ui/UserDisplay";
import useLogout from "../features/auth/hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { clearAuthSession, getRefreshToken } from "@/features/auth/utils/auth-storage";
import Modal from "./ui/Modal";
import useUnsavedChanges from "../features/upload/context/useUnsavedChanges";

interface ProfileMenuProps {
  user: AuthUser;
}

const ProfileMenu = ({ user }: ProfileMenuProps) => {
  const navigate = useNavigate();
  const logout = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { hasUnsavedChanges } = useUnsavedChanges();

  const handleLogout = () => {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      clearAuthSession();
      navigate("/", { replace: true });
      return;
    }

    logout.mutate(refreshToken, {
      onSettled: () => {
        navigate("/", { replace: true });
      },
    });
  };

  const requestLogout = () => {
    if (hasUnsavedChanges) {
      setIsLogoutModalOpen(true);
      return;
    }

    handleLogout();
  };

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
        className="flex items-center gap-2 rounded-md py-1 transition md:px-2"
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
            <p className="text-xs text-gray-500">아이디</p>
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
              className="w-full rounded-md bg-gray-100 py-2 text-sm transition-all gray-200"
              onClick={() => {
                navigate("/my-page");
                setIsOpen(false);
              }}
            >
              마이페이지
            </button>

            <button
              className="w-full rounded-md bg-[#0F2854] py-2 text-sm text-white transition-all [#1B3F7F]"
              disabled={logout.isPending}
              onClick={requestLogout}
            >
              로그아웃
            </button>
          </div>
        </div>
      )}

      <Modal
        isOpen={isLogoutModalOpen}
        title="작성 중인 내용이 저장되지 않습니다."
        description="로그아웃하시겠습니까?"
        actionLabel="로그아웃"
        onAction={() => {
          setIsLogoutModalOpen(false);
          handleLogout();
        }}
        secondaryActionLabel="취소"
        onSecondaryAction={() => setIsLogoutModalOpen(false)}
        labelledById="unsaved-logout-modal-title"
      />
    </div>
  );
};

export default ProfileMenu;
