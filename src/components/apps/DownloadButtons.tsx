import { Button } from '@/components/ui/button';

interface DownloadLink {
  platform: string;
  url: string;
  label: string;
  badge: string;
}

interface DownloadButtonsProps {
  links: DownloadLink[];
  ariaLabelTemplate: string;
}

export function DownloadButtons({ links, ariaLabelTemplate }: DownloadButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link) => (
        <Button
          key={link.platform}
          asChild
          size="lg"
          className="rounded-2xl bg-gray-900 text-white hover:bg-black"
        >
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabelTemplate.replace('{label}', link.label)}
          >
            {link.badge}
          </a>
        </Button>
      ))}
    </div>
  );
}
