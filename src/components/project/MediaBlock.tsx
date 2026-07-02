import Image from 'next/image';
import { MediaBlock as MediaBlockType } from '../../../content/projects';

interface MediaBlockProps {
  block: MediaBlockType;
}

/**
 * MediaBlock — renders a single media item in a project case study.
 * Images: next/image with optional span (full/half), quality={90} for crisp screenshots.
 * Video: native <video> with controls, muted autoplay for reels.
 *
 * Detail pages always render full color — grayscale is only a grid-level CSS rule.
 */
export function MediaBlock({ block }: MediaBlockProps) {
  if (block.type === 'image') {
    const isFullSpan = block.span === 'full' || !block.span; // default to full if unspecified
    return (
      <figure
        className={`media-block media-block--image ${isFullSpan ? 'media-block--full' : 'media-block--half'}`}
      >
        <div className="media-block__img-wrap">
          <Image
            src={block.src}
            alt={block.alt}
            fill
            sizes={
              isFullSpan
                ? '(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw'
                : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw'
            }
            quality={90}
            className="media-block__img"
          />
        </div>
        {block.caption && (
          <figcaption className="media-block__caption">{block.caption}</figcaption>
        )}
      </figure>
    );
  }

  if (block.type === 'video') {
    return (
      <figure className="media-block media-block--video media-block--full">
        <div className="media-block__video-wrap">
          <video
            src={block.src}
            poster={block.poster}
            controls
            playsInline
            preload="metadata"
            className="media-block__video"
            aria-label={block.caption ?? 'Project video'}
          >
            <track kind="captions" srcLang="en" label="English captions" />
            Your browser does not support the video element.
          </video>
        </div>
        {block.caption && (
          <figcaption className="media-block__caption">{block.caption}</figcaption>
        )}
      </figure>
    );
  }

  return null;
}
