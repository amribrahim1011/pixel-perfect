import { PageHeader } from '@/components/ak-ui';
import { ServiceCard } from '@/components/marketplace/ServiceCard';

const services = [
  { title: 'Mythic+ Dungeon Boost', description: 'Conquer high-level keystones with our expert team. Guaranteed completion.', category: 'Dungeon', game: 'World of Warcraft', deliveryTime: '1–3 hours', rating: 4.9, reviewCount: 1284, badge: 'Popular' },
  { title: 'Raid Full Clear', description: 'Full raid completion with loot guarantees. Top-tier raid teams at your service.', category: 'Raid', game: 'World of Warcraft', deliveryTime: '2–5 hours', rating: 4.8, reviewCount: 842, badge: 'Top Rated' },
  { title: 'Arena Rating Boost', description: 'Climb the PvP ladder with professional arena players. Reach your dream rating.', category: 'PvP', game: 'World of Warcraft', deliveryTime: 'Same day', rating: 4.9, reviewCount: 657 },
  { title: 'Leveling 1–80', description: 'Fast, safe character leveling. Get to max level without the grind.', category: 'Leveling', game: 'World of Warcraft', deliveryTime: '24–48 hours', rating: 4.7, reviewCount: 2103, badge: 'Best Value' },
  { title: 'Mount Farming', description: 'Obtain rare and exclusive mounts with our dedicated farming teams.', category: 'Collectibles', game: 'World of Warcraft', deliveryTime: '1–7 days', rating: 4.8, reviewCount: 412 },
  { title: 'Achievement Runs', description: 'Complete challenging achievements and earn prestigious titles.', category: 'Achievements', game: 'World of Warcraft', deliveryTime: '1–3 days', rating: 4.7, reviewCount: 298 },
  { title: 'Torghast Runs', description: 'Clear Torghast layers and obtain Soul Ash and Soul Cinders.', category: 'PvE', game: 'World of Warcraft', deliveryTime: 'Same day', rating: 4.6, reviewCount: 187 },
  { title: 'Reputation Boost', description: 'Reach exalted with any faction fast and unlock exclusive rewards.', category: 'Reputation', game: 'World of Warcraft', deliveryTime: '2–5 days', rating: 4.8, reviewCount: 543 },
];

export function ServicesPage() {
  return (
    <div className="container-ak py-8 lg:py-12">
      <PageHeader
        title="Services"
        subtitle="Browse our full catalog of premium World of Warcraft services."
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <ServiceCard key={s.title} {...s} />
        ))}
      </div>
    </div>
  );
}
