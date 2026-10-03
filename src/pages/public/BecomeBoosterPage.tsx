import { PageHeader, Button, Input, Select } from '@/components/ak-ui';
import { ThumbsUp, ShieldCheck, DollarSign, Clock } from 'lucide-react';

const benefits = [
  { icon: <DollarSign size={24} />, title: 'Competitive Earnings', description: 'Set your own rates and earn on your schedule.' },
  { icon: <Clock size={24} />, title: 'Flexible Hours', description: 'Work when you want. No minimum commitments.' },
  { icon: <ShieldCheck size={24} />, title: 'Secure Platform', description: 'We handle payments and disputes. You focus on boosting.' },
];

export function BecomeBoosterPage() {
  return (
    <div className="container-ak py-8 lg:py-12">
      <PageHeader
        title="Become a Booster"
        subtitle="Turn your gaming skills into income. Join our elite team."
      />

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {benefits.map((b) => (
          <div key={b.title} className="card-surface space-y-3 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-600/30 text-gold-400">
              {b.icon}
            </div>
            <h3 className="font-display text-lg text-ink-50">{b.title}</h3>
            <p className="text-sm text-ink-400">{b.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 mx-auto max-w-lg card-surface p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-gradient text-base-950">
            <ThumbsUp size={20} />
          </div>
          <h2 className="font-display text-xl text-ink-50">Booster Application</h2>
        </div>
        <Input label="Display Name" type="text" placeholder="Your gamer tag" />
        <Input label="Email" type="email" placeholder="you@example.com" />
        <Input label="Battle.net Tag" type="text" placeholder="YourTag#1234" />
        <Select
          label="Primary Specialization"
          options={[
            { value: '', label: 'Select specialization' },
            { value: 'raiding', label: 'Raiding' },
            { value: 'mythic-plus', label: 'Mythic+ Dungeons' },
            { value: 'pvp', label: 'PvP / Arena' },
            { value: 'leveling', label: 'Leveling' },
          ]}
        />
        <div>
          <label className="block text-sm font-medium text-ink-200 mb-1.5">Experience</label>
          <textarea
            className="input-base min-h-[100px] resize-y"
            placeholder="Tell us about your WoW experience and achievements…"
          />
        </div>
        <Button fullWidth size="lg">Submit Application</Button>
      </div>
    </div>
  );
}
