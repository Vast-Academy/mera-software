import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Home,
  Code,
  ShoppingCart,
  BookOpen,
  Users,
  Briefcase,
  Target,
  Newspaper,
  GraduationCap,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

/* ---- Accent + layout aligned to OurTeamPage (cyan/emerald, soft cards) ---- */

const faqData = [
  {
    question: "Do you build websites with WordPress or another platform?",
    answer:
      "No, we don't use WordPress. For static websites, we use HTML and CSS. For dynamic websites, we use HTML, CSS along with JavaScript, Python, PHP, Node.js, React.js, etc. For databases, we use Firebase, MongoDB, MySQL, etc.",
  },
  {
    question:
      "How many types of websites are there, and are different types of websites used for different businesses?",
    answer: (
      <>
        There are several types of websites, and different businesses often
        require different types of websites based on their specific needs. Here
        are some common types of websites and the businesses they typically
        serve:
        <br />
        <br />
        <b className="flex items-center gap-2 text-cyan-700">
          <Code className="w-5 h-5" />
          1. Static Websites:
        </b>{" "}
        <br />
        Description: These websites consist of fixed content with HTML and CSS.
        They are simple and do not require frequent updates. <br />
        Businesses: Small businesses, personal portfolios, informational sites.
        <br />
        <br />
        <b className="flex items-center gap-2 text-cyan-700">
          <Code className="w-5 h-5" />
          2. Dynamic Websites:
        </b>{" "}
        <br />
        Description: These websites feature content that can change dynamically
        based on user interaction or other factors. They often use languages
        like JavaScript, Python, PHP, and frameworks like Node.js, React.js.{" "}
        <br />
        Businesses: E-commerce, social media platforms, blogs, content
        management systems.
        <br />
        <br />
        <b className="flex items-center gap-2 text-cyan-700">
          <ShoppingCart className="w-5 h-5" />
          3. E-commerce Websites:
        </b>{" "}
        <br />
        Description: These websites are designed for selling products or
        services online. They include features like product listings, shopping
        carts, and payment gateways. <br />
        Businesses: Online retailers, marketplaces, service providers.
        <br />
        <br />
        <b className="flex items-center gap-2 text-cyan-700">
          <BookOpen className="w-5 h-5" />
          4. Blogs:
        </b>{" "}
        <br />
        Description: These are regularly updated websites or web pages,
        typically run by an individual or a small group, written in an informal
        or conversational style. <br />
        Businesses: Individuals, influencers, media companies, businesses
        looking to engage customers with content.
        <br />
        <br />
        <b className="flex items-center gap-2 text-cyan-700">
          <Briefcase className="w-5 h-5" />
          5. Portfolio Websites:
        </b>{" "}
        <br />
        Description: These showcase a person’s or a company’s work and skills.
        They are often used by artists, designers, photographers, and other
        creative professionals. <br />
        Businesses: Freelancers, creative agencies, job seekers.
        <br />
        <br />
        <b className="flex items-center gap-2 text-cyan-700">
          <Users className="w-5 h-5" />
          6. Corporate Websites:
        </b>{" "}
        <br />
        Description: These websites represent a company's brand and provide
        information about the company’s products, services, and corporate
        culture. <br />
        Businesses: Large corporations, startups, B2B companies.
        <br />
        <br />
        <b className="flex items-center gap-2 text-cyan-700">
          <Target className="w-5 h-5" />
          7. Landing Pages:
        </b>{" "}
        <br />
        Description: Single-page sites for specific campaigns, used to capture
        leads or promote a product/service. <br />
        Businesses: Marketing agencies, product launches, event promotions.
        <br />
        <br />
        <b className="flex items-center gap-2 text-cyan-700">
          <Users className="w-5 h-5" />
          8. Social Media Websites:
        </b>{" "}
        <br />
        Description: Platforms that allow users to connect and share content
        with each other, with profiles, messaging, and networking. <br />
        Businesses: Social networking platforms, community forums.
        <br />
        <br />
        <b className="flex items-center gap-2 text-cyan-700">
          <GraduationCap className="w-5 h-5" />
          9. Educational Websites:
        </b>{" "}
        <br />
        Description: Provide educational content and resources, including online
        courses, tutorials, and LMS. <br />
        Businesses: Educational institutions, online course providers, tutoring
        services.
        <br />
        <br />
        <b className="flex items-center gap-2 text-cyan-700">
          <Newspaper className="w-5 h-5" />
          10. News Websites:
        </b>{" "}
        <br />
        Description: Up-to-date news and information across topics, updated
        frequently. <br />
        Businesses: Media companies, news agencies, journalists.
        <br />
        <br />
        Different businesses have different needs, and the type of website they
        choose reflects their specific goals and audience.
      </>
    ),
  },
  {
    question: "How will we determine which website is right for our business?",
    answer:
      "For this, you'll need to talk to our agent and provide details about your business. We'll then provide you with three sample websites suitable for your business, and you can select the theme you like to start your website development process.",
  },
  {
    question:
      "How can we trust that you can create an attractive and responsive website for us?",
    answer:
      "You can trust us by looking at our previous work portfolio to understand our capabilities and expertise. We assure you that we develop attractive and responsive websites while considering your business requirements. If you have any specific queries or would like to see a demo, we can provide that as well.",
  },
  {
    question: "I want to get a website built, but I don't know what to do.",
    answer: (
      <>
        Don't worry, Just arrange a callback on our website, our agent will
        provide you with all types of information and guide you completely.{" "}
        <br />
        <a
          href="#"
          className="text-cyan-700 hover:underline font-medium"
        >
          Arrange a callback
        </a>
      </>
    ),
  },
  {
    question: "How can I avail your services?",
    answer:
      "You need to contact our agent, and then we will understand your requirements and prepare a demo for you. We will showcase three different types of website models on our website, and from there, you can select the model you like and choose a plan.",
  },
  {
    question: "Will there be any charges for the demo?",
    answer:
      "No, there won't be any charges for the demo for first-time users. However, if a client declines the demo after the first attempt, they will need to pay Rs 999 to avail the demo next time, which will be included in their website payment later. Thus, the demo will still be free for you.",
  },
  {
    question: "Will the Rs 999 demo charges be applied separately?",
    answer:
      "No, these charges will be deducted from your website's plan, and the demo will remain free for you.",
  },
  {
    question: "What type of software do you develop?",
    answer:
      "We develop CRM (Customer Relationship Management), CMS (Complaint Management System), LMS (Learning Management System), EMS (Employee Management System), and SMS (Student Management System) software.",
  },
  {
    question:
      "Can we also get a demo for software development and app development?",
    answer:
      "Yes, our system is designed so that any client can take a demo before opting for any type of service. They will get the interface they prefer, and then backend development, i.e., adding features, will be done according to the client's requirements.",
  },
  {
    question: "What will be your steps for creating a website for us?",
    answer: (
      <>
        1. To initiate the demo process, your name will be added to our client
        list on the project page of our website. <br />
        <br />
        2. Subsequently, three themes (models) aligned with your requirements
        will be uploaded for your evaluation. <br />
        <br />
        3. Upon your selection of a preferred theme, <br />
        <br />
        4. We will furnish comprehensive written documentation outlining the
        agreed features, service plan details, and total budget. Development
        will commence upon your approval of this documentation. <br />
        <br />
        5. You are required to provide all necessary digital media and textual
        details. <br />
        <br />
        6. We will keep you updated with ongoing developments and changes, and
        you will have access to track progress on our platform. <br />
        <br />
        7. Upon completion of development, you will be invited to review and
        approve your website within a 7-day period. During this time, any
        pending tasks or changes can be addressed as per the agreed
        documentation. Additional requests will be addressed separately upon
        completion of this agreement. <br />
        <br />
        8. Upon approval, your website will be deployed to your designated
        domain and hosting. <br />
        <br />
        9. Post-deployment, you will receive the source code of your website
        along with all relevant credentials. <br />
        <br />
        10. Additionally, you will benefit from complimentary maintenance
        services for a period of 3 months.
      </>
    ),
  },
  {
    question:
      "If we don't like your work, will our payment be refunded?",
    answer:
      "If we are unable to deliver the work that we agreed upon in writing, then in that case, we will refund your entire payment. However, so far, this has never happened because we have designed our system in such a way that if someone doesn't like our work, the process begins with a demo where the customer chooses the frontend look they prefer. Backend features are decided beforehand. If a customer requests something that is not feasible or beyond our capabilities, we simply do not proceed with the agreement. But to date, this has never happened.",
  },
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleAccordion = (i) => setActiveIndex(activeIndex === i ? null : i);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* ================= HERO (matches OurTeamPage palette) ================= */}
     <header className="relative overflow-hidden">
  {/* Background image */}
  <img
    src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop"
    alt="FAQ Background"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-cyan-500 to-emerald-400 opacity-60" />

  {/* Subtle black overlay for text clarity */}
  <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
    <div className="flex items-center justify-center">
      <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-white text-sm">
        <ShieldCheck className="h-4 w-4" />
        Helpful answers. Real support.
      </span>
    </div>

    <h1 className="mt-4 text-center text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
      Frequently Asked Questions
    </h1>
    <p className="mt-3 text-center text-white/90 text-base md:text-lg max-w-3xl mx-auto">
      Clear, concise answers about our process, pricing, demos, and
      post-launch support.
    </p>

    {/* Breadcrumbs */}
    <nav className="mt-6 text-sm flex justify-center items-center gap-2 text-white/80">
      <Home className="w-4 h-4" />
      <a href="/" className="hover:text-white">Home</a>
      <span>/</span>
      <span className="text-white font-medium">FAQ</span>
    </nav>
  </div>
</header>


      {/* ================= CONTENT ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
            <Lightbulb className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Common Questions
            </h2>
            <p className="text-gray-600 mt-1 max-w-3xl">
              Everything you need to know about demos, scope, timelines, and
              after-sales.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl border shadow-sm transition-all ${
                  isOpen
                    ? "border-cyan-300 shadow-md"
                    : "border-gray-200 hover:shadow-md"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className={`w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 focus:outline-none rounded-2xl ${
                    isOpen
                      ? "bg-cyan-50/60"
                      : "bg-white"
                  }`}
                >
                  <span className="text-lg md:text-xl font-semibold">
                    {item.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-6 h-6 text-cyan-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-500" />
                  )}
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 md:px-6 pb-6 pt-0 text-gray-700 leading-relaxed border-t border-gray-200">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= CTA (mirrors OurTeamPage CTA) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-gray-800 font-medium">
              Still have questions?
            </p>
            <p className="text-sm text-gray-600">
              Talk to us and we’ll map scope, timeline, and support cadence.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:+919988525252"
              className="inline-flex items-center px-4 py-2 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700"
            >
              <PhoneCall className="h-4 w-4 mr-2" /> +91 93563 93094
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-4 py-2 rounded-xl bg-white text-cyan-700 border border-cyan-200 hover:bg-cyan-50"
            >
              <ArrowRight className="h-4 w-4 mr-2" /> Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* <footer className="py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Mera Software. All rights reserved.
      </footer> */}
    </div>
  );
}
