/**
 * Display-only placeholder content for the homepage.
 * These are NOT business data: they will be replaced by real services,
 * deals and reviews from the database in later phases. Shapes match the
 * card component props so swapping in real data is a drop-in change.
 */
import dealDungeon from '@/assets/deal-dungeon.jpg';
import dealRaid from '@/assets/deal-raid.jpg';
import dealMount from '@/assets/deal-mount.jpg';

export type ServiceIconKey = 'leveling' | 'mythic' | 'raids' | 'delves' | 'mounts' | 'gold';

export interface PlaceholderService {
  title: string;
  description: string;
  iconKey: ServiceIconKey;
  startingPrice: string;
  badge?: string;
}

export const placeholderServices: PlaceholderService[] = [
  { title: 'Power Leveling', description: 'Reach max level fast with a safe, hand-played route.', iconKey: 'leveling', startingPrice: 'TBA', badge: 'Popular' },
  { title: 'Mythic+ Dungeons', description: 'Timed keystones with experienced, coordinated groups.', iconKey: 'mythic', startingPrice: 'TBA' },
  { title: 'Raids', description: 'Normal, Heroic and Mythic clears with loot options.', iconKey: 'raids', startingPrice: 'TBA' },
  { title: 'Delves', description: 'Bountiful Delves cleared efficiently for top rewards.', iconKey: 'delves', startingPrice: 'TBA' },
  { title: 'Mounts', description: 'Rare and prestigious mounts from raids and achievements.', iconKey: 'mounts', startingPrice: 'TBA' },
  { title: 'Gold', description: 'Fast, reliable gold delivery on your realm.', iconKey: 'gold', startingPrice: 'TBA' },
];

export const placeholderDeals = [
  { title: 'Mythic+ Weekly Bundle', description: 'A set of timed keystones at a bundle rate.', category: 'Dungeons', originalPrice: '$120', dealPrice: '$89', endsIn: 'Limited', imageUrl: dealDungeon },
  { title: 'Heroic Raid Clear', description: 'Full Heroic clear with a seasoned raid team.', category: 'Raids', originalPrice: '$150', dealPrice: '$115', endsIn: 'Limited', imageUrl: dealRaid },
  { title: 'Prestige Mount Run', description: 'Chance at a rare mount with guaranteed attempts.', category: 'Mounts', originalPrice: '$80', dealPrice: '$60', endsIn: 'Limited', imageUrl: dealMount },
];

export const placeholderReviews = [
  { author: 'Kaelthas_Fan', rating: 5, date: 'Example', title: 'Smooth from start to finish', body: 'Clear communication and the run was done faster than expected.', service: 'Mythic+ Dungeons' },
  { author: 'Lyra M.', rating: 5, date: 'Example', title: 'Professional team', body: 'Friendly booster, kept me updated the whole time.', service: 'Raids' },
  { author: 'Thorne', rating: 4, date: 'Example', title: 'Great value', body: 'Leveling was quick and the account stayed safe.', service: 'Power Leveling' },
  { author: 'Seraphine', rating: 5, date: 'Example', title: 'Finally got my mount', body: 'Support answered every question in minutes.', service: 'Mounts' },
];
