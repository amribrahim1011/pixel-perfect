import { PageHeader } from '@/components/ak-ui';
import { ShieldCheck, CreditCard, MessageSquare, CheckCircle2 } from 'lucide-react';

const steps = [
  { icon: <ShieldCheck size={28} />, title: 'Choose & Order', description: 'Select your service, customize options, and checkout securely. Your order is created instantly.' },
  { icon: <CreditCard size={28} />, title: 'Secure Payment', description: 'Pay safely through our encrypted payment system. Your financial information is never stored.' },
  { icon: <MessageSquare size={28} />, title: 'Get Matched', description: 'We match you with a verified booster. Chat directly and track progress in real-time.' },
  { icon: <CheckCircle2 size={28} />, title: 'Receive & Review', description: 'Your order is completed to your specifications. Leave a review and order again anytime.' },
];

const faqs = [
  { q: 'Is it safe to use AK Team?', a: 'Yes. Every booster is vetted, and we use secure payment processing. Your account safety is our top priority.' },
  { q: 'How long does an order take?', a: 'Delivery times vary by service. Each listing shows an estimated delivery time, and most orders start within minutes.' },
  { q: 'What if I am not satisfied?', a: 'We offer a satisfaction guarantee. If your order is not completed as promised, you are eligible for a full refund.' },
  { q: 'Can I chat with my booster?', a: 'Absolutely. Once your order is matched, you can communicate directly with your booster through our messaging system.' },
];

export function HowItWorksPage() {
  return (
    <div className="container-ak py-8 lg:py-12">
      <PageHeader
        title="How It Works"
        subtitle="From order to results in four simple steps."
      />

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <div key={i} className="card-surface space-y-4 p-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gold-500/10 border border-gold-600/30 text-gold-400">
              {step.icon}
            </div>
            <h3 className="font-display text-lg text-ink-50">{step.title}</h3>
            <p className="text-sm text-ink-400">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="font-display text-xl font-bold text-ink-50 mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="mx-auto max-w-2xl space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="card-surface p-5 space-y-2">
              <h3 className="font-medium text-gold-200">{faq.q}</h3>
              <p className="text-sm text-ink-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
