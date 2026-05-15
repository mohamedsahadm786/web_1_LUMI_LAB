import { useState } from 'react';
import Reveal from '../components/Reveal';
import RevealText from '../components/RevealText';

const DETAILS = [
  { label: 'Visit', value: 'Level 5, Dubai, UAE' },
  { label: 'Email', value: 'sales@lumauae.com', href: 'mailto:sales@lumauae.com' },
  { label: 'Call', value: '+971 54 380 0625', href: 'tel:+971543800625' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [done, setDone] = useState(false);

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="shell grid gap-14 lg:grid-cols-2 lg:items-start">
        {/* left */}
        <div>
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/45">
              <span className="h-px w-8 bg-white/40" /> Get in Touch
            </p>
          </Reveal>
          <RevealText
            as="h2"
            className="font-display text-3xl font-medium leading-[1.12] text-white md:text-[2.7rem]"
          >
            Reach out — we&rsquo;re here to support you
          </RevealText>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-base text-body">
              Reach out anytime for product details, order help, or personalised
              assistance — we&rsquo;re here to support you smoothly.
            </p>
          </Reveal>

          <div className="mt-10 space-y-px overflow-hidden rounded-2xl border border-hairline bg-hairline">
            {DETAILS.map((d) => (
              <div
                key={d.label}
                className="flex items-center justify-between bg-ink px-6 py-5"
              >
                <span className="text-xs uppercase tracking-[0.25em] text-white/40">
                  {d.label}
                </span>
                {d.href ? (
                  <a href={d.href} className="text-white hover:opacity-70">
                    {d.value}
                  </a>
                ) : (
                  <span className="text-white">{d.value}</span>
                )}
              </div>
            ))}
          </div>

          <Reveal delay={0.2}>
            <a
              href="https://wa.me/971543800625"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-whatsapp px-7 py-3.5 text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.04]"
            >
              Chat With Us <span aria-hidden>&rarr;</span>
            </a>
          </Reveal>
        </div>

        {/* form */}
        <Reveal from="right">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
            className="rounded-3xl border border-hairline bg-surface p-7 md:p-10"
          >
            <h3 className="mb-7 font-display text-2xl text-white">
              Send a Message
            </h3>
            <div className="space-y-5">
              {(['name', 'email'] as const).map((f) => (
                <div key={f}>
                  <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/40">
                    {f}
                  </label>
                  <input
                    required
                    type={f === 'email' ? 'email' : 'text'}
                    value={form[f]}
                    onChange={(e) =>
                      setForm({ ...form, [f]: e.target.value })
                    }
                    className="w-full border-b border-hairline bg-transparent pb-3 text-white outline-none transition-colors focus:border-white"
                  />
                </div>
              ))}
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-white/40">
                  Message
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full resize-none border-b border-hairline bg-transparent pb-3 text-white outline-none transition-colors focus:border-white"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-9 w-full rounded-full bg-white py-3.5 text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.02]"
            >
              {done ? 'Message Sent — Thank You' : 'Submit Enquiry'}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
