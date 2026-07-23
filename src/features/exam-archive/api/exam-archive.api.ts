import { api } from "@/api/client";
import { type UploadPostDraft } from "../../upload/types/upload.type";
import { exam_mock } from "../../../mocks/exam-archive.mock";
import type {
  ExamArchiveDetailDto,
  ExamArchivesPageDto,
} from "../dto/exam-archives.dto";
import { toExamArchiveDetail } from "../mapper/exam-archives.mapper";
import {
  htmlToText,
  toCreateExamArchiveRequest,
} from "../utils/exam-archive.utils";
import type {
  ExamArchiveResponseDto,
  UpdateExamArchiveRequestDto,
} from "../dto/update-exam-archive.dto";



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
    "/api/archives",
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


// 족보 포스트 수정
export const updateExamPost = async (
  archiveId: number,
  recordId: number,
  post: UploadPostDraft,
) => {
  const formData = new FormData();
  const selectedYear = Number(post.semester.split("-")[0]);
  const selectedSemester = post.semester.split("-")[1];
  const examTypeMap = {
    중간고사: "MIDTERM",
    기말고사: "FINAL",
  } as const;

  const request: UpdateExamArchiveRequestDto = {
    examYear: Number.isNaN(selectedYear) ? post.examYear : selectedYear,
    semester:
      selectedSemester === "1"
        ? "FIRST"
        : selectedSemester === "2"
          ? "SECOND"
          : post.semesterCode,
    examType:
      examTypeMap[post.examType as keyof typeof examTypeMap] ??
      post.examTypeCode,
    content: htmlToText(post.descriptionHtml),
    deleteFileIds: post.deleteFileIds,
  };

  formData.append(
    "request",
    JSON.stringify(request),
  );

  // 새로 추가하는 파일만 첨부
  post.files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await api.put<ExamArchiveResponseDto>(
    `/api/archives/${archiveId}/records/${recordId}`,
    formData,
  );

  return response.data;
};

// 족보 포스트 삭제
export const deleteExamPost = async (
  archiveId: number, 
  recordId: number
) => {
  console.log(`Deleting post with archiveId: ${archiveId}, recordId: ${recordId}`);

  const response = await api.delete<ExamArchiveResponseDto>(
    `/api/archives/${archiveId}/records/${recordId}`,
  );

  return response.data;
};
