import { Navigate, useNavigate, useParams } from "react-router-dom";

import UploadForm from "../../features/upload/components/UploadForm";
import Loading from "../../components/Loading";
import useAuth from "../../features/auth/hooks/useAuth";
import { updateExamPost } from "../../features/exam-archive/api/exam-archive.api";
import { useExamArchiveDetail } from "../../features/exam-archive/hooks/useExamArchiveDetail";

const ExamArchiveEdit = () => {
  const navigate = useNavigate();
  const { archiveId, postId: postIdParam } = useParams();
  const archivePostId = Number(archiveId);
  const postId = Number(postIdParam);
  const { currentUser } = useAuth();
  const { data: archive } = useExamArchiveDetail(archivePostId);

  if (!archive) return <Loading />;

  const post = archive.posts.find((item) => item.id === postId);
  if (!post) return <Navigate to={`/exam-archive/${archivePostId}`} replace />;

  if (currentUser?.studentNumber !== post.author.studentNumber) {
    return <Navigate to={`/exam-archive/${archivePostId}`} replace />;
  }

  return (
    <UploadForm
      mode="exam"
      title="족보 수정"
      submitLabel="수정"
      initialSubject={post.subject}
      initialProfessor={post.professor}
      initialPost={{
        subject: post.subject,
        professor: post.professor,
        semester: post.semester,
        descriptionHtml: post.description,
        existingFiles: post.files,
      }}
      onSubmit={async (draft) => {
        await updateExamPost(archivePostId, postId, draft);
        navigate(`/exam-archive/${archivePostId}`);
      }}
      onCancel={() => navigate(`/exam-archive/${archivePostId}`)}
    />
  );
};

export default ExamArchiveEdit;
