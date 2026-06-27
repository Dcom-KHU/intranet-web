import { Navigate, useNavigate, useParams } from "react-router-dom";

import UploadForm from "../../components/upload/UploadForm";
import Loading from "../../components/Loading";
import useAuth from "../../features/auth/hooks/useAuth";
import { updateNoticePost } from "../../features/notice/api/notice.api";
import { useNoticeDetail } from "../../features/notice/hooks/useNoticeDetail";

const NoticeEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const postId = Number(id);
  const { currentUser } = useAuth();
  const { data: notice } = useNoticeDetail(postId);

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
      }}
      onSubmit={async (post) => {
        await updateNoticePost(postId, post);
        navigate(`/notice/${postId}`);
      }}
    />
  );
};

export default NoticeEdit;
