import { api } from "@/api/client";
import { type UploadPostDraft } from "../../upload/types/upload.type";
import { exam_mock, exam_archives_mock } from "../../../mocks/exam-archive.mock";
import type {
  ExamArchiveDetailDto,
  ExamArchivesPageDto,
} from "../dto/exam-archives.dto";
import { toExamArchiveDetail } from "../mapper/exam-archives.mapper";
import type {
  CreateExamArchiveExamType,
  CreateExamArchiveRecordDto,
  CreateExamArchiveRequestDto,
  CreateExamArchiveSemester,
} from "../dto/create-exam-archive.dto";


const htmlToText = (html: string) =>
  html
    .replace(/<\/(p|div|li|h[1-6])>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

const toCreateSemester = (semester: string): CreateExamArchiveSemester => {
  const semesterNumber = semester.split("-")[1];

  return semesterNumber === "2" ? "SECOND" : "FIRST";
};

const toCreateExamType = (examType: string): CreateExamArchiveExamType => {
  const examTypeMap: Record<string, CreateExamArchiveExamType> = {
    중간고사: "MIDTERM",
    기말고사: "FINAL",
    퀴즈: "QUIZ",
    과제: "ASSIGNMENT",
  };

  return examTypeMap[examType] ?? "MIDTERM";
};

const toCreateExamArchiveRecord = (
  post: UploadPostDraft,
): CreateExamArchiveRecordDto => ({
  examYear: Number(post.semester.split("-")[0]),
  semester: toCreateSemester(post.semester),
  examType: toCreateExamType(post.examType),
  content: htmlToText(post.descriptionHtml),
});

const toCreateExamArchiveRequest = (
  post: UploadPostDraft,
): CreateExamArchiveRequestDto => ({
  subjectName: post.subject.trim(),
  professorName: post.professor.trim(),
  records: [toCreateExamArchiveRecord(post)],
});

// 족보 게시글 등록
export const createExamArchives = async (posts: UploadPostDraft[]) => {
  await Promise.all(
    posts.map((post) => {
      const formData = new FormData();

      formData.append(
        "request",
        JSON.stringify(toCreateExamArchiveRequest(post)),
      );
      post.files.forEach((file) => formData.append("files", file));

      return api.post("/api/archives", formData);
    }),
  );
};


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

// 족보 검색
export const getSearchExamArchives = async ({
  searchKeyword,
  page = 0,
  size = 10,
}: {
  searchKeyword: string;
  page: number;
  size: number;
}) => {
  const response = await api.get<{ data: ExamArchivesPageDto }>(
    "/api/archives/search",
    { params: { searchKeyword, page, size } },
  );

  return response.data.data;
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


// 족보 포스트 수정
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
