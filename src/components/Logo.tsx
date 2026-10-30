import { useEffect, useRef } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Logo — Mainter brandmark.
 * Royal Blue #174A9C + Harvest Gold #FFCF21, consistent with mainter.com.bo.
 */
export default function Logo({ size = 'md' }: LogoProps) {
  const baseSize = size === 'sm' ? 28 : size === 'lg' ? 48 : 36;
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      // Recolor the brandmark to the Mainter brand palette on first paint.
      const rects = svgRef.current.querySelectorAll('rect');
      rects.forEach((r, i) => {
        // First two rects = navy background, last two = gold accent.
        r.setAttribute('fill', i < 2 ? '#0B172A' : '#FFCF21');
      });
    }
  }, []);

  return (
    <svg
      className="logo"
      ref={svgRef}
      viewBox="0 0 64 64"
      width={baseSize}
      height={baseSize}
      aria-label="Mainter"
      role="img"
    >
      <g transform="translate(32,32)">
        <g transform="translate(2,-2)">
          <rect x="-10" y="-4" width="20" height="8" rx="1.5" />
          <rect x="-4" y="-10" width="8" height="20" rx="1.5" />
        </g>
        <g transform="translate(-2,2)">
          <rect x="-10" y="-4" width="20" height="8" rx="1.5" />
          <rect x="-4" y="-10" width="8" height="20" rx="1.5" />
        </g>
      </g>
    </svg>
  );
}
