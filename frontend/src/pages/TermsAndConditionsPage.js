// /Practice.js
import React from "react";
import {
  Check,
  Rocket,
  ShieldCheck,
  Sparkles,
  Code2,
  FolderGit2,
  Globe2,
  MonitorSmartphone,
  Handshake,
  Layers,
  Wrench,
  Database,
  Lock,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";

/** TailwindCSS required in your project */

const Accent = () => (
  <span
    className="inline-block h-6 w-1.5 rounded-full bg-gradient-to-b from-cyan-500 to-blue-600"
    aria-hidden="true"
  />
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 text-sm bg-white border border-gray-200 rounded-full px-3 py-1 shadow-sm">
    <Check className="w-4 h-4 text-green-600" /> {children}
  </span>
);

const Stat = ({ icon: Icon, label, value }) => (
  <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-gray-100">
        <Icon className="w-5 h-5 text-blue-700" />
      </div>
      <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-xl font-semibold text-gray-900">{value}</div>
      </div>
    </div>
  </div>
);

const SplitBlock = ({ title, desc, bullets = [], img, reverse = false }) => (
  <section className="py-12 md:py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className={`grid lg:grid-cols-2 gap-10 items-center ${
          reverse ? "lg:[&>div:first-child]:order-2" : ""
        }`}
      >
        {/* Image */}
        <div className="relative">
          <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
            <img
              src={img}
              alt={title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Text */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <Accent />
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              {title}
            </h3>
          </div>
          <p className="text-gray-600 md:text-[15.5px] leading-relaxed">
            {desc}
          </p>
          {bullets.length > 0 && (
            <div className="mt-5 grid sm:grid-cols-2 gap-2">
              {bullets.map((b) => (
                <Pill key={b}>{b}</Pill>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
);

/* Ultra-clean comparison row */
const CompareRow = ({ aspect, good, bad }) => (
  <li className="rounded-xl bg-white ring-1 ring-gray-100 p-5 md:p-6">
    <div className="flex items-center gap-2">
      <h4 className="text-base md:text-lg font-semibold text-gray-900">
        {aspect}
      </h4>
    </div>
    <div className="mt-3 grid md:grid-cols-2 gap-4">
      {/* Good (Coding-based) */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700">
          <CheckCircle2 className="w-4 h-4" /> Coding-based
        </div>
        <p className="mt-1.5 text-[15px] text-gray-700 leading-relaxed">{good}</p>
      </div>
      {/* Bad (No-code/Builders) */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-700">
          <XCircle className="w-4 h-4" /> No-code / Builders
        </div>
        <p className="mt-1.5 text-[15px] text-gray-700 leading-relaxed">{bad}</p>
      </div>
    </div>
  </li>
);

export default function Practice() {
  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-white">
      {/* HERO */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(45rem_20rem_at_50%_-10%,rgba(59,130,246,0.10),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-16 pb-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900"
              >
                100% Coding-Based Websites — Clean, Fast & Fully Yours
              </motion.h1>
              <p className="mt-4 text-gray-600 md:text-lg max-w-2xl">
                We build professional websites with pure code — no builders, no
                bloat. You get complete ownership, long-term reliability, and a
                design system tailored to your brand.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <Pill>Full source code handover</Pill>
                <Pill>High Lighthouse scores</Pill>
                <Pill>Semantic SEO structure</Pill>
                <Pill>Exclusive, custom solution</Pill>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Stat icon={Code2} label="Stack" value="Pure Code" />
              <Stat icon={ShieldCheck} label="Security" value="Lean Surface" />
              <Stat icon={Rocket} label="Performance" value="90+ Target" />
              <Stat icon={FolderGit2} label="Source" value="Git-Ready" />
            </div>
          </div>
        </div>
      </header>

      {/* WHY CODING-FIRST */}
      <SplitBlock
        title="Why coding-first beats templates"
        desc="Template/CMS tools are quick to start, but heavy plugins and fixed layouts limit performance, security, and brand precision. A coding-first approach delivers tight control, predictable SEO, and a UI that fits your content perfectly."
        img="https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1600&auto=format&fit=crop"
        bullets={[
          "Predictable SEO & clean HTML",
          "No vendor lock-in",
          "Pixel-perfect components",
          "Auditable, portable code",
        ]}
      />

      {/* OUR PROCESS */}
      <SplitBlock
        reverse
        title="Simple, transparent process"
        desc="We start with discovery, align on scope, and share a clickable prototype. Then we build in clean, reviewable sprints with documentation. You approve each step from your client space."
        img="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1600&auto=format&fit=crop"
        bullets={[
          "Discovery & scope freeze",
          "Prototype & feedback",
          "Documented build",
          "Approval-based delivery",
        ]}
      />

      {/* EXCLUSIVE SOLUTION */}
      <SplitBlock
        title="Exclusive solution for every customer"
        desc="No one-size-fits-all. We gather your exact requirements, propose the most suitable stack, and craft components that match your flows. Your site looks original and remains easy to extend later."
        img="https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop"
        bullets={[
          "Requirement-first planning",
          "Tailored architecture",
          "Reusable UI library",
          "Future-ready structure",
        ]}
      />

      {/* FEATURES GRID */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Accent />
              Core advantages
            </h2>
            <p className="mt-2 text-gray-600 max-w-3xl">
              What you gain with a clean, code-driven build.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Rocket,
                title: "Speed",
                text: "Minimal scripts, optimized assets, better Core Web Vitals.",
              },
              {
                icon: Globe2,
                title: "SEO foundation",
                text: "Semantic HTML, structured content, and crawlable routes.",
              },
              {
                icon: ShieldCheck,
                title: "Security",
                text: "Small dependency surface; updates are intentional.",
              },
              {
                icon: MonitorSmartphone,
                title: "Responsive UI",
                text: "Component-first design ensures consistency across devices.",
              },
              {
                icon: FolderGit2,
                title: "Version control",
                text: "Git-ready repo with clear commits and review workflow.",
              },
              {
                icon: Sparkles,
                title: "Bespoke design",
                text: "No template look-alikes — precise to your brand.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-blue-50 border border-blue-100">
                    <Icon className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{title}</h4>
                    <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed">
                      {text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OWNERSHIP / HANDOVER */}
      <SplitBlock
        reverse
        title="You keep full control"
        desc="All assets, hosting and repositories remain in your accounts. We hand over the entire source code with environment & build docs, so you can migrate or collaborate with anyone later."
        img="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop"
        bullets={[
          "Complete source + assets",
          "Env & build documentation",
          "Transparent handover",
        ]}
      />

      {/* TECH SNAPSHOT / WHAT YOU GET */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Accent />
              What you get
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Layers,
                title: "Clean architecture",
                text: "Organized folders, reusable components, clear naming.",
              },
              {
                icon: Wrench,
                title: "Maintainability",
                text: "Predictable structure for quick fixes and new features.",
              },
              {
                icon: Database,
                title: "Scalability",
                text: "Ready for growth without rewrites or platform limits.",
              },
              {
                icon: Lock,
                title: "Reliability",
                text: "Lean stack reduces risk from third-party plugin breaks.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-blue-50 border border-blue-100">
                    <Icon className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{title}</h4>
                    <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed">
                      {text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ULTRA-CLEAN COMPARISON (tone-matched, lightweight) */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Accent />
              Coding-based vs Website Builders
            </h2>
            <p className="mt-2 text-gray-600 max-w-3xl">
              Clear, practical differences — focused on control, performance, security, and SEO.
            </p>
          </div>

          <ul className="space-y-4">
            <CompareRow
              aspect="Ownership"
              good="Full source in your repo — independent, portable, auditable."
              bad="Vendor/theme/plugin lock-in; limited access to underlying code."
            />
            <CompareRow
              aspect="Performance"
              good="Optimized bundles and lean markup — faster loads, better Core Web Vitals."
              bad="Heavy scripts & plugins slow pages; scores fluctuate with add-ons."
            />
            <CompareRow
              aspect="Security"
              good="Smaller dependency surface; updates are reviewed and intentional."
              bad="Plugin vulnerabilities are common; constant patching and break risk."
            />
            <CompareRow
              aspect="Design & UX"
              good="Tailor-made components; brand-true, reusable, consistent UI."
              bad="Template constraints; deep customizations become brittle."
            />
            <CompareRow
              aspect="Scalability"
              good="Grows with your needs; features added without platform limits."
              bad="Bound by platform features; advanced needs often force migration."
            />
            <CompareRow
              aspect="SEO"
              good="Semantic, clean HTML; predictable structure for stable ranking."
              bad="Bloated markup; SEO depends on plugins and can be inconsistent."
            />
          </ul>

          <p className="mt-5 text-xs text-gray-500">
            For long-term reliability and growth, coding-first keeps control, speed, and SEO in your favor.
          </p>
        </div>
      </section>

      {/* TRUST / CTA */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 md:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-xl md:text-2xl font-bold">
                Ready for a coding-first build with full control?
              </h3>
              <p className="text-white/90">
                Get a quick discovery call and see a clickable prototype.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-4 py-2 rounded-xl shadow hover:shadow-md"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Simple trust row */}
          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
              <Handshake className="w-5 h-5 text-blue-700" />
              <p className="text-sm text-gray-700">
                Transparent approvals at every step
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
              <FolderGit2 className="w-5 h-5 text-blue-700" />
              <p className="text-sm text-gray-700">Full repository handover</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
              <Rocket className="w-5 h-5 text-blue-700" />
              <p className="text-sm text-gray-700">Performance-first delivery</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} — Built the right way, with code.
      </footer>
    </div>
  );
}
