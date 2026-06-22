type CardProps = {
  imageUrl: string;
  title: string;
  date: string;
  imageCount?: number;
  onClick?: () => void;
};

const Card = ({ imageUrl, title, date, imageCount, onClick }: CardProps) => {
  return (
    <article
      onClick={onClick}
      className="overflow-hidden rounded-xl border bg-white cursor-pointer transition hover:shadow-md"
    >
      <div className="relative aspect-[4/2.5] overflow-hidden">
        <img src={imageUrl} alt={title} className="h-full w-full object-cover" />

        {imageCount !== undefined && (
          <span className="absolute bottom-2 right-2 rounded bg-black/40 px-2 py-0.5 text-xs text-white">
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