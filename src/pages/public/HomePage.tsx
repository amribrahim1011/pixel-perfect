import { Link } from '@/lib/router-compat';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Trophy,
  Headphones,
  ThumbsUp,
  Flame,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ak-ui/Button';
import { Badge } from '@/components/ak-ui/Badge';
import { ServiceCard } from '@/components/marketplace/ServiceCard';
import { DealCard } from '@/components/marketplace/DealCard';
import { ReviewCard } from '@/components/marketplace/ReviewCard';
import { brand } from '@/lib/brand';

const popularServices = [
  {
    title: 'Mythic+ Dungeon Boost',
    description: 'Conquer high-level keystones with our expert team. Guaranteed completion.',
    category: 'Dungeon',
    game: 'World of Warcraft',
    deliveryTime: '1–3 hours',
    rating: 4.9,
    reviewCount: 1284,
    badge: 'Popular',
  },
  {
    title: 'Raid Full Clear',
    description: 'Full raid completion with loot guarantees. Top-tier raid teams at your service.',
    category: 'Raid',
    game: 'World of Warcraft',
    deliveryTime: '2–5 hours',
    rating: 4.8,
    reviewCount: 842,
    badge: 'Top Rated',
  },
  {
    title: 'Arena Rating Boost',
    description: 'Climb the PvP ladder with professional arena players. Reach your dream rating.',
    category: 'PvP',
    game: 'World of Warcraft',
    deliveryTime: 'Same day',
    rating: 4.9,
    reviewCount: 657,
  },
  {
    title: 'Leveling 1–80',
    description: 'Fast, safe character leveling. Get to max level without the grind.',
    category: 'Leveling',
    game: 'World of Warcraft',
    deliveryTime: '24–48 hours',
    rating: 4.7,
    reviewCount: 2103,
    badge: 'Best Value',
  },
];

const hotDeals = [
  {
    title: 'Mythic+ Bundle — 10 Keys',
    description: '10 Mythic+ keystones at a discounted bundle price.',
    category: 'Dungeon Bundle',
    originalPrice: '$249.99',
    dealPrice: '$179.99',
    endsIn: '2d 14h',
  },
  {
    title: 'Season Raid Special',
    description: 'Full raid clear with exclusive mount — limited time offer.',
    category: 'Raid',
    originalPrice: '$399.99',
    dealPrice: '$299.99',
    endsIn: '5d 6h',
  },
  {
    title: 'PvP Coaching + Rating',
    description: 'One-on-one coaching session plus rating boost to 1800.',
    category: 'PvP',
    originalPrice: '$159.99',
    dealPrice: '$99.99',
    endsIn: '1d 3h',
  },
];

const reviews = [
  {
    author: 'Michael R.',
    rating: 5,
    date: 'Sep 2026',
    title: 'Lightning fast and professional',
    body: 'Ordered a Mythic+ boost and it was done within 2 hours. The booster was friendly and knew exactly what to do. Will order again.',
    service: 'Mythic+ Dungeon Boost',
  },
  {
    author: 'Sarah K.',
    rating: 5,
    date: 'Aug 2026',
    title: 'Best boosting service I have used',
    body: 'The raid team was incredible. Got every piece of loot I needed and the communication was seamless throughout the entire process.',
    service: 'Raid Full Clear',
  },
  {
    author: 'David L.',
    rating: 4,
    date: 'Aug 2026',
    title: 'Great experience overall',
    body: 'Smooth process from start to finish. The only minor issue was a slight delay, but support handled it immediately and professionally.',
    service: 'Arena Rating Boost',
  },
];

const whyUs = [
  {
    icon: <ShieldCheck size={28} />,
    title: 'Trusted Professionals',
    description: 'Every booster is vetted and verified. Your account is in safe hands.',
  },
  {
    icon: <Zap size={28} />,
    title: 'Fast Delivery',
    description: 'Most orders start within minutes. Get results when you need them.',
  },
  {
    icon: <Trophy size={28} />,
    title: 'Guaranteed Results',
    description: 'We deliver what we promise. Full refunds if we do not complete your order.',
  },
  {
    icon: <Headphones size={28} />,
    title: '24/7 Support',
    description: 'Our support team is available around the clock to help with any question.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Choose Your Service',
    description: 'Browse our catalog and pick the service that fits your needs.',
  },
  {
    number: '02',
    title: 'Place Your Order',
    description: 'Select your options and checkout securely. Get matched instantly.',
  },
  {
    number: '03',
    title: 'Track Progress',
    description: 'Watch your order in real-time and chat with your booster directly.',
  },
  {
    number: '04',
    title: 'Enjoy Results',
    description: 'Receive your completed order and leave a review for your booster.',
  },
];

export function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="absolute inset-0 bg-gradient-to-b from-base-950 via-base-900/50 to-base-950" />
        <div className="container-ak relative py-24 lg:py-36">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <Badge variant="gold" icon={<Sparkles size={12} />}>
              {brand.tagline}
            </Badge>
            <h1 className="font-display text-4xl font-bold leading-tight text-ink-50 sm:text-5xl lg:text-6xl">
              MASTER YOUR
              <br />
              <span className="text-gradient-gold">ADVENTURE</span>
            </h1>
            <p className="text-lg text-ink-300 max-w-xl mx-auto">
              {brand.description}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
              <Link to="/services">
                <Button size="lg" rightIcon={<ArrowRight size={18} />}>
                  Explore Services
                </Button>
              </Link>
              <Link to="/deals">
                <Button size="lg" variant="outline" leftIcon={<Flame size={18} />}>
                  View Deals
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="container-ak py-16 lg:py-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink-50 sm:text-3xl">
              Popular Services
            </h2>
            <p className="mt-2 text-ink-400">Our most requested World of Warcraft services.</p>
          </div>
          <Link to="/services" className="hidden sm:block">
            <Button variant="ghost" rightIcon={<ArrowRight size={16} />}>
              View All
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popularServices.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </section>

      {/* Hot Deals */}
      <section className="container-ak py-16 lg:py-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink-50 sm:text-3xl">
              Hot Deals
            </h2>
            <p className="mt-2 text-ink-400">Limited-time offers — grab them before they are gone.</p>
          </div>
          <Link to="/deals" className="hidden sm:block">
            <Button variant="ghost" rightIcon={<ArrowRight size={16} />}>
              All Deals
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {hotDeals.map((d) => (
            <DealCard key={d.title} {...d} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-base-700 bg-base-900/50">
        <div className="container-ak py-16 lg:py-24">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl font-bold text-ink-50 sm:text-3xl">
              How It Works
            </h2>
            <p className="mt-2 text-ink-400">Get from order to results in four simple steps.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number} className="text-center space-y-3">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold-600/40 bg-gold-500/5 font-display text-xl text-gold-400">
                  {step.number}
                </div>
                <h3 className="font-display text-lg text-ink-50">{step.title}</h3>
                <p className="text-sm text-ink-400 max-w-xs mx-auto">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why AK Team */}
      <section className="container-ak py-16 lg:py-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl font-bold text-ink-50 sm:text-3xl">
            Why {brand.name}
          </h2>
          <p className="mt-2 text-ink-400">Trusted by thousands of players worldwide.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((item) => (
            <div
              key={item.title}
              className="card-surface card-surface-hover space-y-4 p-6 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-600/30 text-gold-400">
                {item.icon}
              </div>
              <h3 className="font-display text-lg text-ink-50">{item.title}</h3>
              <p className="text-sm text-ink-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="border-t border-base-700 bg-base-900/50">
        <div className="container-ak py-16 lg:py-24">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl font-bold text-ink-50 sm:text-3xl">
              Customer Reviews
            </h2>
            <p className="mt-2 text-ink-400">What our customers say about their experience.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <ReviewCard key={r.author} {...r} />
            ))}
          </div>
        </div>
      </section>

      {/* Become a Booster CTA */}
      <section className="container-ak py-16 lg:py-24">
        <div className="relative overflow-hidden card-surface p-8 lg:p-14 text-center">
          <div className="absolute inset-0 bg-gold-gradient-soft" />
          <div className="relative space-y-5">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gold-gradient text-base-950">
              <ThumbsUp size={28} />
            </div>
            <h2 className="font-display text-2xl font-bold text-ink-50 sm:text-3xl">
              Become a Booster
            </h2>
            <p className="text-ink-300 max-w-xl mx-auto">
              Turn your skills into income. Join our elite team of boosters and earn on your own schedule.
            </p>
            <div className="flex justify-center pt-2">
              <Link to="/become-a-booster">
                <Button size="lg" rightIcon={<ArrowRight size={18} />}>
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
