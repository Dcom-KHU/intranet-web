import UploadForm from "../../features/upload/components/UploadForm";
import { useNavigate } from "react-router-dom";
import { createNotices } from "../../features/notice/api/notice.api";
import type { UploadPostDraft } from "../../features/upload/types/upload.type";

export default function NoticeUpload() {
  const navigate = useNavigate();

  const handleUpload = async (posts: UploadPostDraft[]) => {
    await createNotices(posts);
    navigate("/notice");
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
