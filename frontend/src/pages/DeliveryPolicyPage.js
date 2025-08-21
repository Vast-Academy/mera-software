import React from "react";
import {
  ShieldCheck,
  Users,
  Briefcase,
  PhoneCall,
  Mail,
  ArrowRight,
  Quote,
  Crown,
  MonitorSmartphone,
  Code2,
  Megaphone,
  Star,
} from "lucide-react";

// NOTE: TailwindCSS required. Structure unchanged; only content + images updated.

const people = [
  {
    name: "Sandeep Singh",
    title: "Director",
    image: "/images/team/sandeep-singh-director.png", // ensure exists
    tags: ["Responsible", "Serious", "Client-first"],
    focus: "Planning, UX/UI, delivery oversight",
  },
  {
    name: "Jasmeet Kaur",
    title: "Full-Stack Developer",
    image: "/images/team/jasmeet-kaur-laptop.png", // ensure exists
    tags: ["Clean Code", "Reliable", "Secure"],
    focus: "Web apps, integrations, automation",
  },
  {
    name: "Sanmeet",
    title: "Digital Marketing & SEO",
    image: "/images/team/sanmeet-blazer.jpeg", // ensure exists
    tags: ["ROI Focus", "Data-Driven", "Growth"],
    focus: "SEO, GBP, performance marketing",
  },
];

// UPDATED: role headings + descriptions tailored for Mera Software
const restOfTeam = [
  {
    name: "Deployment & Integration",
    desc:
      "Tailored setup for your workflows, secure data migration, and smooth handover with team training.",
    image: "/images/team/deployment-integration.png",
  },
  {
    name: "Client Success & Support",
    desc:
      "Real after-sales care: updates, bug fixes, SLA tracking, and quick resolutions—so you’re never stuck.",
    image: "/images/team/client-success-support.png",
  },
  {
    name: "Quality & Reliability",
    desc:
      "Manual + automated testing for performance, security, and long-term uptime you can trust.",
    image: "/images/team/quality-reliability.png",
  },
];


const Badge = ({ children }) => (
  <span className="px-2 py-0.5 text-xs rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200">
    {children}
  </span>
);

const Section = ({ title, subtitle, icon: Icon, children }) => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="flex items-center gap-3 mb-6">
      {Icon && (
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
          <Icon className="h-5 w-5" />
        </span>
      )}
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">{title}</h2>
        {subtitle && <p className="text-gray-600 mt-1 max-w-3xl">{subtitle}</p>}
      </div>
    </div>
    {children}
  </section>
);

export default function OurTeamPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* ============== HERO ============== */}
      <header className="relative overflow-hidden">
        {/* Brand gradient tint (lighter so photo shows through) */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-cyan-500 to-emerald-400 opacity-60" />

        {/* Lightened background photo */}
        <img
          src="/images/team/team-hero.png"
          alt="Software team collaboration"
          className="
            absolute inset-0 w-full h-full object-cover
            object-center md:object-[center_35%] opacity-35
          "
          fetchpriority="high"
          decoding="async"
        />

        {/* Soft contrast overlay for legibility (stronger on mobile) */}
        <div className="absolute inset-0 bg-black/30 md:bg-black/20" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-white text-sm">
              <ShieldCheck className="h-4 w-4" /> Trusted team focused on after-sales
            </div>
            <h1 className="mt-4 text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
              Meet the Team Behind{" "}
              <span className="whitespace-nowrap underline decoration-white/50">
                MeraSoftware
              </span>
            </h1>
            <p className="mt-3 text-white/90 text-base md:text-lg">
              We build exclusive, coding-based software—then stand with you after launch with
              real support and quick updates.
            </p>
          </div>
        </div>
      </header>

      {/* ============== DIRECTOR SPOTLIGHT & MESSAGE ============== */}
      <Section
        title="Director’s Message"
        subtitle="Our promise is simple: real after-sales support. We don’t just deliver and disappear—when you need updates or changes, we stay reachable and accountable."
        icon={Crown}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-start gap-4">
              <img
                src={people[0].image}
                alt={people[0].name}
                className="h-20 w-20 rounded-2xl object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold">{people[0].name}</h3>
                <p className="text-sm text-gray-600">{people[0].title}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {people[0].tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-5 relative">
              <Quote className="absolute -left-2 -top-2 h-6 w-6 text-cyan-400" />
              <p className="pl-6 text-gray-700 leading-relaxed">
                “We treat every project with long-term responsibility. Once your system goes
                live, the real work starts—so we’ve built support, maintenance, and quick update
                workflows to keep your business moving.”
              </p>
            </div>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700"
              >
                <PhoneCall className="h-4 w-4 mr-2" /> Talk to the Director
              </a>
              <a
                href="/contact-us"
                className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-white text-cyan-700 border border-cyan-200 hover:bg-cyan-50"
              >
                <Mail className="h-4 w-4 mr-2" /> Contact Us
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-cyan-50 rounded-2xl border border-cyan-100 p-6">
            <h4 className="font-semibold text-gray-900 mb-2">Our Commitment</h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 mt-0.5" />
                After-sales support with SLAs
              </li>
              <li className="flex items-start gap-2">
                <Users className="h-4 w-4 mt-0.5" />
                Dedicated success manager
              </li>
              <li className="flex items-start gap-2">
                <Star className="h-4 w-4 mt-0.5" />
                Proactive updates &amp; health checks
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 mt-0.5" />
                Clear escalation paths
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* ============== CORE LEADERSHIP ============== */}
      <Section
        title="Core Leadership"
        subtitle="Serious professionals who own outcomes and stay accountable."
        icon={Users}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {people.map((p, idx) => (
            <article
              key={p.name}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
            >
              {/* Uniform photo area — same size & crop for all */}
              <div className="h-72 w-full overflow-hidden bg-gray-50">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                  {idx === 0 && <MonitorSmartphone className="h-4 w-4" />}
                  {idx === 1 && <Code2 className="h-4 w-4" />}
                  {idx === 2 && <Megaphone className="h-4 w-4" />}
                  <span>{p.title}</span>
                </div>
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm text-gray-600">Focus: {p.focus}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ============== THE REST OF OUR TEAM ============== */}
      <Section
        title="The Team Behind the Scenes"
        subtitle="A disciplined crew that keeps delivery smooth and support responsive—built for Mera Software clients."
        icon={Briefcase}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {restOfTeam.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <img src={t.image} alt={t.name} className="h-44 w-full object-cover" />
              <div className="p-5">
                <h4 className="font-semibold">{t.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ============== CTA ============== */}
      <Section
        title="Ready to work with a responsible, serious team?"
        subtitle="Let’s align on your goals and set up a success plan with clear post-launch support."
      >
        <div
          id="contact"
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div>
            <p className="text-gray-800 font-medium">Book a discovery call</p>
            <p className="text-sm text-gray-600">We’ll map scope, timeline, and support cadence.</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:+919988525252"
              className="inline-flex items-center px-4 py-2 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700"
            >
              <PhoneCall className="h-4 w-4 mr-2" /> +91 99885 25252
            </a>
            <a
              href="/contact-us"
              className="inline-flex items-center px-4 py-2 rounded-xl bg-white text-cyan-700 border border-cyan-200 hover:bg-cyan-50"
            >
              <Mail className="h-4 w-4 mr-2" /> Contact Us
            </a>
          </div>
        </div>
      </Section>

      <footer className="py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MeraSoftware. All rights reserved.
      </footer>
    </div>
  );
}
