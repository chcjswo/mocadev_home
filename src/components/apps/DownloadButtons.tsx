import Link from 'next/link';
import { AppPlatformLink } from '@/types/app';
import { Button } from '@/components/ui/button';

interface DownloadButtonsProps {
  links: AppPlatformLink[];
}

export function DownloadButtons({ links }: DownloadButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link) => (
        <Button
          key={link.platform}
          asChild
          size="lg"
          className="rounded-2xl bg-gray-900 text-white hover:bg-black"
        >
          <Link
            href={link.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${link.label} 바로가기`}
          >
            {link.badge}
          </Link>
        </Button>
      ))}
    </div>
  );
}
