import { PageHeader, Button, Input, Card } from '@/components/ak-ui';
import { LifeBuoy, Mail, MessageSquare, Clock } from 'lucide-react';

const channels = [
  { icon: <MessageSquare size={24} />, title: 'Live Chat', description: 'Chat with our support team in real-time, 24/7.', action: 'Start Chat' },
  { icon: <Mail size={24} />, title: 'Email Support', description: 'Send us a detailed message and we will respond within 24 hours.', action: 'Send Email' },
];

export function SupportPage() {
  return (
    <div className="container-ak py-8 lg:py-12">
      <PageHeader
        title="Support"
        subtitle="We are here to help. Reach us through any of the channels below."
      />

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {channels.map((ch) => (
          <Card key={ch.title} className="space-y-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-600/30 text-gold-400">
              {ch.icon}
            </div>
            <h3 className="font-display text-lg text-ink-50">{ch.title}</h3>
            <p className="text-sm text-ink-400">{ch.description}</p>
            <Button variant="outline" size="sm">{ch.action}</Button>
          </Card>
        ))}
      </div>

      <div className="mt-12 mx-auto max-w-lg card-surface p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500/10 border border-gold-600/30 text-gold-400">
            <LifeBuoy size={20} />
          </div>
          <h2 className="font-display text-xl text-ink-50">Submit a Ticket</h2>
        </div>
        <Input label="Subject" type="text" placeholder="Briefly describe your issue" />
        <Input label="Email" type="email" placeholder="you@example.com" />
        <div>
          <label className="block text-sm font-medium text-ink-200 mb-1.5">Message</label>
          <textarea
            className="input-base min-h-[120px] resize-y"
            placeholder="Describe your issue in detail…"
          />
        </div>
        <Button fullWidth size="lg">Submit Ticket</Button>
        <p className="text-center text-sm text-ink-400 flex items-center justify-center gap-1.5">
          <Clock size={14} /> Average response time: under 2 hours
        </p>
      </div>
    </div>
  );
}
