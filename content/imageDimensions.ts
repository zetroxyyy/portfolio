// ─────────────────────────────────────────────────────────────────────────────
// IMAGE DIMENSIONS — generated from the files in public/images/projects/
//
// next/image needs the true intrinsic size of every asset to reserve the right
// space before it loads. The tall *-full.webp scroll captures vary from 2,464px
// to 9,000px; declaring one hardcoded height for all of them was shifting layout
// on every case study page.
//
// Regenerate whenever an asset is added or re-cropped.
// ─────────────────────────────────────────────────────────────────────────────

export const imageDimensions: Record<string, { width: number; height: number }> = {
  '/images/projects/didee/admin-categories.webp': { width: 2400, height: 1350 },
  '/images/projects/didee/admin-prices.webp': { width: 2400, height: 1350 },
  '/images/projects/didee/admin-products.webp': { width: 2400, height: 1350 },
  '/images/projects/didee/admin-settings.webp': { width: 2400, height: 1350 },
  '/images/projects/didee/cover.webp': { width: 2400, height: 1350 },
  '/images/projects/didee/home-full.webp': { width: 1400, height: 4637 },
  '/images/projects/didee/lookbook.webp': { width: 2400, height: 1350 },
  '/images/projects/didee/menu.webp': { width: 2400, height: 1350 },
  '/images/projects/didee/store.webp': { width: 2400, height: 1350 },
  '/images/projects/dream-adventure/admin-availability.webp': { width: 2400, height: 1350 },
  '/images/projects/dream-adventure/admin-manifest.webp': { width: 2400, height: 1350 },
  '/images/projects/dream-adventure/admin-promotions.webp': { width: 2400, height: 1350 },
  '/images/projects/dream-adventure/admin-revenue.webp': { width: 2400, height: 1350 },
  '/images/projects/dream-adventure/booking.webp': { width: 2400, height: 1350 },
  '/images/projects/dream-adventure/canyoning.webp': { width: 2400, height: 1350 },
  '/images/projects/dream-adventure/cover.webp': { width: 2400, height: 1350 },
  '/images/projects/dream-adventure/home-full.webp': { width: 1400, height: 4428 },
  '/images/projects/dream-adventure/rafting.webp': { width: 2400, height: 1350 },
  '/images/projects/manjushree/about.webp': { width: 2400, height: 1350 },
  '/images/projects/manjushree/contact.webp': { width: 2400, height: 1350 },
  '/images/projects/manjushree/cover.webp': { width: 2400, height: 1350 },
  '/images/projects/manjushree/gallery.webp': { width: 2400, height: 1350 },
  '/images/projects/manjushree/home-full.webp': { width: 1400, height: 2464 },
  '/images/projects/manjushree/services.webp': { width: 2400, height: 1350 },
  '/images/projects/manjushree/team.webp': { width: 2400, height: 1350 },
  '/images/projects/manjushree/why-nepalese.webp': { width: 2400, height: 1350 },
  '/images/projects/mydarlingfood/cover.webp': { width: 2400, height: 1350 },
  '/images/projects/mydarlingfood/products.webp': { width: 2400, height: 1350 },
  '/images/projects/mydarlingfood/shop-full.webp': { width: 1400, height: 2502 },
  '/images/projects/nexus-mcu/catalog.webp': { width: 2400, height: 1350 },
  '/images/projects/nexus-mcu/coming-soon.webp': { width: 2400, height: 1350 },
  '/images/projects/nexus-mcu/cover.webp': { width: 2400, height: 1350 },
  '/images/projects/nexus-mcu/home-full.webp': { width: 1400, height: 5953 },
  '/images/projects/nexus-mcu/timeline-full.webp': { width: 1200, height: 9000 },
  '/images/projects/nexus-mcu/timeline.webp': { width: 2400, height: 1350 },
  '/images/projects/nischal-legal/admin-dashboard.webp': { width: 2400, height: 1350 },
  '/images/projects/nischal-legal/admin-services.webp': { width: 2400, height: 1350 },
  '/images/projects/nischal-legal/admin-settings.webp': { width: 2400, height: 1350 },
  '/images/projects/nischal-legal/contact.webp': { width: 2400, height: 1350 },
  '/images/projects/nischal-legal/cover.webp': { width: 2400, height: 1350 },
  '/images/projects/nischal-legal/home-full.webp': { width: 1400, height: 2897 },
  '/images/projects/nischal-legal/services.webp': { width: 2400, height: 1350 },
};

/** Intrinsic size for an asset, falling back to a 16:9 cover shape. */
export function getImageSize(src: string): { width: number; height: number } {
  return imageDimensions[src] ?? { width: 2400, height: 1350 };
}
