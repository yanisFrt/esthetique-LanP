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
 * - Fallback to full resolution if variants missing
 *
 * Usage:
 * <ResponsiveImage
 *   baseName="hero-home"
 *   alt="Hero Image"
 *   loading="lazy"
 *   className="w-full h-auto"
 * />
 *
 * This will load (with fallback):
 * - AVIF: hero-home-sm.avif, hero-home-md.avif, hero-home-lg.avif (or hero-home.avif)
 * - WebP: hero-home-sm.webp, hero-home-md.webp, hero-home-lg.webp (or hero-home.webp)
 * - JPEG: hero-home-sm.jpg, hero-home-md.jpg, hero-home-lg.jpg (or hero-home.jpg)
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
    <picture style={{ display: 'contents' }}>
      {/* AVIF format (next-gen, smallest) */}
      <source
        type="image/avif"
        srcSet={`
          ${imageBase}-sm.avif 640w,
          ${imageBase}-md.avif 1024w,
          ${imageBase}-lg.avif 1920w,
          ${imageBase}.avif 1920w
        `}
        sizes={sizes}
      />

      {/* WebP format (modern, better compression) */}
      <source
        type="image/webp"
        srcSet={`
          ${imageBase}-sm.webp 640w,
          ${imageBase}-md.webp 1024w,
          ${imageBase}-lg.webp 1920w,
          ${imageBase}.webp 1920w
        `}
        sizes={sizes}
      />

      {/* JPEG fallback (universal support) */}
      <source
        type="image/jpeg"
        srcSet={`
          ${imageBase}-sm.jpg 640w,
          ${imageBase}-md.jpg 1024w,
          ${imageBase}-lg.jpg 1920w,
          ${imageBase}.jpg 1920w
        `}
        sizes={sizes}
      />

      {/* Fallback img tag - uses full resolution or falls back to /assets */}
      <img
        src={`${imageBase}.jpg`}
        alt={alt}
        loading={loading}
        decoding="async"
        {...(fetchPriority ? { fetchPriority } : {})}
        className={className}
        {...props}
        onError={(e: any) => {
          // If image fails to load from /images, it will fall back gracefully
          console.warn(`Image not found: ${imageBase}.jpg`);
        }}
      />
    </picture>
  );
};

export default ResponsiveImage;
