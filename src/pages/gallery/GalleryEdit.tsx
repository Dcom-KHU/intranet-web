import { Navigate, useNavigate, useParams } from "react-router-dom";

import UploadForm from "../../features/upload/components/UploadForm";
import Loading from "../../components/Loading";
import useAuth from "../../features/auth/hooks/useAuth";
import { useGalleryMutations } from "../../features/gallery/hooks/useGalleryMutations";
import { useGalleryDetail } from "../../features/gallery/hooks/useGalleryDetail";

const GalleryEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const postId = Number(id);
  const { currentUser } = useAuth();
  const { data: gallery, loading } = useGalleryDetail(postId);
  const { updateGallery } = useGalleryMutations();

  if (loading || !gallery) return <Loading />;
  if (currentUser?.role !== "ADMIN") return <Navigate to="/gallery" replace />;

  return (
    <UploadForm
      mode="gallery"
      title="활동 사진 수정"
      submitLabel="수정"
      initialPost={{
        title: gallery.title,
        date: gallery.date,
        descriptionHtml: gallery.description,
        existingFiles: gallery.images,
      }}
      onSubmit={async (post) => {
        await updateGallery({ id: postId, post });
        navigate(`/gallery/${postId}`);
      }}
      onCancel={() => navigate(`/gallery/${postId}`)}
    />
  );
};

export default GalleryEdit;
