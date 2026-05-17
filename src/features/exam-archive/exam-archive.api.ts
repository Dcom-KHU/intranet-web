import { exam_mock } from "./exam-archive.mock";

// 전체 게시글 조회
export const getExamArchives = async () => {
    // 실제 API 호출이 필요한 경우 여기에 구현
    return Promise.resolve(exam_mock);
};

// 상세 조회
export const getExamArchiveById = async (id: number) => {
  const item = exam_mock.find((exam) => exam.id === id);
  return item ?? null;
};