import { Navigate, useNavigate, useParams } from "react-router-dom";

import UploadForm from "../../features/upload/components/UploadForm";
import Loading from "../../components/Loading";
import useAuth from "../../features/auth/hooks/useAuth";
import { updateInfoPost } from "../../features/info-sharing/api/info-sharing.api";
import { useInfoDetail } from "../../features/info-sharing/hooks/useInfoDetail";

const InfoSharingEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const postId = Number(id);
  const { currentUser } = useAuth();
  const { data: info } = useInfoDetail(postId);

  if (!info) return <Loading />;

  if (currentUser?.studentNumber !== info.author.studentNumber) {
    return <Navigate to={`/info/${postId}`} replace />;
  }

  return (
    <UploadForm
      mode="info"
      title="정보 공유 수정"
      submitLabel="수정"
      initialPost={{
        title: info.title,
        descriptionHtml: info.description,
        existingFiles: info.attachments,
      }}
      onSubmit={async (post) => {
        await updateInfoPost(postId, post);
        navigate(`/info/${postId}`);
      }}
      onCancel={() => navigate(`/info/${postId}`)}
    />
  );
};

export default InfoSharingEdit;
