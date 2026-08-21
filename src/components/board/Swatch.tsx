'use client';

import { PALETTE } from '@/lib/board/data';

interface SwatchProps {
  color: string;
  onPick: (color: string) => void;
}

/** 팔레트 색 고르기 (라벨·일정 종류 편집 공용) */
export function Swatch({ color, onPick }: SwatchProps) {
  return (
    <span className="swatch">
      {PALETTE.map((c) => (
        <button
          key={c}
          type="button"
          style={{ background: c }}
          aria-pressed={c.toLowerCase() === color.toLowerCase()}
          aria-label="색"
          onClick={() => onPick(c)}
        />
      ))}
    </span>
  );
}
