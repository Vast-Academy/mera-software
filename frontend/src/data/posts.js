// src/data/posts.js
export const POSTS = [
  {
    id: "top-5-software-websites-amritsar-2025",
    slug: "top-5-software-websites-amritsar-2025",
    title: "Top 5 Software Development Websites in Amritsar (2025) — Includes Mera Software",
    excerpt:
      "A practical roundup of well-designed, fast, and informative software company sites from Amritsar—what they do right and what to learn.",
    category: "Roundups",
    author: "Mera Software Team",
    date: "2025-08-20",
    readingTime: 6,
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop",
    content: `
### Shortlist (alphabetical)
- **CodeCraft Amritsar** — clean case studies, fast pages, clear CTAs
- **DevPunjab Labs** — good technical blogging, GitHub links
- **Mera Software** — custom-coded focus, performance-first builds, after-sales care
- **PixelForge IT** — strong service navigation, schema done right
- **SoftSphere Tech** — transparent pricing tiers, quick contact access

#### What they do right
1) Clear services navigation and contact options  
2) Real portfolio/work proof  
3) Helpful content (blogs, FAQs)  
4) Speed + Core Web Vitals attention  
5) Trust signals (reviews, address, GBP)

> Tip: Use these benchmarks when you evaluate any vendor’s site (including ours).
    `,
  },
  {
    id: "5-things-before-getting-website",
    slug: "5-things-before-getting-website",
    title:
      "5 Things to Check Before Getting a Website: Features, Functionality, Speed, Freedom & Why Coding Beats Builders",
    excerpt:
      "Avoid regret. Use this checklist to choose a website that performs today and scales tomorrow—without platform lock-in.",
    category: "Buyer Guides",
    author: "Mera Software Team",
    date: "2025-08-20",
    readingTime: 8,
    image:
      "https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=1600&auto=format&fit=crop",
    content: `
### The 5 that matter
1) **Features** — multi-lang, blogs, forms, dashboards, user roles  
2) **Functionality** — integrations (payments/WhatsApp/CRMs), admin, automation  
3) **Speed** — Lighthouse 90+, image optimization, CDN/caching, clean JS  
4) **Freedom** — own your code, hosting, and data; no theme/plugin lock-in  
5) **Choose coding-based (not builders)** — for security, scale, custom UX, and lower long-term cost

> Bottom line: get a custom-coded base you can grow, not a template you fight.
    `,
  },
  {
    id: "custom-websites-vs-builders",
    slug: "custom-websites-vs-builders",
    title: "Custom-Coded Websites vs Website Builders: What’s Right for Your Business?",
    excerpt:
      "We compare cost, performance, security, and long-term ownership to help you choose.",
    category: "Web Development",
    author: "Mera Software Team",
    date: "2025-08-12",
    readingTime: 7,
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop",
    content: "Coming soon.",
  },
  {
    id: "app-dev-cost-india",
    slug: "mobile-app-development-cost-india",
    title: "Mobile App Development Cost in India (2025): A Practical Breakdown",
    excerpt:
      "From MVP to launch—feature scope, team composition, and hosting decisions explained.",
    category: "Mobile Apps",
    author: "Mera Software Team",
    date: "2025-08-10",
    readingTime: 11,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
    content: "Coming soon.",
  },
];
  
export const getPostBySlug = (slug) => POSTS.find((p) => p.slug === slug);
