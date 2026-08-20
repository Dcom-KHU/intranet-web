import { Navigate, useNavigate, useParams } from "react-router-dom";

import UploadForm from "../../features/upload/components/UploadForm";
import Loading from "../../components/Loading";
import useAuth from "../../features/auth/hooks/useAuth";
import { useInfoMutations } from "../../features/info-sharing/hooks/useInfoMutations";
import { useInfoDetail } from "../../features/info-sharing/hooks/useInfoDetail";
import DetailQueryError from "../../components/DetailQueryError";

const InfoSharingEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const postId = Number(id);
  const { currentUser } = useAuth();
  const { updateInfo } = useInfoMutations();
  const {
    data: info,
    loading,
    errorType,
    errorMessage,
  } = useInfoDetail(postId);

  if (loading) return <Loading />;
  if (errorType || !info) {
    return (
      <DetailQueryError
        message={errorMessage || "정보공유 게시글 데이터가 없습니다."}
        fallbackPath="/info"
      />
    );
  }

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
        existingFiles: [],
        existingFileItems: info.attachmentItems,
        deleteFileIds: [],
      }}
      onSubmit={async (post) => {
        await updateInfo({ id: postId, post });
        navigate(`/info/${postId}`);
      }}
      onCancel={() => navigate(`/info/${postId}`)}
    />
  );
};

export default InfoSharingEdit;
