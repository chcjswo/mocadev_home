'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface ScreenshotCarouselProps {
  screenshots: { src: string; alt: string; caption: string }[];
  accentColor: string;
}

export function ScreenshotCarousel({ screenshots, accentColor }: ScreenshotCarouselProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const t = useTranslations('carousel');

  const goTo = (index: number) => {
    const normalized = (index + screenshots.length) % screenshots.length;
    setSlideIndex(normalized);
    setActiveIndex(normalized);
  };

  if (screenshots.length === 0) return null;

  const slideStyle = {
    '--slide-offset': `${slideIndex * -100}%`,
    '--slide-offset-md': `${slideIndex * -(100 / 3)}%`,
  } as React.CSSProperties;

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-3xl">
        <div
          className="flex transition-transform duration-500 ease-in-out max-md:translate-x-[var(--slide-offset)] md:gap-4 md:translate-x-[var(--slide-offset-md)]"
          style={slideStyle}
        >
          {screenshots.map((screenshot, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={screenshot.src}
                className="min-w-0 flex-shrink-0 flex-grow-0 basis-full md:basis-[calc(33.333%-0.67rem)]"
              >
                <div
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    'relative mx-auto max-w-[360px] cursor-pointer overflow-hidden rounded-3xl border bg-white p-4 shadow-lg transition-all duration-300 hover:shadow-xl',
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
                    sizes="(min-width: 768px) 360px, 100vw"
                    className="h-auto w-full rounded-2xl object-cover"
                    loading="lazy"
                  />
                  <p className="mt-3 text-sm text-gray-600">{screenshot.caption}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          aria-label={t('prevAriaLabel')}
          onClick={() => goTo(slideIndex - 1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-700 shadow-sm transition hover:bg-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label={t('nextAriaLabel')}
          onClick={() => goTo(slideIndex + 1)}
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
            aria-label={t('dotAriaLabel', { index: index + 1 })}
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
