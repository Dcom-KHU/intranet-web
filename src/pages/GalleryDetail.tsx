import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Card from "../components/ui/Card";
import Loading from "../components/Loading";
import { Button } from "../components/ui/Button";
import useAuth from "../features/auth/hooks/useAuth";
import { useGalleryDetail } from "../features/gallery/hooks/useGalleryDetail";
import { galleryComments } from "../mocks/gallery-comments.mock";
import { type GalleryComment } from "../features/gallery/types/gallery-post.type";
import { AnimatePresence, motion } from "framer-motion";

const GalleryDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const galleryId = Number(id);
  const { currentUser } = useAuth();
  const { data, loading } = useGalleryDetail(galleryId);
  const [activeIndex, setActiveIndex] = useState(0);
  const [comments, setComments] = useState<GalleryComment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAdmin = currentUser?.role === "ADMIN";
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setComments(
      galleryComments.filter((comment) => comment.galleryId === galleryId),
    );
  }, [galleryId]);

  const handleCommentSubmit = async (
    event?: FormEvent<HTMLFormElement>
  ) => {
    event?.preventDefault();

    const content = commentText.trim();

    if (!content || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 서버 전송 시늉
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setComments((currentComments) => [
        ...currentComments,
        {
          id: Date.now(),
          galleryId,
          authorName: currentUser?.name ?? "익명",
          content,
          createdAt: "방금 전",
        },
      ]);

      setCommentText("");
      setIsCommenting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = (commentId: number) => {
    setComments((currentComments) =>
      currentComments.filter((comment) => comment.id !== commentId),
    );
  };

  const handleCommenting = () => {
    setIsCommenting(true);
  }

  const handleCancleCommenting = () => {
    setIsCommenting(false);
  }


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

      <section className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#4988C4] whitespace-nowrap">댓글</h2>
            <span className="flex size-5 items-center justify-center rounded-full bg-[#4988C4] text-xs text-white">
              {comments.length}
            </span>
          </div>
          {isCommenting?
            <Button 
              type="submit" 
              variant="third" 
              onClick={() => handleCommentSubmit()} 
              disabled={isSubmitting}
              className="w-20"
            >
              작성 완료
            </Button>
          :
            <Button 
              type="submit" 
              variant="third" 
              onClick={handleCommenting} 
              className="w-20"
            >
              댓글 작성
            </Button>
          }
          
        </div>
        

        <div className="space-y-3">
          <AnimatePresence>
          {isCommenting && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="relative mt-5 flex flex-col gap-3 sm:flex-row"
              onSubmit={handleCommentSubmit}
            >
              <textarea
                value={commentText}
                placeholder="댓글을 입력하세요"
                className="min-h-20 flex-1 resize-none rounded-xl border border-gray-200 px-4 py-3 pr-10 text-sm outline-none transition-colors placeholder:text-gray-300 focus:border-[#4988C4]"
                onChange={(event) => setCommentText(event.target.value)}
              />
              <HiOutlineTrash size={18} onClick={handleCancleCommenting} className="absolute right-4 top-4 cursor-pointer text-black/25"/>
              
            </motion.form>
          )}
          </AnimatePresence>

          {comments.length === 0 ? (
            <p className="rounded-xl border border-gray-200 px-4 py-6 text-center text-sm text-gray-400">
              아직 작성된 댓글이 없습니다.
            </p>
          ) : (
            <AnimatePresence>
            {comments.map((comment) => (
              <motion.article
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
                layout
                className="rounded-xl border border-gray-200 bg-white px-4 py-3"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#0F2854]">
                      {comment.authorName}
                    </p>
                    <p className="text-xs text-gray-400">{comment.createdAt}</p>
                  </div>

                  {isAdmin && (
                    <HiOutlineTrash 
                      size={18} 
                      className="text-black/25 cursor-pointer"
                      onClick={() => handleDeleteComment(comment.id)}
                    />
                  )}
                </div>

                <p className="whitespace-pre-line text-sm leading-6 text-gray-700">
                  {comment.content}
                </p>
              </motion.article>
            ))}
            </AnimatePresence>
          )}
        </div>


        
        
      </section>
    </div>
  );
};

export default GalleryDetail;
