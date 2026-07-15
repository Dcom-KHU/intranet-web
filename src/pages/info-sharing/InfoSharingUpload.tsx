import UploadForm from "../../features/upload/components/UploadForm";
import { useNavigate } from "react-router-dom";
import { createInfoPosts } from "../../features/info-sharing/api/info-sharing.api";
import type { UploadPostDraft } from "../../features/upload/types/upload.type";

export default function InfoSharingUpload() {
  const navigate = useNavigate();

  const handleUpload = async (posts: UploadPostDraft[]) => {
    await createInfoPosts(posts);
    navigate("/info");
  };

  return (
    <UploadForm
      mode="info"
      title="정보 공유 업로드"
      onCreate={handleUpload}
      onCancel={() => navigate("/info")}
    />
  );
}
