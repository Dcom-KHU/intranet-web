import { exam_mock, exam_archives_mock } from "../../../mocks/exam-archive.mock";
import type { UploadPostDraft } from "../../upload/types/upload.type";

const htmlToText = (html: string) =>
  html
    .replace(/<\/(p|div|li|h[1-6])>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

export const getExamArchives = async () => {
  return Promise.resolve(exam_archives_mock);
};

export const getExam = async () => {
  return Promise.resolve(exam_mock);
};

export const getExamArchiveById = async (id: number) => {
  const archive = exam_archives_mock.find((item) => item.id === id);

  if (!archive) {
    return null;
  }

  const posts = exam_mock.filter(
    (exam) =>
      exam.subject === archive.subject && exam.professor === archive.professor,
  );

  return {
    id: archive.id,
    subject: archive.subject,
    professor: archive.professor,
    posts,
  };
};

export const updateExamPost = async (
  archiveId: number,
  postId: number,
  post: UploadPostDraft,
) => {
  const exam = exam_mock.find((item) => item.id === postId);
  const archive = exam_archives_mock.find((item) => item.id === archiveId);

  if (!exam || !archive) throw new Error("족보 게시글을 찾을 수 없습니다.");

  exam.subject = post.subject;
  exam.professor = post.professor;
  exam.semester = post.semester;
  exam.description = htmlToText(post.descriptionHtml);
  exam.files = [
    ...post.existingFiles,
    ...post.files.map((file) => file.name),
  ];

  archive.subject = exam.subject;
  archive.professor = exam.professor;
  archive.date = new Date().toISOString().slice(0, 10).replaceAll("-", ".");
  return exam;
};
