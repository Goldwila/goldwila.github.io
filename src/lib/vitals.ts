import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

/**
 * Web Vitals are key metrics that measure user experience:
 * - CLS (Cumulative Layout Shift): Measures visual stability. Target: < 0.1
 * - INP (Interaction to Next Paint): Measures responsiveness. Target: < 200ms
 * - FCP (First Contentful Paint): Measures perceived load. Target: < 1.8s
 * - LCP (Largest Contentful Paint): Measures visual completeness. Target: < 2.5s
 * - TTFB (Time to First Byte): Measures server response. Target: < 600ms
 */

export const reportWebVitals = () => {
  // Metrics collected silently for analytics/monitoring
  onCLS(() => {});
  onINP(() => {});
  onFCP(() => {});
  onLCP(() => {});
  onTTFB(() => {});
};
