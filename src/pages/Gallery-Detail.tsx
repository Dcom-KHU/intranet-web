import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "../components/ui/Container";
import { useGalleryDetail } from "../features/gallery/hooks/useGalleryDetail";
import Loading from "../components/Loading";

const GalleryDetail = () => {
  const { id } = useParams();
  const { data, loading } = useGalleryDetail(Number(id));

  const [activeIndex, setActiveIndex] = useState(0);

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  if (loading || !data) return <Loading />;

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-20">
      <Container title="갤러리">
        {/* Swiper Wrapper */}
        <div className="relative">
          {/* LEFT BUTTON */}
          <button
            ref={prevRef}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 p-2 text-white hover:text-black/60"
          >
            <HiChevronLeft size={30} />
          </button>

          {/* RIGHT BUTTON */}
          <button
            ref={nextRef}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 p-2 text-white hover:text-black/60"
          >
            <HiChevronRight size={30} />
          </button>

          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              // 핵심: ref 연결 타이밍 문제 해결
              if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
            pagination={{ clickable: true }}
            loop={true}
            spaceBetween={20}
            onSlideChange={(swiper) =>
              setActiveIndex(swiper.realIndex)
            }
          >
            {data.images.map((image, index) => (
              <SwiperSlide key={`${image}-${index}`}>
                <img
                  src={image}
                  className="h-[500px] w-full rounded-xl object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 제목 / 설명 */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-[#0F2854]">
            {data.title}
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            {data.description}
          </p>

          {/* index 표시 */}
          <div className="mt-2 text-sm text-gray-400 text-right">
            {activeIndex + 1} / {data.images.length}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default GalleryDetail;