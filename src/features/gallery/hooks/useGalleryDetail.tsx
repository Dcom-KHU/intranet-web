import { useEffect, useState } from "react";
import { getGalleryById } from "../api/gallery.api";
import { type GalleryPostDetail } from "../types/gallery-post.type";

export const useGalleryDetail = (id: number) => {
  const [data, setData] = useState<GalleryPostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    getGalleryById(id)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [id]);

  return {
    data,
    loading,
    error,
  };
};