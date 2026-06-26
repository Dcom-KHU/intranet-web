export type GalleryPost = {
  id: number;
  imageUrl: string;
  title: string;
  date: string;
  imageCount: number;
};

export interface GalleryPostDetail {
    id: number;
    title: string;
    description: string;
    date: string;
    images: string[];
}
