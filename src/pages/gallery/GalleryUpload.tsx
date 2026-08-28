import UploadForm from "../../features/upload/components/UploadForm";
import { useNavigate } from "react-router-dom";
import { useGalleryMutations } from "../../features/gallery/hooks/useGalleryMutations";
import type { UploadPostDraft } from "../../features/upload/types/upload.type";

export default function GalleryUpload() {
  const navigate = useNavigate();
  const { createGallery } = useGalleryMutations();

  const handleUpload = async (posts: UploadPostDraft[]) => {
    await createGallery(posts);
    navigate("/gallery", { replace: true });
  };

  return (
    <UploadForm
      mode="gallery"
      title="활동 사진 업로드"
      onCreate={handleUpload}
      onCancel={() => navigate("/gallery")}
    />
  );
}
