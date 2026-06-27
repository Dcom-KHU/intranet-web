import UploadForm from "../../features/upload/components/UploadForm";
import { useNavigate } from "react-router-dom";

export default function GalleryUpload() {
  const navigate = useNavigate();

  return (
    <UploadForm
      mode="gallery"
      title="활동 사진 업로드"
      onCancel={() => navigate("/gallery")}
    />
  );
}
