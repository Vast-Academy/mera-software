// src/pages/Blog.js
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { POSTS } from "../data/posts";

/* ---------- Small UI helpers ---------- */
function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/20">
      {children}
    </span>
  );
}

function ArticleLink({ to, children }) {
  return (
    <Link
      to={to}
      className="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
    >
      {children}
    </Link>
  );
}

function ArticleCard({ post }) {
  return (
    <article className="group grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg sm:grid-cols-[40%_1fr]">
      <div className="relative h-48 w-full sm:h-full">
        <img
          src={post.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-3 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="rounded bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700 ring-1 ring-teal-200">
            {post.category}
          </span>
          <span className="text-xs text-slate-500">Updated: {formatDate(post.date)}</span>
          <span className="text-xs text-slate-500">• {post.readingTime} min read</span>
        </div>
        <h3 className="text-xl font-bold leading-tight text-slate-900">
          <ArticleLink to={`/blog/${post.slug}`}>
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent group-hover:from-teal-700 group-hover:to-teal-600">
              {post.title}
            </span>
          </ArticleLink>
        </h3>
        <p className="line-clamp-2 text-slate-600">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-sm text-slate-500">By {post.author}</span>
          <ArticleLink to={`/blog/${post.slug}`}>
            <span className="text-sm font-semibold text-teal-700 hover:text-teal-800">
              Read more →
            </span>
          </ArticleLink>
        </div>
      </div>
    </article>
  );
}

function EmptyState({ query }) {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-dashed border-slate-300 p-10 text-center">
      <div className="mb-3 text-2xl">🔍</div>
      <h4 className="mb-2 text-lg font-semibold">No results</h4>
      <p className="text-sm text-slate-600">
        We couldn't find any posts matching <span className="font-semibold">“{query}”</span>.
      </p>
    </div>
  );
}

/* ---------- Content helpers for Featured ---------- */
const FALLBACK_TAKEAWAYS = [
  "Compare UI quality, performance, and SEO basics before shortlisting.",
  "Prefer transparent pricing and clear after-sales commitments.",
  "Check real portfolio depth, not just homepage visuals.",
];

const FALLBACK_CHECKLIST = [
  "Mobile speed ≥ 85 (Lighthouse) & clean code.",
  "Clear scope, timelines, and change policy.",
  "Post-launch support (bug fixes, security updates).",
];

function deriveTakeaways(post) {
  // If you later add post.keyPoints in posts.js, we’ll use it automatically.
  if (post?.keyPoints && Array.isArray(post.keyPoints) && post.keyPoints.length) {
    return post.keyPoints.slice(0, 3);
  }
  // Light category-based flavour
  if (post?.category?.toLowerCase().includes("buyer")) {
    return [
      "Define must-have features vs. nice-to-have to avoid scope creep.",
      "Shortlist vendors who ship custom code and provide ownership.",
      "Use a written checklist to compare options fairly.",
    ];
  }
  return FALLBACK_TAKEAWAYS;
}

function deriveChecklist(post) {
  if (post?.checklist && Array.isArray(post.checklist) && post.checklist.length) {
    return post.checklist.slice(0, 3);
  }
  if (post?.category?.toLowerCase().includes("web")) {
    return [
      "Responsive across devices & browsers.",
      "On-page SEO (meta, schema, clean URLs).",
      "Security basics (HTTPS, updates, backups).",
    ];
  }
  return FALLBACK_CHECKLIST;
}

/* ---------- Main Page ---------- */
function Blog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");

  const CATEGORIES = useMemo(
    () => ["All", ...Array.from(new Set(POSTS.map((p) => p.category))).sort()],
    []
  );

  const filtered = useMemo(() => {
    let rows = POSTS.filter((p) =>
      [p.title, p.excerpt, p.category].join(" ").toLowerCase().includes(query.toLowerCase())
    );
    if (category !== "All") rows = rows.filter((p) => p.category === category);
    rows.sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);
      if (sort === "za") return b.title.localeCompare(a.title);
      return new Date(b.date).valueOf() - new Date(a.date).valueOf(); // newest
    });
    return rows;
  }, [query, category, sort]);

  const featured = filtered[0];
  const takeaways = featured ? deriveTakeaways(featured) : [];
  const checklist = featured ? deriveChecklist(featured) : [];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Mera Software Blog
          </h1>
          <p className="mt-3 max-w-3xl text-base text-teal-100 sm:text-lg">
            Security & IT insights for Amritsar — custom-coded websites, apps, access control,
            biometrics, networking.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Badge>Web Development</Badge>
            <Badge>Mobile Apps</Badge>
            <Badge>SEO</Badge>
            <Badge>Automation</Badge>
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full items-center gap-2 sm:w-auto">
              <input
                type="search"
                placeholder="Search articles…"
                className="w-full sm:w-96 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm shadow-inner outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-slate-600">Sort</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
              >
                <option value="newest">Newest</option>
                <option value="az">A → Z</option>
                <option value="za">Z → A</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Featured — ENRICHED CONTENT */}
      {featured && (
        <section className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid items-stretch gap-6 lg:grid-cols-[1.15fr_1fr]">
            {/* Left: Tall, self-contained featured card with extra content */}
            <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 h-full flex flex-col">
              {/* Image + title overlay */}
              <div className="relative">
                <img src={featured.image} alt="" className="h-72 w-full object-cover sm:h-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <span className="mb-2 inline-block rounded bg-white/90 px-2.5 py-1 text-xs font-medium text-teal-800 ring-1 ring-teal-200">
                    {featured.category}
                  </span>
                  <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                    <ArticleLink to={`/blog/${featured.slug}`}>{featured.title}</ArticleLink>
                  </h2>
                </div>
              </div>

              {/* NEW: rich content block */}
              <div className="px-5 py-5 sm:px-6 sm:py-6 space-y-4">
                <p className="text-slate-700">
                  {featured.excerpt || "Discover who’s building the best-performing, most reliable software websites in Amritsar—and how to choose objectively."}
                </p>

                {/* Key takeaways */}
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-slate-900">Key takeaways</h4>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
                    {takeaways.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>

                {/* Quick checklist */}
                {/* <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <h4 className="mb-2 text-sm font-semibold text-slate-900">Quick checklist</h4>
                  <ul className="space-y-1 text-sm text-slate-700">
                    {checklist.map((c, i) => (
                      <li key={i}>✅ {c}</li>
                    ))}
                  </ul>
                </div> */}

                {/* Quick facts */}
                {/* <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 sm:grid-cols-3">
                  <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                    <div className="font-semibold text-slate-800">Updated</div>
                    <div>{formatDate(featured.date)}</div>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                    <div className="font-semibold text-slate-800">Reading time</div>
                    <div>{featured.readingTime} min</div>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                    <div className="font-semibold text-slate-800">Category</div>
                    <div>{featured.category}</div>
                  </div>
                </div> */}

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
                    Roundup
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                    Web Design
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                    Amritsar
                  </span>
                </div>
              </div>

              {/* Meta + CTA pinned to bottom */}
              <div className="mt-auto flex items-center justify-between border-t border-slate-200 px-5 pb-5 pt-3 text-sm text-slate-600 sm:px-6">
                <span>By {featured.author} • {featured.readingTime} min read</span>
                <ArticleLink to={`/blog/${featured.slug}`}>
                  <span className="rounded-lg bg-teal-600 px-3 py-2 font-semibold text-white hover:bg-teal-700">
                    Read article →
                  </span>
                </ArticleLink>
              </div>
            </div>

            {/* Right: Two standard cards */}
            <div className="grid gap-5">
              {filtered.slice(1, 3).map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h3 className="mb-4 text-lg font-semibold text-slate-800">All Articles</h3>
        {filtered.length === 0 ? (
          <EmptyState query={query || category} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.slice(1).map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Blog;
