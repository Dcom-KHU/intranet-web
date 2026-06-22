import type { ReactNode } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { HiPhotograph } from "react-icons/hi";


type BaseCardProps = {
  title: string;
  date: string;
  onClick?: () => void;
};

type GalleryCardProps = BaseCardProps & {
  variant?: "gallery";
  imageUrl: string;
  imageCount?: number;
};

type DetailCardProps = BaseCardProps & {
  variant: "detail";
  description?: string;
  children: ReactNode;
  imageUrl?: never;
  imageCount?: never;
};

type CardProps = GalleryCardProps | DetailCardProps;

const Card = (props: CardProps) => {
  if (props.variant === "detail") {
    const { title, date, description, children, onClick } = props;

    return (
      <article
        onClick={onClick}
        className="overflow-hidden rounded-xl border bg-white"
      >
        {children}

        <div className="px-5 py-6 sm:px-7">
          <h2 className="text-lg font-bold text-[#0F2854]">{title}</h2>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <IoCalendarOutline size={14} />
              {date}
            </span>
          </div>

          {description && (
            <p className="mt-7 whitespace-pre-line text-sm leading-6 text-[#0F2854]">
              {description}
            </p>
          )}
        </div>
      </article>
    );
  }

  const { imageUrl, title, date, imageCount, onClick } = props;

  return (
    <article
      onClick={onClick}
      className="overflow-hidden rounded-xl border bg-white cursor-pointer transition hover:shadow-md"
    >
      <div className="relative aspect-[4/2.5] overflow-hidden">
        <img src={imageUrl} alt={title} className="h-full w-full object-cover" />

        {imageCount !== undefined && (
          <span className="absolute flex justify-center items-center gap-1 bottom-2 right-2 rounded-xl bg-black/30 px-2 py-0.5 text-xs text-[#E0E0E0] outline outline-1">
            <HiPhotograph />
            {imageCount}
          </span>
        )} 
      </div>

      <div className="px-4 py-3">
        <h2 className="truncate text-sm font-semibold text-[#0F2854]">
          {title}
        </h2>
        <p className="mt-2 text-right text-xs text-gray-400">{date}</p>
      </div>
    </article>
  );
};

export default Card;
