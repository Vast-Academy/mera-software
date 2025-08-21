import React, { useMemo, useState } from "react";

/**
 * Contact Page for MeraSoftware.com
 * - Tailwind CSS
 * - Accessible labels & descriptions
 * - Client-side validation
 * - Honeypot anti-spam field
 * - API POST → "/api/contact" (adjust as needed)
 * - Embeddable Google Map (replace with your place ID)
 * - FAQ accordion + contact options
 * - JSON-LD (ContactPage + Organization)
 */

const fieldBase =
  "block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500";

const Section = ({ children, className = "" }) => (
  <section className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

export default function ContactPage() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "Website",
    budget: "",
    message: "",
    newsletter: false,
    // honeypot
    company_url: "",
  });

  const projectTypes = [
    "Website",
    "Web Application",
    "Mobile App",
    "UI/UX Design",
    "Automation / Integrations",
    "Consultation",
    "Other",
  ];

  const budgets = [
    "< ₹25,000",
    "₹25,000 – ₹50,000",
    "₹50,000 – ₹1,00,000",
    "₹1,00,000 – ₹3,00,000",
    "> ₹3,00,000",
    "Not sure yet",
  ];

  function validate(values) {
    const e = {};
    if (!values.name?.trim()) e.name = "Please enter your name.";
    if (!values.email?.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) e.email = "Enter a valid email.";
    if (values.phone && !values.phone.match(/^[0-9+\-()\s]{6,}$/)) e.phone = "Enter a valid phone (digits only).";
    if (!values.message?.trim()) e.message = "Tell us a bit about your project.";
    if (values.company_url) e.spam = "Spam detected"; // honeypot
    return e;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) {
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "contact-page" }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectType: "Website",
        budget: "",
        message: "",
        newsletter: false,
        company_url: "",
      });
    } catch (err) {
      setStatus("error");
    }
  }

  const ldJson = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Contact Mera Software",
    url: "https://merasoftware.com/contact",
    isPartOf: { "@type": "WebSite", name: "Mera Software", url: "https://merasoftware.com" },
    mainEntity: {
      "@type": "Organization",
      name: "Mera Software",
      url: "https://merasoftware.com",
      email: "hello@merasoftware.com",
      telephone: "+91 93563-93094",
      address: {
        "@type": "PostalAddress",
        streetAddress: "VAST ACADEMY",
        addressLocality: "Amritsar",
        addressRegion: "Punjab",
        postalCode: "143001",
        addressCountry: "IN",
      },
    },
  }), []);

  return (
    <>
      {/* SEO */}
      <title>Contact Mera Software – Talk to an Expert</title>
      <meta name="description" content="Contact Mera Software for custom-coded websites, web apps, and mobile apps. Get a free consultation and project estimate." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />

      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-50 via-white to-white">


        <Section className="py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="mb-3 inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">We reply within 24 hours</p>
              <h1 className="text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">Let’s Build Something Reliable, Fast & Yours</h1>
              <p className="mt-4 max-w-2xl text-slate-600">No templates, no shortcuts. Tell us what you need and our team will suggest the cleanest approach, accurate timelines, and a fair price—plus real after‑sales support.</p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">📞 +91 93563-93094</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">✉️ hello@merasoftware.com</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">🕘 Mon–Sat, 9:30am–7:00pm</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-emerald-200/30 blur-2xl" />
              <img
                alt="Team collaboration dashboard"
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1600&auto=format&fit=crop"
                className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
              />
            </div>
          </div>
        </Section>
      </div>

      {/* Contact options */}
      <Section className="py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Call Us",
              desc: "Talk to a human about your idea or issue.",
              action: "+91 93563-93094",
              href: "tel:+919356393094",
              icon: "📞",
            },
            {
              title: "Email",
              desc: "Share your brief, docs or RFQ.",
              action: "hello@merasoftware.com",
              href: "mailto:hello@merasoftware.com",
              icon: "✉️",
            },
            {
              title: "WhatsApp",
              desc: "Quick questions & follow‑ups.",
              action: "+91 93563-93094",
              href: "https://wa.me/919356393094",
              icon: "💬",
            },
          ].map((c) => (
            <a key={c.title} href={c.href} className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="text-2xl">{c.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{c.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{c.desc}</p>
                  <p className="mt-3 text-emerald-700">{c.action} →</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* Form + Map */}
      <Section className="py-6 lg:py-10">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900">Start a Project</h2>
            <p className="mt-1 text-sm text-slate-600">Fill this form and we’ll get back with the next steps.</p>

            {status === "success" ? (
              <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-emerald-800">
                <p className="font-semibold">Thanks! Your message is on its way.</p>
                <p className="text-sm">We’ll reply within one business day. For urgent matters, call or WhatsApp.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
                {/* Honeypot */}
                <input
                  type="text"
                  id="company_url"
                  name="company_url"
                  autoComplete="off"
                  tabIndex="-1"
                  className="hidden"
                  value={form.company_url}
                  onChange={(e) => setForm({ ...form, company_url: e.target.value })}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">Full name *</label>
                    <input id="name" className={fieldBase} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    {errors.name && <p className="mt-1 text-sm text-rose-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">Email *</label>
                    <input id="email" type="email" className={fieldBase} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    {errors.email && <p className="mt-1 text-sm text-rose-600">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700">Phone</label>
                    <input id="phone" inputMode="tel" className={fieldBase} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    {errors.phone && <p className="mt-1 text-sm text-rose-600">{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="company" className="mb-1 block text-sm font-medium text-slate-700">Company (optional)</label>
                    <input id="company" className={fieldBase} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="projectType" className="mb-1 block text-sm font-medium text-slate-700">Project type</label>
                    <select id="projectType" className={fieldBase} value={form.projectType} onChange={(e) => setForm({ ...form, projectType: e.target.value })}>
                      {projectTypes.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="mb-1 block text-sm font-medium text-slate-700">Estimated budget</label>
                    <select id="budget" className={fieldBase} value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}>
                      {budgets.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700">Project details *</label>
                  <textarea id="message" rows={5} className={fieldBase} placeholder="What are you building? Any deadlines? Links welcome." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  {errors.message && <p className="mt-1 text-sm text-rose-600">{errors.message}</p>}
                </div>

                <label className="flex items-center gap-3 text-sm text-slate-700">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" checked={form.newsletter} onChange={(e) => setForm({ ...form, newsletter: e.target.checked })} />
                  Keep me posted about product updates & tips
                </label>

                {errors.spam && <p className="text-sm text-rose-600">{errors.spam}</p>}

                <div className="pt-2">
                  <button disabled={status === "sending"} className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:opacity-60">
                    {status === "sending" ? "Sending…" : "Send message"}
                  </button>
                  <p className="mt-2 text-xs text-slate-500">By submitting, you agree to our Terms and Privacy Policy.</p>
                </div>
              </form>
            )}
          </div>

          {/* Map & office */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <iframe
                title="Mera Software on Google Maps"
                src="https://www.google.com/maps?q=Ranjit%20Avenue%2C%20Amritsar&output=embed"
                className="h-80 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="grid gap-4 p-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Office</h3>
                  <p className="mt-1 text-sm text-slate-600">Ranjit Avenue, Amritsar, Punjab 143001</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Hours</h3>
                  <p className="mt-1 text-sm text-slate-600">Mon–Sat: 9:30am – 7:00pm</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-emerald-50 p-6 text-emerald-900">
              <h3 className="text-base font-semibold">After‑Sales Support Promise</h3>
              <p className="mt-1 text-sm">
                We don’t vanish after delivery. Get updates, bug fixes, and help whenever you need—fast responses via WhatsApp and email.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="py-6 pb-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {[
              {
                q: "How soon can you start?",
                a: "For most projects we can start within 5–7 working days after the scope is finalised.",
              },
              {
                q: "Do you work with fixed budgets?",
                a: "Yes. We’ll suggest the cleanest way to meet your goals and offer a fixed quote with clear milestones.",
              },
              {
                q: "Will you maintain our site/app?",
                a: "Absolutely. We provide maintenance plans with SLAs for updates, uptime and quick issue resolution.",
              },
            ].map((item, i) => (
              <details key={i} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-slate-800">
                  <span className="font-medium">{item.q}</span>
                  <span className="ml-4 rounded-full border border-slate-200 px-2 py-0.5 text-xs text-slate-500 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 text-sm text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <div className="bg-emerald-600">
        <Section className="py-12 text-center text-white">
          <h3 className="text-2xl font-semibold">Prefer talking to a human?</h3>
          <p className="mt-2 opacity-90">Call us now and we’ll guide you step‑by‑step.</p>
          <a href="tel:+919356393094" className="mt-5 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-50">Call +91 93563-93094</a>
        </Section>
      </div>
    </>
  );
}

/**
 * --- OPTIONAL SERVER ROUTE EXAMPLE (Express/Node) ---
 * Place this in your server or /api/contact (Next.js). Adjust as needed.
 *
 * import express from 'express';
 * import nodemailer from 'nodemailer';
 * const app = express();
 * app.use(express.json());
 * app.post('/api/contact', async (req, res) => {
 *   const { name, email, phone, company, projectType, budget, message, company_url } = req.body;
 *   if (company_url) return res.status(200).json({ ok: true }); // honeypot
 *   // TODO: Validate + persist to DB/Sheet/CRM
 *   // TODO: Send notification email via Nodemailer or any provider
 *   res.json({ ok: true });
 * });
 */

