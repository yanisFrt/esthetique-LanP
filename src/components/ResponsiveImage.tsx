import { ImgHTMLAttributes } from "react";

interface ResponsiveImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  baseName: string; // Image name without extension (e.g., "hero-home")
  loading?: "lazy" | "eager";
  priority?: boolean;
}

/**
 * Advanced Responsive Image Component
 *
 * Automatically generates picture element with:
 * - AVIF (next-gen format, smallest file)
 * - WebP (modern format, better compression)
 * - JPEG fallback (universal support)
 * - Multiple responsive sizes (640px, 1024px, 1920px)
 * - Native lazy loading
 * - Async decoding
 *
 * Usage:
 * <ResponsiveImage
 *   baseName="hero-home"
 *   alt="Hero Image"
 *   loading="lazy"
 *   className="w-full h-auto"
 * />
 *
 * This will load:
 * - AVIF: hero-home-sm.avif, hero-home-md.avif, hero-home-lg.avif
 * - WebP: hero-home-sm.webp, hero-home-md.webp, hero-home-lg.webp
 * - JPEG: hero-home-sm.jpg, hero-home-md.jpg, hero-home-lg.jpg
 */
export const ResponsiveImage = ({
  baseName,
  alt,
  loading = "lazy",
  priority = false,
  className,
  ...props
}: ResponsiveImageProps) => {
  const imageBase = `/images/${baseName}`;

  // Responsive sizes for different breakpoints
  const sizes =
    "(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px";

  // Priority images load eagerly with fetchpriority
  const fetchPriority = priority ? "high" : "auto";

  return (
    <picture>
      {/* AVIF format (next-gen, smallest) */}
      <source
        type="image/avif"
        srcSet={`
          ${imageBase}-sm.avif 640w,
          ${imageBase}-md.avif 1024w,
          ${imageBase}-lg.avif 1920w
        `}
        sizes={sizes}
      />

      {/* WebP format (modern, better compression) */}
      <source
        type="image/webp"
        srcSet={`
          ${imageBase}-sm.webp 640w,
          ${imageBase}-md.webp 1024w,
          ${imageBase}-lg.webp 1920w
        `}
        sizes={sizes}
      />

      {/* JPEG fallback (universal support) */}
      <source
        type="image/jpeg"
        srcSet={`
          ${imageBase}-sm.jpg 640w,
          ${imageBase}-md.jpg 1024w,
          ${imageBase}-lg.jpg 1920w
        `}
        sizes={sizes}
      />

      {/* Fallback img tag */}
      <img
        src={`${imageBase}.jpg`}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority as any}
        className={className}
        {...props}
      />
    </picture>
  );
};

export default ResponsiveImage;
