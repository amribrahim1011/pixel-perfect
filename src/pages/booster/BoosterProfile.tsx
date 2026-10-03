import { PageHeader, Card, Input, Button, Select } from '@/components/ak-ui';

export function BoosterProfile() {
  return (
    <div className="space-y-6">
      <PageHeader title="Booster Profile" subtitle="Manage your booster-specific information." breadcrumbs={[{ label: 'Booster', to: '/booster' }, { label: 'Profile' }]} />
      <Card className="p-6 max-w-lg space-y-5">
        <Input label="Display Name" type="text" placeholder="Your booster name" />
        <Input label="Battle.net Tag" type="text" placeholder="YourTag#1234" />
        <Select label="Primary Specialization" options={[
          { value: '', label: 'Select specialization' },
          { value: 'raiding', label: 'Raiding' },
          { value: 'mythic-plus', label: 'Mythic+ Dungeons' },
          { value: 'pvp', label: 'PvP / Arena' },
          { value: 'leveling', label: 'Leveling' },
        ]} />
        <div>
          <label className="block text-sm font-medium text-ink-200 mb-1.5">Bio</label>
          <textarea className="input-base min-h-[100px] resize-y" placeholder="Tell customers about your experience…" />
        </div>
        <Button>Save Profile</Button>
      </Card>
    </div>
  );
}
