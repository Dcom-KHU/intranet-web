import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Card from "../components/ui/Card";
import Loading from "../components/Loading";
import { useGalleryDetail } from "../features/gallery/hooks/useGalleryDetail";

const GalleryDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading } = useGalleryDetail(Number(id));
  const [activeIndex, setActiveIndex] = useState(0);

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  if (loading) return <Loading />;

  if (!data) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-20">
        <button
          type="button"
          className="mb-4 text-sm text-gray-400 transition-colors hover:text-[#4988C4]"
          onClick={() => navigate("/gallery")}
        >
          &lt; 갤러리로 돌아가기
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

      <h1 className="mb-6 text-xl font-bold text-[#4988C4]">활동 사진</h1>

      <Card
        variant="detail"
        title={data.title}
        date={data.date}
        description={data.description}
      >
        <div className="relative">
          <button
            ref={prevRef}
            type="button"
            aria-label="이전 사진"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 p-2 text-white/80 transition-colors hover:text-white"
          >
            <HiChevronLeft size={36} />
          </button>

          <button
            ref={nextRef}
            type="button"
            aria-label="다음 사진"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 p-2 text-white/80 transition-colors hover:text-white"
          >
            <HiChevronRight size={36} />
          </button>

          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              if (
                swiper.params.navigation &&
                typeof swiper.params.navigation !== "boolean"
              ) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
            pagination={{ clickable: true }}
            loop
            spaceBetween={20}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {data.images.map((image, index) => (
              <SwiperSlide key={`${image}-${index}`}>
                <img
                  src={image}
                  alt={`${data.title} ${index + 1}`}
                  className="h-[260px] w-full object-cover sm:h-[340px] lg:h-[420px]"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <span className="absolute bottom-4 right-4 rounded-full bg-black/40 px-3 py-1 text-xs text-white">
            {activeIndex + 1} / {data.images.length}
          </span>
        </div>
      </Card>
    </div>
  );
};

export default GalleryDetail;
