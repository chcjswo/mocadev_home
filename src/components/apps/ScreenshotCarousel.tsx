'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AppScreenshot } from '@/types/app';
import { cn } from '@/lib/utils';

interface ScreenshotCarouselProps {
  screenshots: AppScreenshot[];
  accentColor: string;
}

export function ScreenshotCarousel({ screenshots, accentColor }: ScreenshotCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = screenshots[activeIndex];

  const goTo = (index: number) => {
    const normalized = (index + screenshots.length) % screenshots.length;
    setActiveIndex(normalized);
  };

  if (!current) return null;

  return (
    <div className="space-y-4">
      <div
        className="relative overflow-hidden rounded-3xl border border-black/5 bg-white p-4 shadow-lg"
        style={{
          backgroundImage: `linear-gradient(135deg, ${accentColor}15, #ffffff)`,
        }}
      >
        <Image
          src={current.src}
          alt={current.alt}
          width={900}
          height={600}
          className="h-auto w-full rounded-2xl object-cover"
          priority={false}
        />
        <p className="mt-3 text-sm text-gray-600">{current.caption}</p>

        <div className="absolute inset-y-1/2 left-3 flex -translate-y-1/2 flex-col gap-2">
          <button
            type="button"
            aria-label="이전 스크린샷"
            onClick={() => goTo(activeIndex - 1)}
            className="rounded-full bg-white/90 p-2 text-gray-700 shadow-sm transition hover:bg-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="다음 스크린샷"
            onClick={() => goTo(activeIndex + 1)}
            className="rounded-full bg-white/90 p-2 text-gray-700 shadow-sm transition hover:bg-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-2">
        {screenshots.map((shot, index) => (
          <button
            key={shot.src}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`${index + 1}번째 스크린샷 보기`}
            className={cn(
              'h-2 w-6 rounded-full transition-all',
              activeIndex === index ? 'w-10' : 'opacity-50',
            )}
            style={{
              backgroundColor: accentColor,
              opacity: activeIndex === index ? 1 : 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
}
