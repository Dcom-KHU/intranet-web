import { notice_mock } from "../../../mocks/notice.mock";

export const getNotices = async () => {
  return Promise.resolve(notice_mock);
};
