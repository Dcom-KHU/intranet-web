import UploadForm from "../../features/upload/components/UploadForm";
import { useNavigate } from "react-router-dom";
import { useInfoMutations } from "../../features/info-sharing/hooks/useInfoMutations";
import type { UploadPostDraft } from "../../features/upload/types/upload.type";

export default function InfoSharingUpload() {
  const navigate = useNavigate();
  const { createInfo } = useInfoMutations();

  const handleUpload = async (posts: UploadPostDraft[]) => {
    await createInfo(posts);
    navigate("/info", { replace: true });
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
