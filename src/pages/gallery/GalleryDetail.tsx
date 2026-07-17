import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiChevronLeft, HiChevronRight, HiOutlinePencil } from "react-icons/hi";
import { GoTrash } from "react-icons/go";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Card from "../../components/ui/Card";
import Loading from "../../components/Loading";
import useAuth from "../../features/auth/hooks/useAuth";
import CommentSection from "../../features/comment/components/CommentSection";
import { useGalleryDetail } from "../../features/gallery/hooks/useGalleryDetail";
import PageBackButton from "../../components/ui/PageBackButton";
import { deleteGalleryPost } from "../../features/gallery/api/gallery.api";
import ConfirmDeleteModal from "../../components/ui/ConfirmDeleteModal";


const GalleryDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const postId = Number(id);
  const { data: gallery, loading, error } = useGalleryDetail(postId);
  const { currentUser } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteGalleryPost(postId);
      navigate("/gallery");
    } catch (deleteError) {
      console.error("활동 사진 삭제 실패:", deleteError);
      window.alert("활동 사진 삭제에 실패했습니다.");
      setIsDeleting(false);
    }
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <p className="px-4 py-16 text-center text-sm text-red-500">
        사진첩 상세 정보를 불러오지 못했습니다.
      </p>
    );
  }

  if (!gallery) {
    return (
      <div>
        <PageBackButton 
          onClick={() => navigate('/gallery')}
        />
        <p className="text-sm text-gray-500">활동 사진을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-20">
      <PageBackButton 
        onClick={() => navigate('/gallery')}
      />

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#4988C4]">활동 사진</h1>
      </div>

      <div className="relative">
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

        {currentUser?.role === "ADMIN" && (
          <div className="absolute bottom-6 right-6 flex items-center gap-3">
            <button
              type="button"
              aria-label="활동 사진 수정"
              className="text-gray-400 hover:text-[#4988C4]"
              onClick={() => navigate(`/gallery/${postId}/edit`)}
            >
              <HiOutlinePencil size={16} />
            </button>
            <button
              type="button"
              aria-label="활동 사진 삭제"
              disabled={isDeleting}
              className="text-gray-400 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <GoTrash size={16} />
            </button>
          </div>
        )}
      </div>

      <CommentSection postId={postId} target="photo-posts" />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        description="삭제한 활동 사진 게시글은 복구할 수 없습니다."
        isDeleting={isDeleting}
        onConfirm={() => void handleDelete()}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default GalleryDetail;
