import { IoCloseOutline } from "react-icons/io5";
import { useManageUserDetail } from "../hooks/useManageUserDetail";

type ManageUserDetailModalProps = {
  userId: number | null;
  onClose: () => void;
};

export default function ManageUserDetailModal({
  userId,
  onClose,
}: ManageUserDetailModalProps) {
  const { data: user, loading, error } = useManageUserDetail(userId);

  if (userId === null) return null;

  const fields = user
    ? [
        ["이름", user.name],
        ["학번", user.studentNumber],
        ["아이디", user.userID],
        ["이메일", user.email],
        ["전화번호", user.phoneNumber || "-"],
        ["권한", user.role === "ADMIN" ? "관리자" : "일반 회원"],
        ["최근 접속일", user.lastLoginAt],
      ]
    : [];

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/20 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="manage-user-detail-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-xl sm:p-9">
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-[#4988C4]">회원 관리</span>
            <h2
              id="manage-user-detail-title"
              className="mt-1 text-xl font-bold text-[#0F2854]"
            >
              회원 상세 정보
            </h2>
          </div>
          <button
            type="button"
            aria-label="회원 상세 닫기"
            className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            onClick={onClose}
          >
            <IoCloseOutline size={24} />
          </button>
        </div>

        {loading && (
          <div className="flex min-h-52 items-center justify-center">
            <div className="size-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#4988C4]" />
          </div>
        )}

        {!loading && error && (
          <p className="py-16 text-center text-sm text-red-500">{error}</p>
        )}

        {!loading && user && (
          <dl className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/60">
            {fields.map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[110px_1fr] gap-4 border-b border-gray-100 px-5 py-3.5 last:border-b-0"
              >
                <dt className="text-sm font-medium text-gray-500">{label}</dt>
                <dd className="min-w-0 break-words text-sm text-[#0F2854]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}
