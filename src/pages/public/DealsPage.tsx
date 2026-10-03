import { PageHeader } from '@/components/ak-ui';
import { DealCard } from '@/components/marketplace/DealCard';

const deals = [
  { title: 'Mythic+ Bundle — 10 Keys', description: '10 Mythic+ keystones at a discounted bundle price.', category: 'Dungeon Bundle', originalPrice: '$249.99', dealPrice: '$179.99', endsIn: '2d 14h' },
  { title: 'Season Raid Special', description: 'Full raid clear with exclusive mount — limited time offer.', category: 'Raid', originalPrice: '$399.99', dealPrice: '$299.99', endsIn: '5d 6h' },
  { title: 'PvP Coaching + Rating', description: 'One-on-one coaching session plus rating boost to 1800.', category: 'PvP', originalPrice: '$159.99', dealPrice: '$99.99', endsIn: '1d 3h' },
  { title: 'Leveling Mega Pack', description: 'Level 5 characters to max level in one bundle.', category: 'Leveling', originalPrice: '$199.99', dealPrice: '$139.99', endsIn: '3d 8h' },
  { title: 'Mount Collection Sale', description: 'Get 3 rare mounts at a bundled discount.', category: 'Collectibles', originalPrice: '$299.99', dealPrice: '$219.99', endsIn: '4d 2h' },
  { title: 'Achievement Bundle', description: 'Complete 5 meta achievements at once.', category: 'Achievements', originalPrice: '$179.99', dealPrice: '$129.99', endsIn: '6d 12h' },
];

export function DealsPage() {
  return (
    <div className="container-ak py-8 lg:py-12">
      <PageHeader
        title="Hot Deals"
        subtitle="Limited-time offers on our most popular services."
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {deals.map((d) => (
          <DealCard key={d.title} {...d} />
        ))}
      </div>
    </div>
  );
}
