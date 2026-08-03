import { useEffect, useState, type ImgHTMLAttributes } from "react";
import { api } from "@/api/client";

type AuthenticatedImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
};

type AuthenticatedImageState = {
  source: string;
  objectUrl: string;
};

const AuthenticatedImage = ({
  src,
  alt,
  ...imageProps
}: AuthenticatedImageProps) => {
  const [image, setImage] = useState<AuthenticatedImageState | null>(null);

  useEffect(() => {
    if (!src) return;

    let nextObjectUrl = "";
    let isMounted = true;

    api.get<Blob>(src, { responseType: "blob" })
      .then((response) => {
        if (!isMounted) return;

        nextObjectUrl = URL.createObjectURL(response.data);
        setImage({ source: src, objectUrl: nextObjectUrl });
      })
      .catch((error) => {
        if (!isMounted) return;

        console.error("인증 이미지 로드 실패:", error);
      });

    return () => {
      isMounted = false;

      if (nextObjectUrl) {
        URL.revokeObjectURL(nextObjectUrl);
      }
    };
  }, [src]);

  return (
    <img
      src={image?.source === src ? image.objectUrl : ""}
      alt={alt}
      {...imageProps}
    />
  );
};

export default AuthenticatedImage;
