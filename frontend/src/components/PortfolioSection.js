import React from 'react'

const PortfolioSection = () => {
  return (
        <div className="min-h-screen bg-white">

       {/* PORTFOLIO HIGHLIGHTS – drop‑in section with web images */}
<section id="portfolio" className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    {/* Header */}
    <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h2 className="text-4xl font-bold text-gray-900">Portfolio Highlights</h2>
        <p className="mt-2 max-w-2xl text-gray-600">
          100+ deliveries across industries — here are a few representative builds.
        </p>
      </div>
      <div className="flex gap-2">
        <a
          href="/our-portfolio"
          className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
        >
          View Full Portfolio
        </a>
        <a
          href="#contact"
          className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 ring-1 ring-gray-200 hover:bg-gray-50"
        >
          Request a Demo
        </a>
      </div>
    </div>

    {/* Impact stats */}
    <div className="mb-10 grid grid-cols-3 gap-3 sm:gap-4">
      <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow">
        <div className="text-2xl font-extrabold text-gray-900">100+</div>
        <div className="mt-1 text-xs font-medium text-gray-600">Projects Delivered</div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow">
        <div className="text-2xl font-extrabold text-gray-900">12+</div>
        <div className="mt-1 text-xs font-medium text-gray-600">Industries</div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-4 text-center shadow">
        <div className="text-2xl font-extrabold text-gray-900">4.8/5</div>
        <div className="mt-1 text-xs font-medium text-gray-600">Avg. Rating</div>
      </div>
    </div>

    {/* 3 Highlights (using web images) */}
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[
        {
          title: "Modern Business Website",
          type: "Website",
          blurb: "Clean UI with lead forms.",
          image:
            "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=60",
          href: "#",
          alt: "Laptop with modern business website UI",
        },
        {
          title: "Operations CRM",
          type: "Software",
          blurb: "Workflow tracking & roles.",
          image:
            "https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&w=1200&q=60",
          href: "#",
          alt: "Dashboard UI for CRM operations",
        },
        {
          title: "Appointment Booking App",
          type: "Software",
          blurb: "Scheduling with notifications.",
          image:
            "https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=1200&q=60",
          href: "#",
          alt: "Phone showing appointment booking app",
        },
      ].map((h) => (
        <a
          key={h.title}
          href={h.href}
          className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow hover:shadow-lg"
        >
          <div className="relative">
            <div className="aspect-[16/10] bg-gray-50">
              <img
                src={h.image}
                alt={h.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-700 ring-1 ring-gray-200">
              {h.type}
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-2 p-4">
            <h3 className="line-clamp-1 text-lg font-semibold text-gray-900">{h.title}</h3>
            <p className="line-clamp-2 text-sm text-gray-700">{h.blurb}</p>
          </div>
        </a>
      ))}
    </div>

    {/* Snapshot strip (web images for breadth) */}
    <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-3 shadow">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Snapshot Wall</h3>
        <span className="text-xs text-gray-500">Glimpses from various builds</span>
      </div>
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">
        {[
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=300&h=300&q=60",
          "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&h=300&q=60",
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&h=300&q=60",
          "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=300&h=300&q=60",
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=300&h=300&q=60",
          "https://images.unsplash.com/photo-1541560052-77ec6f20e33c?auto=format&fit=crop&w=300&h=300&q=60",
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=300&h=300&q=60",
          "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=300&h=300&q=60",
          "https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=300&h=300&q=60",
          "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=300&h=300&q=60",
        ].map((src, i) => (
          <div key={i} className="overflow-hidden rounded-xl bg-gray-50 ring-1 ring-gray-100">
            <img
              src={src}
              alt={`Snapshot ${i + 1}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default PortfolioSection;
