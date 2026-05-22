import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface RotatingBackgroundBannerProps {
  images: string[];
  intervalMs?: number;
  className?: string;
}

export default function RotatingBackgroundBanner({
  images,
  intervalMs = 5000,
  className = "",
}: RotatingBackgroundBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const intervalId = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [images.length, intervalMs]);

  if (images.length === 0) return null;

  return (
    <section
      className={`relative h-56 w-full overflow-hidden sm:h-72 lg:h-80 ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/20" />
    </section>
  );
}
