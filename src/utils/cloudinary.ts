/**
 * Cloudinary Image Optimization Utility
 *
 * This utility provides functions to generate optimized image URLs
 * using Cloudinary's on-the-fly image transformation service.
 *
 * Features:
 * - Automatic format selection (WebP/AVIF with fallback)
 * - Responsive image resizing
 * - Quality optimization
 * - Lazy loading support
 *
 * Setup:
 * 1. Create free Cloudinary account: https://cloudinary.com/users/register/free
 * 2. Set VITE_CLOUDINARY_NAME in .env:
 *    VITE_CLOUDINARY_NAME=your_cloud_name
 * 3. Upload images to Cloudinary dashboard or use auto-upload
 */

const CLOUDINARY_NAME = import.meta.env.VITE_CLOUDINARY_NAME;

interface CloudinaryTransform {
  width?: number;
  height?: number;
  quality?: number;
  format?: string;
  gravity?: string;
  crop?: string;
  fetch_format?: "auto" | "webp" | "jpg" | "png";
}

/**
 * Generate a Cloudinary image URL with transformations
 * @param publicId - Image public ID in Cloudinary
 * @param transforms - Transformation options
 * @returns Optimized image URL
 */
export function getCloudinaryUrl(
  publicId: string,
  transforms?: CloudinaryTransform
): string {
  if (!CLOUDINARY_NAME) {
    console.warn(
      "VITE_CLOUDINARY_NAME not configured. Using local images instead."
    );
    return publicId;
  }

  const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_NAME}/image/upload/`;

  // Build transformation string
  const transformations = [];

  if (transforms) {
    if (transforms.quality) {
      transformations.push(`q_${transforms.quality}`);
    }
    if (transforms.width) {
      transformations.push(`w_${transforms.width}`);
    }
    if (transforms.height) {
      transformations.push(`h_${transforms.height}`);
    }
    if (transforms.crop) {
      transformations.push(`c_${transforms.crop}`);
    }
    if (transforms.gravity) {
      transformations.push(`g_${transforms.gravity}`);
    }
    // Fetch format auto selects best format (WebP, AVIF with fallback)
    transformations.push("f_auto");
  } else {
    transformations.push("f_auto");
    transformations.push("q_80");
  }

  const transformationString =
    transformations.length > 0 ? transformations.join(",") + "/" : "";

  return baseUrl + transformationString + publicId;
}

/**
 * Get responsive srcSet for different screen sizes
 * @param publicId - Image public ID in Cloudinary
 * @param baseQuality - Base quality (default 80)
 * @returns srcSet string for img tag
 */
export function getResponsiveSrcSet(
  publicId: string,
  baseQuality = 80
): string {
  if (!CLOUDINARY_NAME) {
    return publicId;
  }

  const breakpoints = [
    { width: 320, descriptor: "320w" },
    { width: 640, descriptor: "640w" },
    { width: 1024, descriptor: "1024w" },
    { width: 1280, descriptor: "1280w" },
    { width: 1920, descriptor: "1920w" },
  ];

  return breakpoints
    .map(({ width, descriptor }) => {
      const url = getCloudinaryUrl(publicId, {
        width,
        quality: baseQuality,
      });
      return `${url} ${descriptor}`;
    })
    .join(", ");
}

/**
 * Get sizes attribute for responsive images
 * Helps browser choose correct image size
 */
export function getResponsiveSizes(): string {
  return "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
}

/**
 * Generate picture element HTML with multiple formats
 * Falls back gracefully for older browsers
 */
export function getPictureElement(
  publicId: string,
  alt: string,
  className?: string
): string {
  const webpUrl = getCloudinaryUrl(publicId, {
    quality: 75,
  });
  const jpgUrl = getCloudinaryUrl(publicId, {
    quality: 80,
    format: "jpg",
  });

  return `
    <picture>
      <source srcSet="${getResponsiveSrcSet(publicId, 75)}" type="image/webp">
      <source srcSet="${getResponsiveSrcSet(publicId, 80)}" type="image/jpeg">
      <img
        src="${jpgUrl}"
        alt="${alt}"
        class="${className || ''}"
        loading="lazy"
        decoding="async"
      >
    </picture>
  `;
}

/**
 * Example usage:
 *
 * // Simple optimized URL
 * const url = getCloudinaryUrl('sample.jpg', { width: 800, quality: 85 });
 *
 * // Responsive image with srcSet
 * const srcSet = getResponsiveSrcSet('sample.jpg');
 * <img src={url} srcSet={srcSet} sizes={getResponsiveSizes()} alt="..." />
 *
 * // Picture element for modern formats
 * <div dangerouslySetInnerHTML={{ __html: getPictureElement('sample.jpg', 'Alt text') }} />
 */
