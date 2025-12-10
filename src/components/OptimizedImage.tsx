import { imgHTMLAttributes, useRef, useEffect, useState } from "react";

interface OptimizedImageProps extends imgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
  loading?: "lazy" | "eager";
  placeholderColor?: string;
}

/**
 * OptimizedImage Component
 *
 * Features:
 * - Native lazy loading with IntersectionObserver fallback
 * - Async decoding to prevent blocking
 * - Proper alt text for accessibility
 * - Support for srcSet and sizes for responsive images
 * - Blur-up placeholder effect
 *
 * Usage:
 * <OptimizedImage
 *   src={image}
 *   alt="Description"
 *   loading="lazy"
 *   sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
 * />
 */
export const OptimizedImage = ({
  src,
  alt,
  srcSet,
  sizes,
  loading = "lazy",
  placeholderColor = "#e5e7eb",
  className,
  ...props
}: OptimizedImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(loading === "eager" ? src : "");

  useEffect(() => {
    if (loading === "eager") {
      return;
    }

    const img = imgRef.current;
    if (!img) return;

    // Use IntersectionObserver for lazy loading
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer.unobserve(entry.target);
          }
        },
        {
          rootMargin: "50px", // Start loading 50px before visible
        }
      );

      observer.observe(img);
      return () => observer.disconnect();
    } else {
      // Fallback for browsers without IntersectionObserver
      setImageSrc(src);
    }
  }, [src, loading]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={loading}
      decoding="async"
      onLoad={() => setIsLoaded(true)}
      className={`${
        isLoaded ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300 ${className || ""}`}
      style={{
        backgroundColor: !isLoaded ? placeholderColor : "transparent",
        ...props.style,
      }}
      {...props}
    />
  );
};

export default OptimizedImage;
