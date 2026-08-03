import {
  useEffect,
  useState,
  type ImgHTMLAttributes,
  type MouseEventHandler,
} from "react";
import { api } from "@/api/client";
import dcomLogo from "../../assets/dcom-logo-black.png";

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
  className = "",
  ...imageProps
}: AuthenticatedImageProps) => {
  const [image, setImage] = useState<AuthenticatedImageState | null>(null);
  const imageSrc = image?.source === src ? image.objectUrl : "";
  const { onClick, ...restImageProps } = imageProps;
  const handleClick = onClick as
    | MouseEventHandler<HTMLSpanElement>
    | undefined;

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
    <span
      className={`relative block overflow-hidden bg-white ${className}`}
      onClick={handleClick}
    >
      {!imageSrc && (
        <span className="absolute inset-0 flex items-center justify-center">
          <img
            src={dcomLogo}
            alt=""
            aria-hidden="true"
            className="w-1/3 max-w-28 object-contain opacity-50"
          />
        </span>
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className="h-full w-full object-cover"
          {...restImageProps}
        />
      )}
    </span>
  );
};

export default AuthenticatedImage;
