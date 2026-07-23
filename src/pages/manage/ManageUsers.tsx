import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../../components/Loading";
import { Button } from "../../components/ui/Button";
import SearchBar from "../../components/ui/SearchBar";
import PageBackButton from "../../components/ui/PageBackButton";
import Pagination from "../../components/ui/Pagination";
import { useManageUsers } from "../../features/manage/hooks/useManageUsers";
import ConfirmDeleteModal from "../../components/ui/ConfirmDeleteModal";
import ManageUserDetailModal from "../../features/manage/components/ManageUserDetailModal";

type SortType = "lastLogin" | "studentNumber";

const sortOptions: { label: string; value: SortType }[] = [
  { label: "최신접속일 순", value: "lastLogin" },
  { label: "학번 순", value: "studentNumber" },
];

const sortQuery: Record<SortType, string> = {
  lastLogin: "lastLoginAt,desc",
  studentNumber: "studentId,asc",
};

const ManageUsers = () => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState<SortType>("lastLogin");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [appliedKeyword, setAppliedKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [hiddenUserIds, setHiddenUserIds] = useState<number[]>([]);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const { data, loading, error } = useManageUsers(
    page,
    10,
    appliedKeyword,
    sortQuery[sortType],
  );

  const users = (data?.users ?? []).filter(
    (user) => !hiddenUserIds.includes(user.id),
  );

  const deleteUser = () => {
    if (deleteUserId === null) return;
    setHiddenUserIds((ids) => [...ids, deleteUserId]);
    setDeleteUserId(null);
  };

  if (loading) return <Loading />;

  if (error || !data) {
    return (
      <p className="px-4 py-16 text-center text-sm text-red-500">
        {error}
      </p>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-20">
      <PageBackButton
        onClick={() => navigate("/manage")}
      />

      <section className="mb-8">
        <h1 className="text-xl font-bold text-[#4988C4]">
          회원 관리
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          전체 회원을 조회하고 정렬하거나 삭제할 수 있습니다.
        </p>
      </section>

      <SearchBar
        value={searchKeyword}
        onChange={setSearchKeyword}
        onSearch={() => {
          setPage(0);
          setAppliedKeyword(searchKeyword.trim());
        }}
        placeholder="검색어를 입력하세요"
        className="mb-5"
      />

      <section className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-500">
          총{" "}
          <span className="font-bold text-[#4988C4]">
            {data.totalElements}
          </span>
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
              onClick={() => {
                setPage(0);
                setSortType(option.value);
              }}
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
              <th className="px-5 py-4 text-center text-xs font-medium">
                이름
              </th>
              <th className="px-5 py-4 text-center text-xs font-medium">
                학번
              </th>
              <th className="px-5 py-4 text-center text-xs font-medium">
                아이디
              </th>
              <th className="px-5 py-4 text-center text-xs font-medium">
                이메일
              </th>
              <th className="px-5 py-4 text-center text-xs font-medium">
                최신접속일
              </th>
              <th className="px-5 py-4 text-center text-xs font-medium">
                관리
              </th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-14 text-center text-sm text-gray-400"
                >
                  조회할 회원이 없습니다.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="cursor-pointer border-b text-sm transition-colors hover:bg-[#4988C4]/5"
                  tabIndex={0}
                  onClick={() => setSelectedUserId(user.id)}
                  onKeyDown={(event) => {
                    if (
                      event.target === event.currentTarget &&
                      (event.key === "Enter" || event.key === " ")
                    ) {
                      event.preventDefault();
                      setSelectedUserId(user.id);
                    }
                  }}
                >
                  <td className="px-5 py-4 text-center font-medium text-[#0F2854]">
                    {user.name}
                  </td>

                  <td className="px-5 py-4 text-center text-gray-500">
                    {user.studentNumber}
                  </td>

                  <td
                    className="max-w-0 truncate px-5 py-4 text-center text-gray-500"
                    title={user.userID}
                  >
                    {user.userID}
                  </td>

                  <td
                    className="max-w-0 truncate px-5 py-4 text-center text-gray-500"
                    title={user.email}
                  >
                    {user.email}
                  </td>

                  <td className="px-5 py-4 text-center text-gray-500">
                    {user.lastLoginAt ?? "-"}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <Button
                      variant="refusal"
                      className="px-4"
                      onClick={(event) => {
                        event.stopPropagation();
                        setDeleteUserId(user.id);
                      }}
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

      <Pagination
        className="mt-6"
        currentPage={data.page + 1}
        totalPages={data.totalPages}
        onPageChange={(nextPage) => setPage(nextPage - 1)}
        ariaLabel="전체 회원 페이지"
      />
      <ConfirmDeleteModal
        isOpen={deleteUserId !== null}
        description="삭제한 회원은 목록에서 복구할 수 없습니다."
        onConfirm={deleteUser}
        onCancel={() => setDeleteUserId(null)}
      />
      <ManageUserDetailModal
        userId={selectedUserId}
        onClose={() => setSelectedUserId(null)}
      />
    </div>
  );
};

export default ManageUsers;
