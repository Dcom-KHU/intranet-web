import { galleryPosts, galleryPostDetails } from "../../../mocks/gallery.mock";

export const getGalleryPosts = async () => {
  return Promise.resolve(galleryPosts);
};

export const getGalleryById = async (id: number) => {
  const gallery = galleryPostDetails.find((item) => item.id === id);

  if (!gallery) {
    return null;
  }

  return Promise.resolve(gallery);
};