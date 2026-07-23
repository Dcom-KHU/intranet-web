import { useEffect, useState } from "react";
import { getGalleryPosts } from "../api/gallery.api";
import { type GalleryPost, type GalleryPostsPage } from "../types/gallery-post.type";

// 활동사진 전체 조회
export const useGallery = (page = 0, size = 8, keyword = "") => {
    const [data, setData] = useState<GalleryPost[]>([]);
    const [pageInfo, setPageInfo] = useState<Omit<GalleryPostsPage, "posts">>({
        page: 0,
        size,
        totalElements: 0,
        totalPages: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        getGalleryPosts(page, size, keyword.trim() || undefined)
            .then(({ posts, ...nextPageInfo }) => {
                setData(posts);
                setPageInfo(nextPageInfo);
                setError("");
            })
            .catch(() => setError("활동 사진을 불러오지 못했습니다."))
            .finally(() => setLoading(false));
    }, [keyword, page, size]);

    return { data, pageInfo, loading, error };
};
