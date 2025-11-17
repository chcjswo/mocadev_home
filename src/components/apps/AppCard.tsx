import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AppContent } from '@/types/app';

interface AppCardProps {
  app: AppContent;
}

export function AppCard({ app }: AppCardProps) {
  return (
    <Card className="group relative overflow-hidden border-black/5 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <CardContent className="p-6">
        <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-white to-purple-50 px-3 py-2 text-2xl">
          {app.icon}
        </div>
        <div className="mb-3 flex items-center gap-2">
          <h3 className="text-xl font-semibold text-gray-900">{app.name}</h3>
          <ArrowUpRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
        <p className="mb-4 text-sm text-gray-600">{app.tagline}</p>
        <div className="mb-6 flex flex-wrap gap-2 text-xs text-gray-500">
          {app.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-600">
              {tag}
            </Badge>
          ))}
        </div>
        <Link
          href={`/apps/${app.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900"
        >
          자세히 보기
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </CardContent>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1 opacity-70 transition-opacity group-hover:opacity-100"
        style={{
          backgroundImage: `linear-gradient(90deg, ${app.theme.gradientFrom}, ${app.theme.gradientTo})`,
        }}
      />
    </Card>
  );
}
