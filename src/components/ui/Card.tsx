import type { ReactNode } from "react";
import { IoCalendarOutline, IoLocationOutline } from "react-icons/io5";
import { HiPhotograph } from "react-icons/hi";
import AuthenticatedImage from "./AuthenticatedImage";
import RichTextContent from "./RichTextContent";


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
  location?: string;
  actions?: ReactNode;
  children: ReactNode;
  imageUrl?: never;
  imageCount?: never;
};

type CardProps = GalleryCardProps | DetailCardProps;

const Card = (props: CardProps) => {
  if (props.variant === "detail") {
    const {
      title,
      date,
      location,
      description,
      actions,
      children,
      onClick,
    } = props;

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
            {location && (
              <span className="flex items-center gap-1">
                <IoLocationOutline size={14} />
                {location}
              </span>
            )}
          </div>

          {description && (
            <RichTextContent
              html={description}
              className="mt-7 text-[#0F2854]"
            />
          )}

          {actions && (
            <div className="mt-6 flex items-center justify-end gap-3">
              {actions}
            </div>
          )}
        </div>
      </article>
    );
  }

  const { imageUrl, title, date, imageCount, onClick } = props;

  return (
    <article
      onClick={onClick}
      className="overflow-hidden rounded-xl border bg-white cursor-pointer transition-all hover:shadow-md"
    >
      <div className="relative aspect-[4/2.5] overflow-hidden">
        <AuthenticatedImage
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover"
        />

        {imageCount !== undefined && (
          <span className="absolute flex justify-center items-center gap-1 bottom-2 right-2 rounded-xl bg-black/20 px-2 py-0.5 text-xs text-white/80 outline outline-1">
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
