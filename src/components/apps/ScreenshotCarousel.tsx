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

  const goTo = (index: number) => {
    const normalized = (index + screenshots.length) % screenshots.length;
    setActiveIndex(normalized);
  };

  if (screenshots.length === 0) return null;

  // 슬라이드 이동 거리 계산
  // 모바일: 100%씩 이동, 데스크톱: 33.333%씩 이동 (3개씩 보이므로)
  const slideOffset = activeIndex * -100; // 모바일 기준
  const slideOffsetMd = activeIndex * -(100 / 3); // 데스크톱 기준

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-3xl">
        <style jsx>{`
          .screenshot-slider {
            transform: translateX(${slideOffset}%);
            transition: transform 0.5s ease-in-out;
          }
          @media (min-width: 768px) {
            .screenshot-slider {
              transform: translateX(${slideOffsetMd}%);
            }
          }
        `}</style>
        <div className="screenshot-slider flex md:gap-4">
          {screenshots.map((screenshot, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={screenshot.src}
                className="min-w-0 flex-shrink-0 flex-grow-0 basis-full md:basis-[calc(33.333%-0.67rem)]"
              >
                <div
                  className={cn(
                    'relative mx-auto max-w-[360px] overflow-hidden rounded-3xl border bg-white p-4 shadow-lg transition-all duration-300',
                    isActive ? 'border-2 opacity-100' : 'border border-black/5 opacity-75',
                  )}
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${accentColor}15, #ffffff)`,
                    borderColor: isActive ? accentColor : undefined,
                  }}
                >
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width={360}
                    height={240}
                    className="h-auto w-full rounded-2xl object-cover"
                    priority={isActive}
                  />
                  <p className="mt-3 text-sm text-gray-600">{screenshot.caption}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="이전 스크린샷"
          onClick={() => goTo(activeIndex - 1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-700 shadow-sm transition hover:bg-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="다음 스크린샷"
          onClick={() => goTo(activeIndex + 1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-700 shadow-sm transition hover:bg-white"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
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
