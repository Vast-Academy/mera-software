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
  CheckCircle,
  Clock,
  Wrench,
} from "lucide-react";

/* ---------- Images (ensure these exist in /public/images/team) ----------
/images/team/sandeep-singh-director.png
/images/team/jasmeet-kaur-laptop.png
/images/team/sanmeet-blazer.jpeg
/images/team/team-hero-new.jpg
/images/team/deployment-integration.png
/images/team/client-success-support.png
/images/team/quality-reliability.png
/images/team/gaurav-finance.png
/images/team/deep-operations.jpeg
--------------------------------------------------------------------------*/

const people = [
  {
    name: "Sandeep Singh",
    title: "Director",
    image: "/images/team/sandeep-singh-director.png",
    tags: [],
    focus: "Vision, planning, delivery oversight",
    icon: Crown,
  },
  {
    name: "Gaurav",
    title: "Partner • Finance & Compliance",
    image: "/images/team/gaurav-finance.png",
    tags: ["Transparent", "Accurate"],
    focus: "Finance, accounts, taxation, compliance",
    icon: Briefcase,
  },
  {
    name: "Jasmeet Kaur",
    title: "Full-Stack Developer",
    image: "/images/team/jasmeet-kaur-laptop.png",
    tags: ["Clean Code", "Reliable", "Secure"],
    focus: "Web apps, integrations, automation",
    icon: Code2,
  },
  {
    name: "Sanmeet",
    title: "Digital Marketing & SEO",
    image: "/images/team/sanmeet-blazer.jpeg",
    tags: ["ROI Focus", "Data-Driven", "Growth"],
    focus: "SEO, GBP, performance marketing",
    icon: Megaphone,
  },
  {
    name: "Deep",
    title: "Operations Manager",
    image: "/images/team/deep-operations.jpeg",
    tags: ["Organized", "Proactive", "On-time"],
    focus: "Day-to-day operations & coordination",
    icon: Users,
  },
];

const restOfTeam = [
  {
    name: "Deployment & Integration",
    desc:
      "We set up around your workflow, migrate data safely, train your team, and hand over clean documentation—so day one feels smooth.",
    image: "/images/team/deployment-integration.png",
  },
  {
    name: "Client Success & Support",
    desc:
      "Real humans, clear SLAs. Fast responses for updates, bug fixes, and small improvements—so you’re never stuck after launch.",
    image: "/images/team/client-success-support.png",
  },
  {
    name: "Quality & Reliability",
    desc:
      "No shortcuts. Manual + automated testing for speed, security, and uptime, with periodic health checks to keep things steady.",
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
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-cyan-500 to-emerald-400 opacity-60" />
        <img
          src="/images/team/team-hero-new.jpg"
          alt="Modern team collaboration"
          className="absolute inset-0 w-full h-full object-cover object-center md:object-[center_35%] opacity-35"
          fetchpriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/30 md:bg-black/20" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-white text-sm">
              <ShieldCheck className="h-4 w-4" /> After-sales support that’s actually reachable
            </div>
            <h1 className="mt-4 text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
              Meet the Team Behind{" "}
              <span className="whitespace-nowrap underline decoration-white/50">
                Mera Software
              </span>
            </h1>
            <p className="mt-3 text-white/90 text-base md:text-lg">
              Built in code, not templates. Dependable delivery with real post-launch care.
            </p>

            {/* Trust strip */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-white/80">
              <span className="text-xs md:text-sm bg-white/15 rounded-full px-3 py-1">Avg. response &lt; 4 hrs</span>
              <span className="text-xs md:text-sm bg-white/15 rounded-full px-3 py-1">Written SLAs</span>
              <span className="text-xs md:text-sm bg-white/15 rounded-full px-3 py-1">Security-first coding</span>
            </div>
          </div>
        </div>
      </header>

      {/* ============== INTRODUCTION ============== */}
      <Section
        title="Who We Are"
        subtitle="A compact, accountable team that writes custom code, owns outcomes, and stays available after delivery."
        icon={Users}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-cyan-700 mb-2">
              <CheckCircle className="h-4 w-4" />
              <p className="font-medium">Built for your business</p>
            </div>
            <p className="text-sm text-gray-700">
              Every feature is coded to fit your process—no drag-and-drop shortcuts. You get
              performance, security, and clarity in how things work.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-cyan-700 mb-2">
              <CheckCircle className="h-4 w-4" />
              <p className="font-medium">Clear ownership</p>
            </div>
            <p className="text-sm text-gray-700">
              One responsible owner per project, simple timelines, and regular check-ins. You’ll
              always know who to call and what’s next.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-cyan-700 mb-2">
              <CheckCircle className="h-4 w-4" />
              <p className="font-medium">After-sales that works</p>
            </div>
            <p className="text-sm text-gray-700">
              Practical, SLA-backed support for updates, fixes, and small changes—with a direct
              escalation path when needed.
            </p>
          </div>
        </div>
      </Section>

      {/* ============== DIRECTOR MESSAGE (unchanged text) ============== */}
      <Section
        title="Director’s Message"
        subtitle="Software is about people and trust. We don’t just ship—we stay."
        icon={Crown}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-start gap-4">
              <img
                src={people[0].image}
                alt={people[0].name}
                className="h-20 w-20 rounded-2xl object-cover object-[center_top] scale-110"
              />
              <div>
                <h3 className="text-xl font-semibold">{people[0].name}</h3>
                <p className="text-sm text-gray-600">{people[0].title}</p>
              </div>
            </div>

            <div className="mt-5 relative">
              <Quote className="absolute -left-2 -top-2 h-6 w-6 text-cyan-400" />
              <p className="pl-6 text-gray-700 leading-relaxed whitespace-pre-line">
{`At Mera Software, we keep our promise simple: ship quality code and stand with you after launch.
If something needs a fix or an update, you’ll never have to chase us—we’re here, reachable, and accountable.

We run on clarity, fair terms, and open discussion. Your success is the metric we optimize.
If we partner, consider us part of your team—today and long after go-live.

— Sandeep Singh
Director, Mera Software`}
              </p>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+919356393094"
                className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700"
              >
                <PhoneCall className="h-4 w-4 mr-2" /> +91 93563-93094
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
                Written SLAs for support & fixes
              </li>
              <li className="flex items-start gap-2">
                <Users className="h-4 w-4 mt-0.5" />
                Single point of contact
              </li>
              <li className="flex items-start gap-2">
                <Star className="h-4 w-4 mt-0.5" />
                Proactive updates & health checks
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 mt-0.5" />
                Clear escalation path to Director
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* ============== CORE LEADERSHIP (uniform size; subtle Director emphasis) ============== */}
      <Section
        title="Core Leadership"
        subtitle="Accountable people who own outcomes—and answer your call."
        icon={Users}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {people.map((p) => {
            const isDirector = p.name === "Sandeep Singh";
            return (
              <article
                key={p.name}
                className={
                  "group bg-white rounded-2xl border overflow-hidden transition-all shadow-sm hover:shadow-md " +
                  (isDirector ? "border-cyan-300 ring-1 ring-cyan-100" : "border-gray-200")
                }
              >
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-50">
                  {isDirector && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 text-[11px] font-medium text-cyan-800 bg-white/90 backdrop-blur px-2 py-0.5 rounded-full border border-cyan-200">
                      <Crown className="h-3 w-3" /> Director
                    </span>
                  )}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                    {p.icon ? <p.icon className="h-4 w-4" /> : <MonitorSmartphone className="h-4 w-4" />}
                    <span>{p.title}</span>
                  </div>
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">Focus: {p.focus}</p>
                  {p.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <Badge key={t}>{t}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* ============== TRUST METRICS STRIP ============== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 -mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-cyan-700 shrink-0" />
            <div>
              <p className="text-2xl font-semibold text-gray-900">98%</p>
              <p className="text-sm text-gray-600">On-time delivery</p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 flex items-start gap-3">
            <Clock className="h-5 w-5 text-cyan-700 shrink-0" />
            <div>
              <p className="text-2xl font-semibold text-gray-900">&lt; 4 hrs</p>
              <p className="text-sm text-gray-600">Avg. first response</p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 flex items-start gap-3">
            <Wrench className="h-5 w-5 text-cyan-700 shrink-0" />
            <div>
              <p className="text-2xl font-semibold text-gray-900">200+</p>
              <p className="text-sm text-gray-600">Post-launch fixes shipped</p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 flex items-start gap-3">
            <Users className="h-5 w-5 text-cyan-700 shrink-0" />
            <div>
              <p className="text-2xl font-semibold text-gray-900">50+</p>
              <p className="text-sm text-gray-600">Active client accounts</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============== THE REST OF OUR TEAM ============== */}
      <Section
        title="The Team Behind the Scenes"
        subtitle="People who keep delivery smooth and support responsive—day after day."
        icon={Briefcase}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {restOfTeam.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md hover:border-cyan-200 transition-all"
            >
              <img src={t.image} alt={t.name} className="h-44 w-full object-cover object-center" />
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
        title="Ready to work with a responsible team?"
        subtitle="Let’s align on goals and confirm a support plan that actually works for your business."
      >
        <div
          id="contact"
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div>
            <p className="text-gray-800 font-medium">Book a discovery call</p>
            <p className="text-sm text-gray-600">We’ll map scope, timeline, and post-launch care.</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:+919356393094"
              className="inline-flex items-center px-4 py-2 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700"
            >
              <PhoneCall className="h-4 w-4 mr-2" /> +91 93563-93094
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
        © {new Date().getFullYear()} Mera Software. All rights reserved.
      </footer>
    </div>
  );
}
