import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FiChevronLeft } from "react-icons/fi";

import Loading from "../../components/Loading";
import { Button } from "../../components/ui/Button";
import { useUsers } from "../../features/manage/hooks/useUsers";
import type { User } from "../../features/auth/types/user.type";

type SortType = "lastLogin" | "name" | "studentNumber";

const sortOptions: { label: string; value: SortType }[] = [
  { label: "최신접속일 순", value: "lastLogin" },
  { label: "가나다순", value: "name" },
  { label: "학번 순", value: "studentNumber" },
];

const ManageUsers = () => {
  const navigate = useNavigate();
  const { users, loading } = useUsers();
  const [managedUsers, setManagedUsers] = useState<User[]>([]);
  const [sortType, setSortType] = useState<SortType>("lastLogin");

  useEffect(() => {
    setManagedUsers(
      users.filter((user) => (user.approvalStatus ?? "APPROVED") === "APPROVED"),
    );
  }, [users]);

  const sortedUsers = useMemo(() => {
    return [...managedUsers].sort((a, b) => {
      if (sortType === "lastLogin") {
        return (b.lastLoginAt ?? "").localeCompare(a.lastLoginAt ?? "");
      }

      if (sortType === "name") {
        return a.name.localeCompare(b.name, "ko");
      }

      return a.studentNumber.localeCompare(b.studentNumber);
    });
  }, [managedUsers, sortType]);

  const deleteUser = (userId: number) => {
    setManagedUsers((currentUsers) =>
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
        <h1 className="text-xl font-bold text-[#4988C4]">회원 관리</h1>
        <p className="mt-2 text-sm text-gray-500">
          전체 회원을 조회하고 정렬하거나 삭제할 수 있습니다.
        </p>
      </section>

      <section className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-500">
          총 <span className="font-bold text-[#4988C4]">{sortedUsers.length}</span>
          명
        </p>

        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`rounded-full border px-4 py-2 text-xs transition-colors ${
                sortType === option.value
                  ? "border-[#4988C4] bg-[#4988C4] text-white"
                  : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
              }`}
              onClick={() => setSortType(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border bg-white">
        <table className="w-full table-fixed">
          <thead className="bg-[#F8F9FC]">
            <tr className="border-b">
              <th className="px-5 py-4 text-left text-sm font-medium">이름</th>
              <th className="px-5 py-4 text-left text-sm font-medium">학번</th>
              <th className="px-5 py-4 text-left text-sm font-medium">아이디</th>
              <th className="px-5 py-4 text-left text-sm font-medium">이메일</th>
              <th className="px-5 py-4 text-left text-sm font-medium">최신접속일</th>
              <th className="px-5 py-4 text-center text-sm font-medium">관리</th>
            </tr>
          </thead>

          <tbody>
            {sortedUsers.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-14 text-center text-sm text-gray-400"
                >
                  조회할 회원이 없습니다.
                </td>
              </tr>
            ) : (
              sortedUsers.map((user) => (
                <tr key={user.id} className="border-b text-sm hover:bg-gray-50">
                  <td className="px-5 py-4 font-medium text-[#0F2854]">
                    {user.name}
                  </td>
                  <td className="px-5 py-4 text-gray-500">
                    {user.studentNumber}
                  </td>
                  <td className="px-5 py-4 text-gray-500">{user.userID}</td>
                  <td className="truncate px-5 py-4 text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-5 py-4 text-gray-500">
                    {user.lastLoginAt ?? "-"}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <Button
                      variant="refusal"
                      className="px-4"
                      onClick={() => deleteUser(user.id)}
                    >
                      삭제
                    </Button>
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

export default ManageUsers;
