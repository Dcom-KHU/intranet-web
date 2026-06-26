import { infoPostList, infoPostDetail } from "../../../mocks/info-sharing.mock";

export const getInfos = async () => {
  return Promise.resolve(infoPostList);
};

export const getInfoDetailById = async (id: number) => {
  const info = infoPostDetail.find((item) => item.id === id);

  if (!info) {
    return null;
  }

  return Promise.resolve(info);
};