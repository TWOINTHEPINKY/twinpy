'use client';

import Link from 'next/link';

const logoSource = '/brand/01-twinpy-logo.svg';

const glyphs = {
  t: { x: 618, y: 66, width: 305, height: 449 },
  w: { x: 888, y: 219, width: 429, height: 296 },
  i: { x: 1354, y: 219, width: 83, height: 296 },
  n: { x: 1469, y: 215, width: 258, height: 298 },
  p: { x: 1765, y: 196, width: 291, height: 471 },
  y: { x: 2051, y: 195, width: 288, height: 423 },
  iDot: { x: 1353, y: 96, width: 83, height: 75 },
};

function GlyphSlice({ clipId, className }: {
  clipId: string;
  className?: string;
}) {
  return (
    <g className={className}>
      <image href={logoSource} x="0" y="0" width="2960" height="740" preserveAspectRatio="none" clipPath={`url(#${clipId})`} />
    </g>
  );
}

export default function BrandLogo() {
  return (
    <Link href="/" className="twinpy-logo group" aria-label="Twinpy">
      <svg className="twinpy-logo-art" viewBox="0 0 2960 740" role="img" aria-label="Twinpy">
        <defs>
          {Object.entries(glyphs).map(([name, box]) => (
            <clipPath id={`twinpy-clip-${name}`} key={name}>
              <rect x={box.x} y={box.y} width={box.width} height={box.height} />
            </clipPath>
          ))}
        </defs>

        <image className="twinpy-logo-full" href={logoSource} x="0" y="0" width="2960" height="740" preserveAspectRatio="none" />
        <g className="twinpy-logo-compact" aria-hidden="true">
          <GlyphSlice {...glyphs.t} clipId="twinpy-clip-t" className="twinpy-glyph-t" />
          <GlyphSlice {...glyphs.p} clipId="twinpy-clip-p" className="twinpy-glyph-p" />
          <GlyphSlice {...glyphs.iDot} clipId="twinpy-clip-iDot" className="twinpy-glyph-i-dot" />
          <circle className="twinpy-p-counter-dot" cx="1907" cy="347" r="27" />
          <g className="twinpy-t-fan" aria-hidden="true">
            <GlyphSlice {...glyphs.t} clipId="twinpy-clip-t" className="twinpy-fan-glyph twinpy-fan-t-1" />
            <GlyphSlice {...glyphs.t} clipId="twinpy-clip-t" className="twinpy-fan-glyph twinpy-fan-t-2" />
            <GlyphSlice {...glyphs.t} clipId="twinpy-clip-t" className="twinpy-fan-glyph twinpy-fan-t-3" />
            <GlyphSlice {...glyphs.t} clipId="twinpy-clip-t" className="twinpy-fan-glyph twinpy-fan-t-4" />
          </g>
          <g className="twinpy-p-fan" aria-hidden="true">
            <GlyphSlice {...glyphs.p} clipId="twinpy-clip-p" className="twinpy-fan-glyph twinpy-fan-p-1" />
            <GlyphSlice {...glyphs.p} clipId="twinpy-clip-p" className="twinpy-fan-glyph twinpy-fan-p-2" />
            <GlyphSlice {...glyphs.p} clipId="twinpy-clip-p" className="twinpy-fan-glyph twinpy-fan-p-3" />
            <GlyphSlice {...glyphs.p} clipId="twinpy-clip-p" className="twinpy-fan-glyph twinpy-fan-p-4" />
          </g>
          <GlyphSlice {...glyphs.w} clipId="twinpy-clip-w" className="twinpy-glyph-other twinpy-glyph-w" />
          <GlyphSlice {...glyphs.i} clipId="twinpy-clip-i" className="twinpy-glyph-other twinpy-glyph-i" />
          <GlyphSlice {...glyphs.n} clipId="twinpy-clip-n" className="twinpy-glyph-other twinpy-glyph-n" />
          <GlyphSlice {...glyphs.y} clipId="twinpy-clip-y" className="twinpy-glyph-other twinpy-glyph-y" />
        </g>
      </svg>
    </Link>
  );
}
