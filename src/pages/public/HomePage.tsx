import type { ReactNode } from 'react';
import { Link } from '@/lib/router-compat';
import {
  ArrowRight, ShieldCheck, Zap, Headphones, Lock, Receipt, Star, Flame, Sparkles,
  TrendingUp, Swords, Castle, Compass, Bird, Coins, Search, SlidersHorizontal, CreditCard, Trophy,
} from 'lucide-react';
import { Button } from '@/components/ak-ui/Button';
import { Badge } from '@/components/ak-ui/Badge';
import { ServiceCard } from '@/components/marketplace/ServiceCard';
import { DealCard } from '@/components/marketplace/DealCard';
import { ReviewCard } from '@/components/marketplace/ReviewCard';
import { brand } from '@/lib/brand';
import heroImg from '@/assets/hero-citadel.jpg';
import {
  placeholderServices, placeholderDeals, placeholderReviews, type ServiceIconKey,
} from '@/lib/home-placeholders';

const serviceIcons: Record<ServiceIconKey, ReactNode> = {
  leveling: <TrendingUp size={28} />,
  mythic: <Swords size={28} />,
  raids: <Castle size={28} />,
  delves: <Compass size={28} />,
  mounts: <Bird size={28} />,
  gold: <Coins size={28} />,
};

const steps = [
  { icon: <Search size={22} />, title: 'Choose Your Service', description: 'Browse the catalog and pick what fits your goals.' },
  { icon: <SlidersHorizontal size={22} />, title: 'Customize Your Order', description: 'Select options, schedule and preferences.' },
  { icon: <CreditCard size={22} />, title: 'Complete Payment', description: 'Check out securely in a few clicks.' },
  { icon: <Trophy size={22} />, title: 'Enjoy Your Boost', description: 'Track progress and enjoy the results.' },
];

const features = [
  { icon: <ShieldCheck size={22} />, title: 'Trusted Boosters', description: 'Every booster is vetted before joining.' },
  { icon: <Lock size={22} />, title: 'Secure Payments', description: 'Protected checkout, no stored card data.' },
  { icon: <Zap size={22} />, title: 'Fast Delivery', description: 'Most orders start within minutes.' },
  { icon: <Headphones size={22} />, title: '24/7 Support', description: 'Real people, around the clock.' },
  { icon: <Receipt size={22} />, title: 'Transparent Pricing', description: 'Clear prices, no hidden fees.' },
  { icon: <Star size={22} />, title: 'Customer Reviews', description: 'Honest feedback from real players.' },
];

function SectionHeading({ eyebrow, title, subtitle, action }: { eyebrow?: string; title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">{eyebrow}</p>}
        <h2 className="font-display text-2xl font-bold text-ink-50 sm:text-3xl lg:text-4xl">{title}</h2>
        {subtitle && <p className="mt-2 max-w-xl text-ink-400">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative -mt-16 flex min-h-[88vh] items-center overflow-hidden lg:-mt-18">
        <img src={heroImg} alt="" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="container-ak relative pt-28 pb-20 lg:pt-36">
          <div className="reveal max-w-2xl space-y-6">
            <Badge variant="gold" icon={<Sparkles size={12} />}>{brand.tagline}</Badge>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-wide text-ink-50 sm:text-6xl lg:text-7xl">
              MASTER YOUR <span className="text-gradient-gold">ADVENTURE</span>
            </h1>
            <p className="max-w-lg text-base text-ink-200 sm:text-lg">{brand.description}</p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Link to="/services">
                <Button size="lg" fullWidth rightIcon={<ArrowRight size={18} />}>Explore Services</Button>
              </Link>
              <Link to="/deals">
                <Button size="lg" variant="outline" fullWidth leftIcon={<Flame size={18} />}>View Deals</Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 text-sm text-ink-300">
              <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-gold-400" /> Vetted boosters</span>
              <span className="flex items-center gap-2"><Lock size={16} className="text-gold-400" /> Secure checkout</span>
              <span className="flex items-center gap-2"><Headphones size={16} className="text-gold-400" /> 24/7 support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="container-ak py-20 lg:py-28">
        <SectionHeading
          eyebrow="Catalog"
          title="Popular Services"
          subtitle="Our most requested World of Warcraft services."
          action={<Link to="/services"><Button variant="ghost" rightIcon={<ArrowRight size={16} />}>View All</Button></Link>}
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {placeholderServices.map((s, i) => (
            <div key={s.title} className="reveal" style={{ animationDelay: `${i * 60}ms` }}>
              <ServiceCard
                title={s.title}
                description={s.description}
                icon={serviceIcons[s.iconKey]}
                startingPrice={s.startingPrice}
                badge={s.badge}
                ctaLabel="Explore"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Hot Deals */}
      <section className="border-y border-base-800 bg-base-900/60">
        <div className="container-ak py-20 lg:py-28">
          <SectionHeading
            eyebrow="Limited time"
            title="Hot Deals"
            subtitle="Seasonal offers on our most popular runs."
            action={<Link to="/deals"><Button variant="ghost" rightIcon={<ArrowRight size={16} />}>All Deals</Button></Link>}
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {placeholderDeals.map((d) => <DealCard key={d.title} {...d} />)}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container-ak py-20 lg:py-28">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Simple process</p>
          <h2 className="font-display text-2xl font-bold text-ink-50 sm:text-3xl lg:text-4xl">How It Works</h2>
        </div>
        <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="gold-hairline absolute top-7 right-[12%] left-[12%] hidden lg:block" />
          {steps.map((step, i) => (
            <div key={step.title} className="reveal relative text-center" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold-600/50 bg-base-900 text-gold-300 shadow-gold-sm">
                {step.icon}
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold-gradient text-[11px] font-bold text-base-950">{i + 1}</span>
              </div>
              <h3 className="mt-5 font-display text-lg text-ink-50">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm text-ink-400">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why AK Team */}
      <section className="border-y border-base-800 bg-base-900/60">
        <div className="container-ak py-20 lg:py-28">
          <SectionHeading eyebrow="Why us" title={`Why ${brand.name}`} subtitle="Built around trust, speed and transparency." />
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-base-700 bg-base-700 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="group flex gap-4 bg-base-900 p-6 transition-colors hover:bg-base-850">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gold-700/40 bg-gold-500/10 text-gold-300 transition-transform group-hover:-translate-y-0.5">{f.icon}</span>
                <div>
                  <h3 className="font-display text-base text-ink-50">{f.title}</h3>
                  <p className="mt-1 text-sm text-ink-400">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="container-ak py-20 lg:py-28">
        <SectionHeading eyebrow="Testimonials" title="What Players Say" subtitle="Example reviews — real customer reviews will appear here." />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {placeholderReviews.map((r) => <ReviewCard key={r.author} {...r} />)}
        </div>
      </section>

      {/* Become a Booster */}
      <section className="container-ak pb-24">
        <div className="relative overflow-hidden rounded-2xl border border-gold-800/50">
          <img src={heroImg} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-right opacity-40" />
          <div className="absolute inset-0 bg-hero-overlay" />
          <div className="relative max-w-xl space-y-5 p-8 sm:p-12 lg:p-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">For players</p>
            <h2 className="font-display text-3xl font-bold text-ink-50 sm:text-4xl">Turn Your Skills Into Earnings</h2>
            <p className="text-ink-300">Join AK Team as a professional booster and earn by helping players complete their goals.</p>
            <Link to="/become-a-booster" className="inline-block">
              <Button size="lg" rightIcon={<ArrowRight size={18} />}>Become a Booster</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
