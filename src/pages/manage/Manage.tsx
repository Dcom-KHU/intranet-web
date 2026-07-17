import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoChatbubbleOutline,
  IoCheckmarkOutline,
  IoChevronForward,
  IoImageOutline,
  IoNotificationsOutline,
  IoPencilOutline,
  IoPeopleOutline,
} from "react-icons/io5";

import Loading from "../../components/Loading";
import { Button } from "../../components/ui/Button";
import Container from "../../components/ui/Container";
import { useAdminDashboard } from "../../features/manage/hooks/useAdminDashboard";
import type { DashboardSignupRequest } from "../../features/manage/types/manage-dashboard.type";
import { approveUser, rejectUser } from "../../features/manage/api/manage.api";
import ConfirmDeleteModal from "../../components/ui/ConfirmDeleteModal";

const Manage = () => {
  const navigate = useNavigate();
  const { data: dashboard, loading, error, refetch } = useAdminDashboard();
  const [pendingUsers, setPendingUsers] = useState<DashboardSignupRequest[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [totalUserCount, setTotalUserCount] = useState(0);
  const [processingUserId, setProcessingUserId] = useState<number | null>(null);
  const [rejectUserId, setRejectUserId] = useState<number | null>(null);

  useEffect(() => {
    if (!dashboard) return;
    setPendingUsers(dashboard.recentSignupRequests);
    setPendingCount(dashboard.pendingUserCount);
    setTotalUserCount(dashboard.totalUserCount);
  }, [dashboard]);

  const handleApprove = async (userId: number) => {
    if (processingUserId !== null) return;

    setProcessingUserId(userId);
    try {
      await approveUser(userId);
      setPendingUsers((currentUsers) =>
        currentUsers.filter((user) => user.id !== userId),
      );
      setPendingCount((count) => Math.max(0, count - 1));
      setTotalUserCount((count) => count + 1);
      void refetch();
    } catch (error) {
      console.error("회원 승인 실패:", error);
      window.alert("회원 승인에 실패했습니다.");
    } finally {
      setProcessingUserId(null);
    }
  };

  const handleReject = async (userId: number) => {
    if (processingUserId !== null) return;

    setProcessingUserId(userId);
    try {
      await rejectUser(userId);
      setPendingUsers((currentUsers) =>
        currentUsers.filter((user) => user.id !== userId),
      );
      setPendingCount((count) => Math.max(0, count - 1));
      void refetch();
    } catch (error) {
      console.error("회원 거절 실패:", error);
      window.alert("회원 거절에 실패했습니다.");
    } finally {
      setProcessingUserId(null);
      setRejectUserId(null);
    }
  };

  if (loading) return <Loading />;

  if (error || !dashboard) {
    return <p className="px-4 py-16 text-center text-sm text-red-500">{error}</p>;
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-20">
      <section className="mb-10">
        <h1 className="text-xl font-bold text-[#4988C4]">D.COM 관리자</h1>
        <p className="mt-2 text-sm text-gray-500">
          D.COM 회원과 게시글을 관리해보세요
        </p>
      </section>

      <div className="flex flex-col gap-6 rounded-2xl bg-[#F8F9FC] p-10 lg:flex-row lg:items-stretch">
        <div className="flex flex-1 flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Container
              title="회원 승인 대기"
              variant="manage"
              icon={IoCheckmarkOutline}
              showViewAll={false}
            >
              <p className="text-4xl font-bold">{pendingCount}</p>
            </Container>

            <Container
              title="전체 D.COM 회원"
              variant="manage"
              icon={IoPeopleOutline}
              showViewAll={false}
            >
              <p className="text-4xl font-bold">{totalUserCount}</p>
            </Container>
          </div>

          <div className="flex flex-1 flex-col [&>div]:flex [&>div]:min-h-[360px] [&>div]:flex-1 [&>div]:flex-col">
            <Container
              title="승인 대기 목록"
              variant="manage"
              onViewAllClick={() => navigate("/manage/pending")}
            >
              <div className="flex flex-1 flex-col">
                {pendingUsers.length === 0 ? (
                  <EmptyPendingState />
                ) : (
                  <div className="flex flex-1 flex-col">
                      {pendingUsers.slice(0, 4).map((user) => (
                        <div
                          key={user.id}
                          className="flex min-h-[70px] items-center justify-between border-b py-3 text-sm"
                        >
                          <div className="flex min-w-0 flex-col gap-1">
                            <p className="truncate font-medium">
                              {user.name} ({user.studentNumber})
                            </p>
                            <p className="text-sm text-gray-400">
                              신청일 | {user.requestedAt ?? "-"}
                            </p>
                          </div>

                          <div className="flex w-[110px] gap-2">
                            <Button
                              className="flex-1 px-0"
                              variant="third"
                              disabled={processingUserId !== null}
                              onClick={() => void handleApprove(user.id)}
                            >
                              승인
                            </Button>
                            <Button
                              className="flex-1 px-0"
                              variant="refusal"
                              disabled={processingUserId !== null}
                              onClick={() => setRejectUserId(user.id)}
                            >
                              거절
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </Container>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <Container 
            title="게시글 관리" 
            variant="manage" 
            showViewAll={false}
          >
            <div className="grid grid-cols-2 gap-4">
              <PostManageCard
                icon={<IoNotificationsOutline className="h-6 w-6 text-gray-400" />}
                title="공지사항"
                description={`게시글 ${dashboard.postCounts.notices}개`}
                onClick={() => navigate("/notice")}
              />
              <PostManageCard
                icon={<IoChatbubbleOutline className="h-6 w-6 text-gray-400" />}
                title="정보 공유"
                description={`게시글 ${dashboard.postCounts.infoPosts}개`}
                onClick={() => navigate("/info")}
              />
              <PostManageCard
                icon={<IoPencilOutline className="h-6 w-6 text-gray-400" />}
                title="족보"
                description={`게시글 ${dashboard.postCounts.archives}개`}
                onClick={() => navigate("/exam-archive")}
              />
              <PostManageCard
                icon={<IoImageOutline className="h-6 w-6 text-gray-400" />}
                title="활동사진"
                description={`게시글 ${dashboard.postCounts.photoPosts}개`}
                onClick={() => navigate("/gallery")}
              />
            </div>
          </Container>

          <Container
            title="회원 관리"
            variant="manage"
            onViewAllClick={() => navigate("/manage/users")}
          >
            <table className="w-full table-fixed">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-sm font-medium">이름</th>
                  <th className="px-4 py-3 text-sm font-medium">학번</th>
                  <th className="px-4 py-3 text-sm font-medium">최신접속일</th>
                </tr>
              </thead>

              <tbody>
                {dashboard.recentActiveMembers.slice(0, 3).map((user) => (
                  <tr
                    key={user.id}
                    className="border-b text-center text-sm hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {user.studentNumber}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {user.lastLoginAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Container>
        </div>
      </div>
      <ConfirmDeleteModal
        isOpen={rejectUserId !== null}
        title="가입 요청을 거절하시겠습니까?"
        description="거절된 회원 정보는 데이터베이스에서 영구 삭제됩니다."
        isDeleting={processingUserId !== null}
        onConfirm={() => {
          if (rejectUserId !== null) void handleReject(rejectUserId);
        }}
        onCancel={() => setRejectUserId(null)}
      />
    </div>
  );
};

export default Manage;

function EmptyPendingState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-xl px-4 py-10 text-center">
      <IoCheckmarkOutline className="mb-3 h-8 w-8 text-[#4988C4]" />
      <p className="text-sm font-semibold text-[#0F2854]">
        승인 대기 중인 회원이 없습니다.
      </p>
      <p className="mt-2 text-xs text-gray-400">
        새로운 가입 신청이 들어오면 이곳에 표시됩니다.
      </p>
    </div>
  );
}

function PostManageCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center rounded-2xl bg-[#F8F9FC] p-4 text-[#0F2854] transition-all duration-300 hover:shadow-md"
    >
      {icon}
      <div className="ml-3 flex min-w-0 flex-col gap-1">
        <p className="truncate text-sm font-bold">{title}</p>
        <p className="truncate text-[10px] text-gray-400">{description}</p>
      </div>

      <IoChevronForward className="ml-auto h-6 w-6 shrink-0 text-gray-400" />
    </div>
  );
}
