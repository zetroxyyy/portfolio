import { ImageResponse } from 'next/og';
import { site } from '../../content/site';
import fs from 'fs/promises';
import path from 'path';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'zetroxy — full-stack developer in Kathmandu';

export default async function OpenGraphImage() {
  let fonts: {
    name: string;
    data: ArrayBuffer;
    weight: 400 | 700;
    style: 'normal' | 'italic';
  }[] = [];

  try {
    const fontDir = path.join(process.cwd(), 'public', 'fonts');
    const satoshiBuffer = await fs.readFile(path.join(fontDir, 'Satoshi-Bold.ttf'));

    const toArrayBuffer = (b: Buffer): ArrayBuffer =>
      b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer;

    fonts = [
      {
        name: 'Satoshi',
        data: toArrayBuffer(satoshiBuffer),
        weight: 700,
        style: 'normal',
      },
    ];
  } catch (err) {
    console.warn('Custom fonts unavailable for OG image, falling back to system fonts:', err);
  }

  const displayFont = fonts.length > 0 ? 'Satoshi, sans-serif' : 'sans-serif';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#FFFFFF',
          padding: '80px',
        }}
      >
        {/* Top: name */}
        <div
          style={{
            display: 'flex',
            fontFamily: displayFont,
            fontSize: 30,
            fontWeight: 700,
            color: '#111111',
          }}
        >
          {site.name}
        </div>

        {/* Middle: headline sentence */}
        <div
          style={{
            display: 'flex',
            fontFamily: displayFont,
            fontSize: 64,
            fontWeight: 700,
            color: '#111111',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            maxWidth: 1000,
          }}
        >
          Full-stack developer in Kathmandu, building web products end to end.
        </div>

        {/* Bottom: dot + domain */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontFamily: displayFont,
            fontSize: 26,
            fontWeight: 700,
            color: '#737373',
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              backgroundColor: '#0E6E4E',
              flexShrink: 0,
            }}
          />
          zetroxy.me
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length > 0 ? fonts : undefined,
    }
  );
}
