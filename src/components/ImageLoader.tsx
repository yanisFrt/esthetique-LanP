import { ImgHTMLAttributes } from "react";

interface ImageLoaderProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string; // Full path or filename (e.g., "hero-home.jpg")
  alt: string;
}

/**
 * Simple image loader component for compressed images from public/images or assets
 * Falls back to assets if public/images path doesn't exist
 */
export const ImageLoader = ({
  src,
  alt,
  className = "",
  ...props
}: ImageLoaderProps) => {
  // Try public/images first, then fall back to assets
  const imageSrc = src.startsWith("/") ? src : `/images/${src}`;

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      {...props}
      onError={(e: any) => {
        // Fallback to asset path if /images doesn't work
        if (!e.target.src.includes("/assets")) {
          const filename = src.split("/").pop();
          e.target.src = `/assets/${filename}`;
        }
      }}
    />
  );
};

export default ImageLoader;
