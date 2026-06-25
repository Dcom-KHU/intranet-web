import { notice_detail_mock, notice_mock } from "../../../mocks/notice.mock";

// 공지사항 전체 목록 조회
export const getNotices = async () => {
  return Promise.resolve(notice_mock);
};

// 공지사항 상세 조회
export const getNoticeDetail = async () => {
  return Promise.resolve(notice_detail_mock)
}