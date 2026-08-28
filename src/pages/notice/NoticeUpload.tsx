import UploadForm from "../../features/upload/components/UploadForm";
import { useNavigate } from "react-router-dom";
import { useNoticeMutations } from "../../features/notice/hooks/useNoticeMutations";
import type { UploadPostDraft } from "../../features/upload/types/upload.type";

export default function NoticeUpload() {
  const navigate = useNavigate();
  const { createNotice } = useNoticeMutations();

  const handleUpload = async (posts: UploadPostDraft[]) => {
    await createNotice(posts);
    navigate("/notice", { replace: true });
  };

  return (
    <UploadForm
      mode="notice"
      title="공지사항 업로드"
      onCreate={handleUpload}
      onCancel={() => navigate("/notice")}
    />
  );
}
