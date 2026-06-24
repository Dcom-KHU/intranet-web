import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FiChevronLeft } from "react-icons/fi";

import Loading from "../../components/Loading";
import { Button } from "../../components/ui/Button";
import { useUsers } from "../../features/manage/hooks/useUsers";
import type { User } from "../../features/auth/types/user.type";

const ManagePendingUsers = () => {
  const navigate = useNavigate();
  const { users, loading } = useUsers();
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);

  useEffect(() => {
    setPendingUsers(
      users.filter((user) => user.approvalStatus === "PENDING"),
    );
  }, [users]);

  const removePendingUser = (userId: number) => {
    setPendingUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== userId),
    );
  };

  if (loading) return <Loading />;

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-20">
      <button
        type="button"
        className="flex items-center gap-1 mb-4 text-sm text-gray-400 transition-colors hover:text-[#4988C4]"
        onClick={() => navigate("/manage")}
      >
        <FiChevronLeft /> 관리자 페이지로 돌아가기
      </button>

      <section className="mb-8">
        <h1 className="text-xl font-bold text-[#4988C4]">
          승인 대기 목록
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          가입을 신청한 회원을 승인하거나 거절할 수 있습니다.
        </p>
      </section>

      <section className="overflow-hidden rounded-2xl border bg-white">
        <table className="w-full table-fixed">
          <thead className="bg-[#F8F9FC]">
            <tr className="border-b">
              <th className="px-5 py-4 text-left text-sm font-medium">이름</th>
              <th className="px-5 py-4 text-left text-sm font-medium">학번</th>
              <th className="px-5 py-4 text-left text-sm font-medium">아이디</th>
              <th className="px-5 py-4 text-left text-sm font-medium">신청일</th>
              <th className="px-5 py-4 text-center text-sm font-medium">관리</th>
            </tr>
          </thead>

          <tbody>
            {pendingUsers.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-14 text-center text-sm text-gray-400"
                >
                  승인 대기 중인 회원이 없습니다.
                </td>
              </tr>
            ) : (
              pendingUsers.map((user) => (
                <tr key={user.id} className="border-b text-sm hover:bg-gray-50">
                  <td className="px-5 py-4 font-medium text-[#0F2854]">
                    {user.name}
                  </td>
                  <td className="px-5 py-4 text-gray-500">
                    {user.studentNumber}
                  </td>
                  <td className="px-5 py-4 text-gray-500">{user.userID}</td>
                  <td className="px-5 py-4 text-gray-500">
                    {user.requestedAt ?? "-"}
                  </td>
                  <td className="px-5 py-4">
                    <div className="mx-auto flex max-w-[150px] gap-2">
                      <Button
                        variant="third"
                        className="flex-1 px-0"
                        onClick={() => removePendingUser(user.id)}
                      >
                        승인
                      </Button>
                      <Button
                        variant="refusal"
                        className="flex-1 px-0"
                        onClick={() => removePendingUser(user.id)}
                      >
                        거절
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ManagePendingUsers;
