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
import type { User } from "../../features/auth/types/user.type";
import { useUsers } from "../../features/manage/hooks/useUsers";

const Manage = () => {
  const navigate = useNavigate();
  const { users, loading } = useUsers();
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);

  useEffect(() => {
    setPendingUsers(
      users.filter((user) => user.approvalStatus === "PENDING"),
    );
  }, [users]);

  const approvedUsers = users.filter(
    (user) => (user.approvalStatus ?? "APPROVED") === "APPROVED",
  );

  const handleApprove = (userId: number) => {
    setPendingUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== userId),
    );
  };

  const handleReject = (userId: number) => {
    setPendingUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== userId),
    );
  };

  if (loading) return <Loading />;

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
              variant="secondary"
              icon={IoCheckmarkOutline}
              showViewAll={false}
            >
              <p className="text-4xl font-bold">{pendingUsers.length}</p>
            </Container>

            <Container
              title="전체 D.COM 회원"
              variant="secondary"
              icon={IoPeopleOutline}
              showViewAll={false}
            >
              <p className="text-4xl font-bold">{approvedUsers.length}</p>
            </Container>
          </div>

          <div className="flex flex-1 flex-col [&>div]:flex [&>div]:min-h-[360px] [&>div]:flex-1 [&>div]:flex-col">
            <Container
              title="승인 대기 목록"
              variant="secondary"
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
                              onClick={() => handleApprove(user.id)}
                            >
                              승인
                            </Button>
                            <Button
                              className="flex-1 px-0"
                              variant="refusal"
                              onClick={() => handleReject(user.id)}
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
          <Container title="게시글 관리" variant="secondary" showViewAll={false}>
            <div className="grid grid-cols-2 gap-4">
              <PostManageCard
                icon={<IoNotificationsOutline className="h-6 w-6 text-gray-400" />}
                title="공지사항"
                description="게시글 23개"
                onClick={() => navigate("/notice")}
              />
              <PostManageCard
                icon={<IoChatbubbleOutline className="h-6 w-6 text-gray-400" />}
                title="정보 공유"
                description="게시글 15개"
                onClick={() => navigate("/info-sharing")}
              />
              <PostManageCard
                icon={<IoPencilOutline className="h-6 w-6 text-gray-400" />}
                title="족보"
                description="게시글 42개"
                onClick={() => navigate("/exam-archive")}
              />
              <PostManageCard
                icon={<IoImageOutline className="h-6 w-6 text-gray-400" />}
                title="활동사진"
                description="게시글 15개"
                onClick={() => navigate("/gallery")}
              />
            </div>
          </Container>

          <Container
            title="회원 관리"
            variant="secondary"
            onViewAllClick={() => navigate("/manage/users")}
          >
            <table className="w-full table-fixed">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-sm font-medium">이름</th>
                  <th className="px-4 py-3 text-sm font-medium">학번</th>
                  <th className="px-4 py-3 text-sm font-medium">아이디</th>
                  <th className="px-4 py-3 text-sm font-medium">최신접속일</th>
                </tr>
              </thead>

              <tbody>
                {approvedUsers.slice(0, 3).map((user) => (
                  <tr
                    key={user.id}
                    className="border-b text-center text-sm hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {user.studentNumber}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{user.userID}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {user.lastLoginAt ?? "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Container>
        </div>
      </div>
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
