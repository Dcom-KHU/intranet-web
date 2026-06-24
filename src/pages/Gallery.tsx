import { useNavigate } from "react-router-dom";
import { HiUpload } from "react-icons/hi";

import Card from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import useAuth from "../features/auth/hooks/useAuth";
import { galleryPosts } from "../mocks/gallery.mock";

const Gallery = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === "ADMIN";

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

      {isAdmin && (
        <section className="mb-4 flex justify-end">
          <Button
            type="button"
            variant="third"
            className="flex w-40 items-center justify-center gap-2 text-xs"
            onClick={() => navigate("/gallery/upload")}
          >
            <HiUpload />
            UPLOAD
          </Button>
        </section>
      )}

      <section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {galleryPosts.map((post) => (
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
      </section>

      <nav
        aria-label="활동 사진 페이지"
        className="mt-10 flex items-center justify-center gap-1 text-xs"
      >
        <button
          type="button"
          className="flex size-5 items-center justify-center rounded border border-gray-200 text-gray-300"
          aria-label="이전 페이지"
        >
          &lt;
        </button>
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            type="button"
            className={`flex size-5 items-center justify-center rounded border ${
              page === 1
                ? "border-[#4988C4] bg-[#4988C4] text-white"
                : "border-gray-200 text-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          className="flex size-5 items-center justify-center rounded border border-gray-200 text-gray-300"
          aria-label="다음 페이지"
        >
          &gt;
        </button>
      </nav>
    </div>
  );
};

export default Gallery;
