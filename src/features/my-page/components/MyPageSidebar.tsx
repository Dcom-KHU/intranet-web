import type { ReactNode } from "react";
import { FiUser } from "react-icons/fi";
import { HiOutlineLockClosed } from "react-icons/hi";
import {
  LuChevronRight,
  LuFileText,
  LuLogOut,
  LuMessageCircle,
} from "react-icons/lu";

import type { ActiveMenu } from "../types/types";

type MenuItem = {
  id: ActiveMenu | "posts" | "comments";
  label: string;
  icon: ReactNode;
  enabled: boolean;
};

const menuItems: MenuItem[] = [
  { id: "profile", label: "개인 정보", icon: <FiUser />, enabled: true },
  {
    id: "password",
    label: "비밀번호 변경",
    icon: <HiOutlineLockClosed />,
    enabled: true,
  },
  { id: "posts", label: "내가 쓴 글", icon: <LuFileText />, enabled: false },
  {
    id: "comments",
    label: "댓글 단 글",
    icon: <LuMessageCircle />,
    enabled: false,
  },
];

interface MyPageSidebarProps {
  selectedMenu: ActiveMenu;
  onMenuSelect: (menu: ActiveMenu) => void;
}

export default function MyPageSidebar({
  selectedMenu,
  onMenuSelect,
}: MyPageSidebarProps) {
  return (
    <aside className="flex min-h-0 flex-col rounded-2xl border border-[#B5D4F4] bg-white p-4">
      <nav className="space-y-1" aria-label="마이페이지 메뉴">
        {menuItems.map((item) => {
          const selected = item.enabled && selectedMenu === item.id;

          return (
            <button
              key={item.id}
              type="button"
              disabled={!item.enabled}
              onClick={() => {
                if (item.enabled) onMenuSelect(item.id as ActiveMenu);
              }}
              className={`flex h-11 w-full items-center justify-between rounded-lg px-3 text-sm transition-colors ${
                selected
                  ? "border border-[#9DC8FF] bg-[#EAF3FF] text-[#438DE3]"
                  : "text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-55"
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="text-base">{item.icon}</span>
                {item.label}
              </span>
              <LuChevronRight className="text-gray-400" />
            </button>
          );
        })}
      </nav>

      <div className="mt-3 border-t border-gray-100 pt-3">
        <button
          type="button"
          disabled
          className="flex h-11 w-full cursor-not-allowed items-center gap-3 rounded-lg px-3 text-sm text-red-400 opacity-60"
          title="회원 탈퇴 기능은 준비 중입니다."
        >
          <LuLogOut />
          회원 탈퇴
        </button>
      </div>
    </aside>
  );
}
