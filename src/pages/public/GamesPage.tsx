import { Link } from '@/lib/router-compat';
import { ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/ak-ui';
import { Card } from '@/components/ak-ui/Card';
import { Badge } from '@/components/ak-ui/Badge';

const games = [
  {
    name: 'World of Warcraft',
    slug: 'world-of-warcraft',
    description: 'The original MMO. Raids, dungeons, PvP, leveling, and more.',
    status: 'Available',
    services: 120,
  },
];

export function GamesPage() {
  return (
    <div className="container-ak py-8 lg:py-12">
      <PageHeader
        title="Games"
        subtitle="Browse our available games. New titles are added regularly."
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <Link key={game.slug} to={`/games/${game.slug}`}>
            <Card hoverable className="h-full space-y-4 p-6">
              <div className="flex h-32 items-center justify-center rounded-lg bg-charcoal-gradient">
                <span className="font-display text-xl text-base-600 uppercase tracking-widest">
                  {game.name}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg text-ink-50">{game.name}</h3>
                  <Badge variant="success">{game.status}</Badge>
                </div>
                <p className="text-sm text-ink-400">{game.description}</p>
                <p className="text-sm text-gold-400">{game.services} services available</p>
              </div>
              <div className="flex items-center gap-1 text-sm text-gold-300">
                Browse services <ArrowRight size={16} />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
