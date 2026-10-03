import { useParams, Link } from '@/lib/router-compat';
import { ArrowRight } from 'lucide-react';
import { PageHeader, Button } from '@/components/ak-ui';
import { ServiceCard } from '@/components/marketplace/ServiceCard';

const categories = [
  { name: 'Raiding', description: 'Full clears, bosses, loot runs' },
  { name: 'Mythic+ Dungeons', description: 'Keystone runs and scores' },
  { name: 'PvP', description: 'Arena, battlegrounds, rating' },
  { name: 'Leveling', description: 'Character and alt leveling' },
  { name: 'Achievements', description: 'Rare mounts and titles' },
  { name: 'Gold & Professions', description: 'Crafting and economy' },
];

export function GameDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const gameName = slug
    ?.split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ') ?? 'Game';

  return (
    <div className="container-ak py-8 lg:py-12">
      <PageHeader
        title={gameName}
        subtitle="Explore our full range of services for this game."
        breadcrumbs={[{ label: 'Games', to: '/games' }, { label: gameName }]}
      />

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link key={cat.name} to="/services" className="card-surface card-surface-hover group block p-6 space-y-2">
            <h3 className="font-display text-lg text-ink-50 group-hover:text-gold-200 transition-colors">
              {cat.name}
            </h3>
            <p className="text-sm text-ink-400">{cat.description}</p>
            <div className="flex items-center gap-1 text-sm text-gold-300 pt-2">
              Browse <ArrowRight size={16} />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="font-display text-xl font-bold text-ink-50 mb-6">Featured Services</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <ServiceCard
            title="Mythic+ Dungeon Boost"
            description="Conquer high-level keystones with our expert team."
            category="Dungeon"
            game="WoW"
            rating={4.9}
            reviewCount={1284}
            deliveryTime="1–3 hours"
          />
          <ServiceCard
            title="Raid Full Clear"
            description="Full raid completion with loot guarantees."
            category="Raid"
            game="WoW"
            rating={4.8}
            reviewCount={842}
            deliveryTime="2–5 hours"
          />
          <ServiceCard
            title="Arena Rating Boost"
            description="Climb the PvP ladder with professional arena players."
            category="PvP"
            game="WoW"
            rating={4.9}
            reviewCount={657}
            deliveryTime="Same day"
          />
          <ServiceCard
            title="Leveling 1–80"
            description="Fast, safe character leveling to max level."
            category="Leveling"
            game="WoW"
            rating={4.7}
            reviewCount={2103}
            deliveryTime="24–48 hours"
          />
        </div>
      </div>
    </div>
  );
}
