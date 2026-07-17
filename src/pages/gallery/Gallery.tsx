import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../features/auth/hooks/useAuth";
import { useGallery } from "../../features/gallery/hooks/useGallery";

import { HiUpload } from "react-icons/hi";

import Card from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import Pagination from "../../components/ui/Pagination";
import Loading from "../../components/Loading";


const ITEMS_PER_PAGE = 8;

const Gallery = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === "ADMIN";

  const [page, setPage] = useState(0);
  const { data: gallery, pageInfo, loading, error } = useGallery(
    page,
    ITEMS_PER_PAGE,
  );

  if (loading) return <Loading />;

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-20">
      <section className="mb-10">
        <h1 className="text-xl font-bold text-[#4988C4]">
          활동 사진 갤러리
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          D.COM의 소중한 추억을 확인해보세요
        </p>
      </section>

      <section className="mb-12 flex items-center justify-end gap-4">
        {isAdmin && (
            <Button
              type="button"
              variant="third"
              className="flex w-40 items-center justify-center gap-2 text-sm"
              onClick={() => navigate("/gallery/upload")}
            >
              <HiUpload />
              UPLOAD
            </Button>
        )}
      </section>


      <section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {gallery.map((post) => (
            <Card
              key={post.id}
              imageUrl={post.imageUrl}
              title={post.title}
              date={post.date}
              imageCount={post.imageCount}
              onClick={() => navigate(`/gallery/${post.id}`)}
            />
          ))}
        </div>
        {error && (
          <p className="py-10 text-center text-sm text-red-500">{error}</p>
        )}
      </section>

      <Pagination
        currentPage={pageInfo.page + 1}
        totalPages={pageInfo.totalPages}
        onPageChange={(nextPage) => setPage(nextPage - 1)}
        ariaLabel="활동 사진 페이지"
        className="mt-10"
      />
    </div>
  );
};

export default Gallery;
