import { exam_mock, exam_archives_mock } from "../../../mocks/exam-archive.mock";

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
