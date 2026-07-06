import { api } from "@/api/client";
import { type UploadPostDraft } from "../../upload/types/upload.type";
import { exam_mock, exam_archives_mock } from "../../../mocks/exam-archive.mock";
import type {
  ExamArchiveDetailDto,
  ExamArchivesPageDto,
} from "../dto/exam-archives.dto";
import { toExamArchiveDetail } from "../mapper/exam-archives.mapper";


const htmlToText = (html: string) =>
  html
    .replace(/<\/(p|div|li|h[1-6])>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

// 족보 목록 조회
export const getExamArchives = async (page = 0, size = 10) => {
  const response = await api.get<{ data: ExamArchivesPageDto }>(
    "/api/archives",
    { params: { page, size } },
  );

  return response.data.data;
};

// 족보 포스트 조회
export const getExam = async () => {
  return Promise.resolve(exam_mock);
};

// 족보 상세 조회
export const getExamArchiveById = async (id: number) => {
  const response = await api.get<{ data: ExamArchiveDetailDto }>(
    `/api/archives/${id}`,
  );

  return toExamArchiveDetail(response.data.data);
};

// 족보 첨부파일 다운로드
export const downloadExamArchiveFile = async (
  archiveId: number,
  recordId: number,
  fileId: number,
  fileName: string,
) => {
  const response = await api.get<Blob>(
    `/api/archives/${archiveId}/records/${recordId}/files/${fileId}/download`,
    { responseType: "blob" },
  );
  const objectUrl = URL.createObjectURL(response.data);
  const link = document.createElement("a");

  link.href = objectUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(objectUrl);
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
