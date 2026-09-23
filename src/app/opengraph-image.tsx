import { ImageResponse } from 'next/og';
import { site } from '../../content/site';
import fs from 'fs/promises';
import path from 'path';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${site.name} — Full-Stack Developer`;

export default async function OpenGraphImage() {
  let fonts: {
    name: string;
    data: ArrayBuffer;
    weight: 400 | 700;
    style: 'normal' | 'italic';
  }[] = [];

  try {
    const fontDir = path.join(process.cwd(), 'public', 'fonts');
    const [satoshiBuffer, serifBuffer, monoBuffer] = await Promise.all([
      fs.readFile(path.join(fontDir, 'Satoshi-Bold.ttf')),
      fs.readFile(path.join(fontDir, 'InstrumentSerif-Italic.ttf')),
      fs.readFile(path.join(fontDir, 'JetBrainsMono-Regular.ttf')),
    ]);

    const toArrayBuffer = (b: Buffer): ArrayBuffer =>
      b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer;

    fonts = [
      {
        name: 'Satoshi',
        data: toArrayBuffer(satoshiBuffer),
        weight: 700,
        style: 'normal',
      },
      {
        name: 'Instrument Serif',
        data: toArrayBuffer(serifBuffer),
        weight: 400,
        style: 'italic',
      },
      {
        name: 'JetBrains Mono',
        data: toArrayBuffer(monoBuffer),
        weight: 400,
        style: 'normal',
      },
    ];
  } catch (err) {
    console.warn('Custom fonts unavailable for OG image, falling back to system fonts:', err);
  }

  const hasFonts = fonts.length > 0;
  const monoFont = hasFonts ? 'JetBrains Mono, monospace' : 'monospace';
  const displayFont = hasFonts ? 'Satoshi, sans-serif' : 'sans-serif';
  const serifFont = hasFonts ? 'Instrument Serif, Georgia, serif' : 'Georgia, serif';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0E0E0D',
          padding: '72px',
        }}
      >
        {/* Top-left: small mono, letter-spaced, #85837B */}
        <div
          style={{
            display: 'flex',
            fontFamily: monoFont,
            fontSize: 16,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#85837B',
          }}
        >
          FULL-STACK DEVELOPMENT · NEPAL
        </div>

        {/* Center: Two-line headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontFamily: displayFont,
              fontSize: 74,
              fontWeight: 700,
              color: '#EDEDEA',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
            }}
          >
            The website is the easy half.
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: serifFont,
              fontSize: 76,
              fontStyle: 'italic',
              color: '#EDEDEA',
              lineHeight: 1.05,
            }}
          >
            I build what&#39;s underneath.
          </div>
        </div>

        {/* Bottom row + divider rule */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            width: '100%',
          }}
        >
          {/* 1px rule in rgba(237,237,234,0.12) */}
          <div
            style={{
              width: '100%',
              height: 1,
              backgroundColor: 'rgba(237, 237, 234, 0.12)',
            }}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              fontFamily: monoFont,
              fontSize: 18,
              color: '#85837B',
              letterSpacing: '0.08em',
            }}
          >
            <div style={{ display: 'flex' }}>zetroxy.me</div>
            <div style={{ display: 'flex' }}>WEB · MOBILE · AI</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length > 0 ? fonts : undefined,
    }
  );
}
