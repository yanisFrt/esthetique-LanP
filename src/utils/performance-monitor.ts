/**
 * Performance Monitoring Utility
 *
 * Tracks and reports on image loading performance
 * and overall web vitals for optimization validation
 */

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  threshold: number;
  status: "good" | "warning" | "poor";
}

interface ImageLoadMetrics {
  imageName: string;
  loadTime: number;
  size: number;
  sizeCategory: "small" | "medium" | "large";
}

export class PerformanceMonitor {
  private static imageMetrics: ImageLoadMetrics[] = [];
  private static startTime = performance.now();

  /**
   * Track image loading performance
   */
  static trackImageLoad(
    imageName: string,
    size: number,
    loadTime: number
  ): void {
    const sizeCategory =
      size < 100 ? "small" : size < 500 ? "medium" : "large";

    this.imageMetrics.push({
      imageName,
      loadTime,
      size,
      sizeCategory,
    });

    if (import.meta.env.DEV) {
      console.log(
        `📸 Image loaded: ${imageName} (${size}KB in ${loadTime}ms)`
      );
    }
  }

  /**
   * Get Core Web Vitals
   */
  static getWebVitals(): Promise<void> {
    return new Promise((resolve) => {
      if ("PerformanceObserver" in window) {
        try {
          // Largest Contentful Paint (LCP)
          new PerformanceObserver((list: any) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log("📊 LCP:", lastEntry.renderTime || lastEntry.loadTime);
          }).observe({ entryTypes: ["largest-contentful-paint"] });

          // First Input Delay (FID)
          new PerformanceObserver((list: any) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              console.log("📊 FID:", entry.processingDuration);
            });
          }).observe({ entryTypes: ["first-input"] });

          // Cumulative Layout Shift (CLS)
          let clsValue = 0;
          new PerformanceObserver((list: any) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
                console.log("📊 CLS:", clsValue);
              }
            });
          }).observe({ entryTypes: ["layout-shift"] });

          setTimeout(() => resolve(), 5000);
        } catch (e) {
          resolve();
        }
      } else {
        resolve();
      }
    });
  }

  /**
   * Get page load metrics
   */
  static getPageMetrics(): PerformanceMetric[] {
    const metrics: PerformanceMetric[] = [];

    const navigationTiming = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;

    if (navigationTiming) {
      // Time to First Byte
      const ttfb = navigationTiming.responseStart - navigationTiming.fetchStart;
      metrics.push({
        name: "TTFB",
        value: ttfb,
        unit: "ms",
        threshold: 600,
        status: ttfb < 600 ? "good" : "poor",
      });

      // First Contentful Paint
      const fcp = navigationTiming.responseEnd - navigationTiming.fetchStart;
      metrics.push({
        name: "FCP",
        value: fcp,
        unit: "ms",
        threshold: 1800,
        status: fcp < 1800 ? "good" : "poor",
      });

      // DOM Content Loaded
      const dcl = navigationTiming.domContentLoadedEventEnd - navigationTiming.fetchStart;
      metrics.push({
        name: "DCL",
        value: dcl,
        unit: "ms",
        threshold: 2000,
        status: dcl < 2000 ? "good" : "warning",
      });

      // Page Load Complete
      const loadComplete = navigationTiming.loadEventEnd - navigationTiming.fetchStart;
      metrics.push({
        name: "Load Complete",
        value: loadComplete,
        unit: "ms",
        threshold: 3000,
        status: loadComplete < 3000 ? "good" : "warning",
      });
    }

    return metrics;
  }

  /**
   * Get image metrics summary
   */
  static getImageMetricsSummary() {
    if (this.imageMetrics.length === 0) {
      return { message: "No images tracked yet" };
    }

    const totalSize = this.imageMetrics.reduce((acc, m) => acc + m.size, 0);
    const totalTime = this.imageMetrics.reduce((acc, m) => acc + m.loadTime, 0);
    const avgSize = totalSize / this.imageMetrics.length;
    const avgTime = totalTime / this.imageMetrics.length;

    return {
      imageCount: this.imageMetrics.length,
      totalSize: `${(totalSize / 1024).toFixed(2)} MB`,
      averageSize: `${avgSize.toFixed(2)} KB`,
      totalLoadTime: `${totalTime.toFixed(0)} ms`,
      averageLoadTime: `${avgTime.toFixed(0)} ms`,
      largeImages: this.imageMetrics.filter(
        (m) => m.sizeCategory === "large"
      ).length,
    };
  }

  /**
   * Report performance summary
   */
  static reportPerformance(): void {
    if (!import.meta.env.DEV) return;

    console.log("\n%c⚡ PERFORMANCE REPORT", "font-size: 16px; font-weight: bold");
    console.log("%c" + "═".repeat(50), "color: #666");

    console.log("\n📊 Page Metrics:");
    const pageMetrics = this.getPageMetrics();
    pageMetrics.forEach((metric) => {
      const emoji = metric.status === "good" ? "✅" : "⚠️";
      console.log(
        `${emoji} ${metric.name}: ${metric.value.toFixed(0)}${metric.unit}`
      );
    });

    console.log("\n📸 Image Metrics:");
    const imageSummary = this.getImageMetricsSummary();
    console.table(imageSummary);

    console.log(
      "\n%c" + "═".repeat(50),
      "color: #666"
    );
  }

  /**
   * Measure specific function performance
   */
  static measureFunction<T>(
    functionName: string,
    fn: () => T
  ): T {
    const start = performance.now();
    const result = fn();
    const duration = performance.now() - start;

    if (import.meta.env.DEV) {
      console.log(`⏱️  ${functionName}: ${duration.toFixed(2)}ms`);
    }

    return result;
  }

  /**
   * Measure async function performance
   */
  static async measureAsync<T>(
    functionName: string,
    fn: () => Promise<T>
  ): Promise<T> {
    const start = performance.now();
    const result = await fn();
    const duration = performance.now() - start;

    if (import.meta.env.DEV) {
      console.log(`⏱️  ${functionName}: ${duration.toFixed(2)}ms`);
    }

    return result;
  }
}

// Auto-report on page load
if (typeof window !== "undefined") {
  window.addEventListener("load", () => {
    setTimeout(() => {
      PerformanceMonitor.reportPerformance();
    }, 1000);
  });
}

export default PerformanceMonitor;
