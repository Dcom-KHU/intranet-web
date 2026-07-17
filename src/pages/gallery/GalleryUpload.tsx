import UploadForm from "../../features/upload/components/UploadForm";
import { useNavigate } from "react-router-dom";
import { createGalleryPosts } from "../../features/gallery/api/gallery.api";
import type { UploadPostDraft } from "../../features/upload/types/upload.type";

export default function GalleryUpload() {
  const navigate = useNavigate();

  const handleUpload = async (posts: UploadPostDraft[]) => {
    await createGalleryPosts(posts);
    navigate("/gallery");
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
