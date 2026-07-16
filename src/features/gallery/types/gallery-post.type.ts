export type GalleryPost = {
  id: number;
  imageUrl: string;
  title: string;
  date: string;
  imageCount?: number;
};

export interface GalleryPostsPage {
  posts: GalleryPost[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface GalleryPostDetail {
    id: number;
    title: string;
    description: string;
    date: string;
    images: string[];
}
