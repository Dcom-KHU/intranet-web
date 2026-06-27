import UploadForm from "../../features/upload/components/UploadForm";
import { useNavigate } from "react-router-dom";

export default function NoticeUpload() {
  const navigate = useNavigate();

  return (
    <UploadForm
      mode="notice"
      title="공지사항 업로드"
      onCancel={() => navigate("/notice")}
    />
  );
}
