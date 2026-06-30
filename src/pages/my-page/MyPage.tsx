import { useSearchParams } from "react-router-dom";

import Loading from "../../components/Loading";
import MyCommentsPanel from "../../features/my-page/components/MyCommentsPanel";
import MyPageSidebar from "../../features/my-page/components/MyPageSidebar";
import MyPostsPanel from "../../features/my-page/components/MyPostsPanel";
import PasswordPanel from "../../features/my-page/components/PasswordPanel";
import ProfilePanel from "../../features/my-page/components/ProfilePanel";
import { useProfileEdit } from "../../features/my-page/hooks/useProfileEdit";
import type { ActiveMenu } from "../../features/my-page/types/types";


const isActiveMenu = (section: string | null): section is ActiveMenu =>
  section === "password" || section === "posts" || section === "comments";

const getActiveMenu = (section: string | null): ActiveMenu =>
  isActiveMenu(section) ? section : "profile";

export default function MyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedMenu = getActiveMenu(searchParams.get("section"));
  const { user, loading, saving, saveUser } = useProfileEdit();

  const handleMenuSelect = (menu: ActiveMenu) => {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (menu === "profile") nextSearchParams.delete("section");
    else nextSearchParams.set("section", menu);

    setSearchParams(nextSearchParams);
  };

  if (loading) return <Loading />;
  if (!user) return null;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
      <header className="mb-8">
        <h1 className="text-xl font-bold text-[#4988C4]">My Page</h1>
        <p className="mt-2 text-xs text-gray-500">내 정보와 활동 내역 관리</p>
      </header>

      <div className="grid gap-5 rounded-2xl bg-[#F7F9FC] p-10 sm:grid-cols-[220px_minmax(0,1fr)]">
        <MyPageSidebar
          selectedMenu={selectedMenu}
          onMenuSelect={handleMenuSelect}
        />

        <main className="min-h-[440px] rounded-2xl border border-[#B5D4F4] bg-white p-5 sm:p-7">
          {selectedMenu === "profile" && (
            <ProfilePanel user={user} saveUser={saveUser} saving={saving} />
          )}
          {selectedMenu === "password" && (
            <PasswordPanel user={user} saveUser={saveUser} saving={saving} />
          )}
          {selectedMenu === "posts" && (
            <MyPostsPanel
              studentNumber={user.studentNumber}
              isAdmin={user.role === "ADMIN"}
            />
          )}
          {selectedMenu === "comments" && (
            <MyCommentsPanel studentNumber={user.studentNumber} />
          )}
        </main>
      </div>
    </div>
  );
}
