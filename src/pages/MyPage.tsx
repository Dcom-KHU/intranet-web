import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useBlocker, useSearchParams } from "react-router-dom";

import Loading from "../components/Loading";
import Modal from "../components/ui/Modal";
import MyCommentsPanel from "../features/my-page/components/MyCommentsPanel";
import MyPageSidebar from "../features/my-page/components/MyPageSidebar";
import MyPostsPanel from "../features/my-page/components/MyPostsPanel";
import PasswordPanel from "../features/my-page/components/PasswordPanel";
import ProfilePanel from "../features/my-page/components/ProfilePanel";
import { useProfileEdit } from "../features/my-page/hooks/useProfileEdit";
import type { ActiveMenu } from "../features/my-page/types/my.types";


const isActiveMenu = (section: string | null): section is ActiveMenu =>
  section === "password" || section === "posts" || section === "comments";

const getActiveMenu = (section: string | null): ActiveMenu =>
  isActiveMenu(section) ? section : "profile";

export default function MyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedMenu = getActiveMenu(searchParams.get("section"));
  const { user, loading, saving, saveUser } = useProfileEdit();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const blocker = useBlocker(hasUnsavedChanges);
  const shouldReduceMotion = useReducedMotion();

  const handleDirtyChange = useCallback((isDirty: boolean) => {
    setHasUnsavedChanges(isDirty);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!hasUnsavedChanges) return;

      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleMenuSelect = (menu: ActiveMenu) => {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (menu === "profile") nextSearchParams.delete("section");
    else nextSearchParams.set("section", menu);

    setSearchParams(nextSearchParams);
  };

  if (loading) return <Loading />;
  if (!user) return null;

  const selectedPanel = {
    profile: (
      <ProfilePanel
        user={user}
        saveUser={saveUser}
        saving={saving}
        onDirtyChange={handleDirtyChange}
      />
    ),
    password: (
      <PasswordPanel
        user={user}
        onDirtyChange={handleDirtyChange}
      />
    ),
    posts: (
      <MyPostsPanel
        studentNumber={user.studentNumber}
        isAdmin={user.role === "ADMIN"}
      />
    ),
    comments: <MyCommentsPanel studentNumber={user.studentNumber} />,
  } satisfies Record<ActiveMenu, React.ReactNode>;

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-20">
      <section className="mb-10">
        <h1 className="text-xl font-bold text-[#4988C4]">
          마이페이지
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          내 정보와 활동 내역 관리
        </p>
      </section>

      <div className="grid gap-5 rounded-2xl bg-[#F7F9FC] p-10 sm:grid-cols-[220px_minmax(0,1fr)]">
        <MyPageSidebar
          selectedMenu={selectedMenu}
          onMenuSelect={handleMenuSelect}
        />

        <main className="min-h-[440px] overflow-x-clip rounded-2xl border border-[#B5D4F4] bg-white p-5 sm:p-7">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selectedMenu}
              initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
              animate={{
                opacity: 1,
                transition: shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      delay: 0.08,
                      duration: 0.22,
                      ease: [0.4, 0, 0.2, 1],
                    },
              }}
              exit={
                shouldReduceMotion
                  ? { opacity: 1, transition: { duration: 0 } }
                  : {
                      opacity: 0,
                      transition: {
                        duration: 0.18,
                        ease: [0.4, 0, 1, 1],
                      },
                    }
              }
            >
              {selectedPanel[selectedMenu]}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <Modal
        isOpen={blocker.state === "blocked"}
        badge="저장 필요"
        title="변경사항이 저장되지 않았습니다."
        description={
          selectedMenu === "password" ? (
            <>
              입력한 새 비밀번호가 저장되지 않았습니다.
              <br />이 페이지를 나가시겠습니까?
            </>
          ) : (
            <>
              수정한 회원 정보가 저장되지 않았습니다.
              <br />이 페이지를 나가시겠습니까?
            </>
          )
        }
        actionLabel="나가기"
        onAction={() => {
          if (blocker.state === "blocked") blocker.proceed();
        }}
        secondaryActionLabel="계속 수정"
        onSecondaryAction={() => {
          if (blocker.state === "blocked") blocker.reset();
        }}
        labelledById="unsaved-changes-modal-title"
      />
    </div>
  );
}
