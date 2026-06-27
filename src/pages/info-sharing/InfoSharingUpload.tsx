import UploadForm from "../../features/upload/components/UploadForm";
import { useNavigate } from "react-router-dom";

export default function InfoSharingUpload() {
  const navigate = useNavigate();

  return (
    <UploadForm
      mode="info"
      title="정보 공유 업로드"
      onCancel={() => navigate("/info")}
    />
  );
}
