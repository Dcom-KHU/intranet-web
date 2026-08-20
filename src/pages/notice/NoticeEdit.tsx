import { Navigate, useNavigate, useParams } from "react-router-dom";

import UploadForm from "../../features/upload/components/UploadForm";
import Loading from "../../components/Loading";
import useAuth from "../../features/auth/hooks/useAuth";
import { useNoticeMutations } from "../../features/notice/hooks/useNoticeMutations";
import { useNoticeDetail } from "../../features/notice/hooks/useNoticeDetail";

const NoticeEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const postId = Number(id);
  const { currentUser } = useAuth();
  const { data: notice } = useNoticeDetail(postId);
  const { updateNotice } = useNoticeMutations();

  if (!notice) return <Loading />;
  if (currentUser?.role !== "ADMIN") return <Navigate to="/notice" replace />;

  return (
    <UploadForm
      mode="notice"
      title="공지사항 수정"
      submitLabel="수정"
      initialPost={{
        title: notice.title,
        descriptionHtml: notice.description,
        existingFiles: notice.files ?? [],
        existingFileItems: notice.fileItems ?? [],
      }}
      onSubmit={async (post) => {
        await updateNotice({ id: postId, post });
        navigate(`/notice/${postId}`);
      }}
      onCancel={() => navigate(`/notice/${postId}`)}
    />
  );
};

export default NoticeEdit;
