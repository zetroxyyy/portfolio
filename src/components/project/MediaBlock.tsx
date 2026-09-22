'use client';

import { BrowserFrame } from '@/components/ui/BrowserFrame';

export interface MediaBlockItem {
  heading?: string;
  body?: string;
  image?: string;
  imageAlt?: string;
  caption?: string;
  url?: string;
  accent?: string;
  isFullScroll?: boolean;
}

interface MediaBlockProps {
  item: MediaBlockItem;
  defaultUrl: string;
  accent: string;
}

export function MediaBlock({ item, defaultUrl, accent }: MediaBlockProps) {
  if (!item.image) return null;

  const url = item.url || defaultUrl;

  return (
    <figure className="case-study__built-figure" style={{ margin: 0 }}>
      <BrowserFrame
        src={item.image}
        alt={item.imageAlt || item.heading || 'Project screenshot'}
        url={url}
        accent={accent}
        expandable={item.isFullScroll}
      />
      {item.caption && (
        <figcaption className="case-study__caption" style={{ marginTop: 'var(--space-3)' }}>
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}
