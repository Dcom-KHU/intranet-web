import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../../components/Loading";
import { Button } from "../../components/ui/Button";
import PageBackButton from "../../components/ui/PageBackButton";
import Pagination from "../../components/ui/Pagination";
import { usePendingUsers } from "../../features/manage/hooks/usePendingUsers";
import { approveUser, rejectUser } from "../../features/manage/api/manage.api";

const ManagePendingUsers = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [processingUserId, setProcessingUserId] = useState<number | null>(null);
  const { data, loading, error, refetch } = usePendingUsers(page, 10);

  const handleUser = async (userId: number, action: "approve" | "reject") => {
    if (processingUserId !== null) return;

    setProcessingUserId(userId);
    try {
      await (action === "approve" ? approveUser(userId) : rejectUser(userId));

      if (data?.users.length === 1 && page > 0) {
        setPage((currentPage) => currentPage - 1);
      } else {
        await refetch();
      }
    } catch (requestError) {
      console.error(
        `회원 ${action === "approve" ? "승인" : "거절"} 실패:`,
        requestError
      );
      window.alert(
        `회원 ${action === "approve" ? "승인" : "거절"}에 실패했습니다.`
      );
    } finally {
      setProcessingUserId(null);
    }
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
      <PageBackButton onClick={() => navigate("/manage")} />

      <section className="mb-8">
        <h1 className="text-xl font-bold text-[#4988C4]">
          승인 대기 목록
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          가입을 신청한 회원을 승인하거나 거절할 수 있습니다.
        </p>
      </section>

      <section className="overflow-x-auto rounded-2xl border bg-white text-sm">
        <table className="w-full min-w-[1000px] table-fixed">
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
                전화번호
              </th>
              <th className="px-5 py-4 text-center text-xs font-medium">
                신청일
              </th>
              <th className="px-5 py-4 text-center text-xs font-medium">
                관리
              </th>
            </tr>
          </thead>

          <tbody>
            {data.users.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-14 text-center text-sm text-gray-400"
                >
                  승인 대기 중인 회원이 없습니다.
                </td>
              </tr>
            ) : (
              data.users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b text-xs hover:bg-gray-50"
                >
                  <td className="px-5 py-4 text-center font-medium text-[#0F2854]">
                    {user.name}
                  </td>

                  <td className="px-5 py-4 text-center text-gray-500">
                    {user.studentNumber}
                  </td>

                  <td className="px-5 py-4 text-center text-gray-500">
                    {user.userID}
                  </td>

                  <td className="truncate px-5 py-4 text-center text-gray-500">
                    {user.email}
                  </td>

                  <td className="px-5 py-4 text-center text-gray-500">
                    {user.phoneNumber}
                  </td>

                  <td className="px-5 py-4 text-center text-gray-500">
                    {user.requestedAt ?? "-"}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <div className="mx-auto flex max-w-[130px] justify-center gap-1.5">
                      <Button
                        variant="third"
                        className="flex-1 rounded-lg px-0 py-1.5 text-xs"
                        disabled={processingUserId !== null}
                        onClick={() => void handleUser(user.id, "approve")}
                      >
                        승인
                      </Button>

                      <Button
                        variant="refusal"
                        className="flex-1 rounded-lg px-0 py-1.5 text-xs"
                        disabled={processingUserId !== null}
                        onClick={() => void handleUser(user.id, "reject")}
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

      <Pagination
        className="mt-6"
        currentPage={data.page + 1}
        totalPages={data.totalPages}
        onPageChange={(nextPage) => setPage(nextPage - 1)}
        ariaLabel="승인 대기 회원 페이지"
      />
    </div>
  );
};

export default ManagePendingUsers;