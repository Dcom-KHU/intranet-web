import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiChevronLeft, HiChevronRight, HiOutlinePencil } from "react-icons/hi";
import { FiChevronLeft } from "react-icons/fi";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Card from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import Loading from "../../components/Loading";
import useAuth from "../../features/auth/hooks/useAuth";
import CommentSection from "../../features/comment/components/CommentSection";
import { useGalleryDetail } from "../../features/gallery/hooks/useGalleryDetail";

const GalleryDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const postId = Number(id);
  const { data: gallery, loading } = useGalleryDetail(postId);
  const { currentUser } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);

  if (loading) return <Loading />;

  if (!gallery) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-20">
        <button
          type="button"
          className="mb-4 flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-[#4988C4]"
          onClick={() => navigate("/gallery")}
        >
          <FiChevronLeft /> 갤러리로 돌아가기
        </button>
        <p className="text-sm text-gray-500">활동 사진을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-20">
      <button
        type="button"
        className="mb-4 text-sm text-gray-400 transition-colors hover:text-[#4988C4]"
        onClick={() => navigate("/gallery")}
      >
        &lt; 갤러리로 돌아가기
      </button>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#4988C4]">활동 사진</h1>
        {currentUser?.role === "ADMIN" && (
          <Button
            type="button"
            variant="third"
            className="flex w-20 items-center justify-center gap-1"
            onClick={() => navigate(`/gallery/${postId}/edit`)}
          >
            <HiOutlinePencil size={15} /> 수정
          </Button>
        )}
      </div>

      <Card
        variant="detail"
        title={gallery.title}
        date={gallery.date}
        description={gallery.description}
      >
        <div className="relative">
          <button
            type="button"
            aria-label="이전 사진"
            className="gallery-prev absolute left-3 top-1/2 z-10 -translate-y-1/2 p-2 text-white/80 transition-colors hover:text-white"
          >
            <HiChevronLeft size={36} />
          </button>

          <button
            type="button"
            aria-label="다음 사진"
            className="gallery-next absolute right-3 top-1/2 z-10 -translate-y-1/2 p-2 text-white/80 transition-colors hover:text-white"
          >
            <HiChevronRight size={36} />
          </button>

          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: ".gallery-prev",
              nextEl: ".gallery-next",
            }}
            pagination={{ clickable: true }}
            loop
            spaceBetween={20}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {gallery.images.map((image, index) => (
              <SwiperSlide key={`${image}-${index}`}>
                <img
                  src={image}
                  alt={`${gallery.title} ${index + 1}`}
                  className="h-[260px] w-full object-cover sm:h-[340px] lg:h-[420px]"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <span className="absolute bottom-4 right-4 rounded-full bg-black/40 px-3 py-1 text-xs text-white">
            {activeIndex + 1} / {gallery.images.length}
          </span>
        </div>
      </Card>

      <CommentSection postId={postId} target="gallery" />
    </div>
  );
};

export default GalleryDetail;
