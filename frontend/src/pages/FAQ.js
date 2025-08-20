import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb, Code, ShoppingCart, BookOpen, Users, Briefcase, Target, Newspaper, GraduationCap, PhoneCall, Home } from 'lucide-react'; // Added more Lucide Icons

const faqData = [
  {
    question: "Do you build websites with WordPress or another platform?",
    answer: "No, we don't use WordPress. For static websites, we use HTML and CSS. For dynamic websites, we use HTML, CSS along with JavaScript, Python, PHP, Node.js, React.js, etc. For databases, we use Firebase, MongoDB, MySQL, etc."
  },
  {
    question: "How many types of websites are there, and are different types of websites used for different businesses?",
    answer: (
      <>
        There are several types of websites, and different businesses often require different types of websites based on their specific needs. Here are some common types of websites and the businesses they typically serve:
        <br /><br />
        <b className="flex items-center gap-2 text-blue-700"><Code className="w-5 h-5" />1. Static Websites:</b> <br />
        Description: These websites consist of fixed content with HTML and CSS. They are simple and do not require frequent updates. <br />
        Businesses: Small businesses, personal portfolios, informational sites.
        <br /><br />
        <b className="flex items-center gap-2 text-blue-700"><Code className="w-5 h-5" />2. Dynamic Websites:</b> <br />
        Description: These websites feature content that can change dynamically based on user interaction or other factors. They often use languages like JavaScript, Python, PHP, and frameworks like Node.js, React.js. <br />
        Businesses: E-commerce, social media platforms, blogs, content management systems.
        <br /><br />
        <b className="flex items-center gap-2 text-blue-700"><ShoppingCart className="w-5 h-5" />3. E-commerce Websites:</b> <br />
        Description: These websites are designed for selling products or services online. They include features like product listings, shopping carts, and payment gateways. <br />
        Businesses: Online retailers, marketplaces, service providers.
        <br /><br />
        <b className="flex items-center gap-2 text-blue-700"><BookOpen className="w-5 h-5" />4. Blogs:</b> <br />
        Description: These are regularly updated websites or web pages, typically run by an individual or a small group, written in an informal or conversational style. <br />
        Businesses: Individuals, influencers, media companies, businesses looking to engage customers with content.
        <br /><br />
        <b className="flex items-center gap-2 text-blue-700"><Briefcase className="w-5 h-5" />5. Portfolio Websites:</b> <br />
        Description: These showcase a person’s or a company’s work and skills. They are often used by artists, designers, photographers, and other creative professionals. <br />
        Businesses: Freelancers, creative agencies, job seekers.
        <br /><br />
        <b className="flex items-center gap-2 text-blue-700"><Users className="w-5 h-5" />6. Corporate Websites:</b> <br />
        Description: These websites represent a company's brand and provide information about the company’s products, services, and corporate culture. <br />
        Businesses: Large corporations, startups, B2B companies.
        <br /><br />
        <b className="flex items-center gap-2 text-blue-700"><Target className="w-5 h-5" />7. Landing Pages:</b> <br />
        Description: These are single-page websites created for a specific marketing campaign, often used to capture leads or promote a specific product or service. <br />
        Businesses: Marketing agencies, product launches, event promotions.
        <br /><br />
        <b className="flex items-center gap-2 text-blue-700"><Users className="w-5 h-5" />8. Social Media Websites:</b> <br />
        Description: These platforms allow users to connect and share content with each other. They often include features for user-generated content, profiles, messaging, and networking. <br />
        Businesses: Social networking platforms, community forums.
        <br /><br />
        <b className="flex items-center gap-2 text-blue-700"><GraduationCap className="w-5 h-5" />9. Educational Websites:</b> <br />
        Description: These provide educational content and resources. They can include online courses, tutorials, and learning management systems. <br />
        Businesses: Educational institutions, online course providers, tutoring services.
        <br /><br />
        <b className="flex items-center gap-2 text-blue-700"><Newspaper className="w-5 h-5" />10. News Websites:</b> <br />
        Description: These provide up-to-date news and information on various topics. They are often updated frequently. <br />
        Businesses: Media companies, news agencies, journalists.
        <br /><br />
        Different businesses have different needs, and the type of website they choose reflects their specific goals and the nature of their audience. For example, a retail business would benefit from an e-commerce site, while a freelancer might prefer a portfolio site.
      </>
    )
  },
  {
    question: "How will we determine which website is right for our business?",
    answer: "For this, you'll need to talk to our agent and provide details about your business. We'll then provide you with three sample websites suitable for your business, and you can select the theme you like to start your website development process."
  },
  {
    question: "How can we trust that you can create an attractive and responsive website for us?",
    answer: "You can trust us by looking at our previous work portfolio to understand our capabilities and expertise. We assure you that we develop attractive and responsive websites while considering your business requirements. If you have any specific queries or would like to see a demo, we can provide that as well."
  },
  {
    question: "I want to get a website built, but I don't know what to do.",
    answer: (
      <>
        Don't worry, Just arrange a callback on our website, our agent will provide you with all types of information and guide you completely. <br />
        <a href="#" className="text-blue-600 hover:underline font-medium">Arrange a callback</a>
      </>
    )
  },
  {
    question: "How can I avail your services?",
    answer: "You need to contact our agent, and then we will understand your requirements and prepare a demo for you. We will showcase three different types of website models on our website, and from there, you can select the model you like and choose a plan."
  },
  {
    question: "Will there be any charges for the demo?",
    answer: "No, there won't be any charges for the demo for first-time users. However, if a client declines the demo after the first attempt, they will need to pay Rs 999 to avail the demo next time, which will be included in their website payment later. Thus, the demo will still be free for you."
  },
  {
    question: "Will the Rs 999 demo charges be applied separately?",
    answer: "No, these charges will be deducted from your website's plan, and the demo will remain free for you."
  },
  {
    question: "What type of software do you develop?",
    answer: "We develop CRM (Customer Relationship Management), CMS (Complaint Management System), LMS (Learning Management System), EMS (Employee Management System), and SMS (Student Management System) software."
  },
  {
    question: "Can we also get a demo for software development and app development?",
    answer: "Yes, our system is designed so that any client can take a demo before opting for any type of service. They will get the interface they prefer, and then backend development, i.e., adding features, will be done according to the client's requirements."
  },
  {
    question: "What will be your steps for creating a website for us?",
    answer: (
      <>
        1. To initiate the demo process, your name will be added to our client list on the project page of our website. <br /><br />
        2. Subsequently, three themes (models) aligned with your requirements will be uploaded for your evaluation. <br /><br />
        3. Upon your selection of a preferred theme, <br /><br />
        4. We will furnish comprehensive written documentation outlining the agreed features, service plan details, and total budget. Development will commence upon your approval of this documentation. <br /><br />
        5. You are required to provide all necessary digital media and textual details. <br /><br />
        6. We will keep you updated with ongoing developments and changes, and you will have access to track progress on our platform. <br /><br />
        7. Upon completion of development, you will be invited to review and approve your website within a 7-day period. During this time, any pending tasks or changes can be addressed as per the agreed documentation. Additional requests will be addressed separately upon completion of this agreement. <br /><br />
        8. Upon approval, your website will be deployed to your designated domain and hosting. <br /><br />
        9. Post-deployment, you will receive the source code of your website along with all relevant credentials. <br /><br />
        10. Additionally, you will benefit from complimentary maintenance services for a period of 3 months.
      </>
    )
  },
  {
    question: "If we don't like your work, will our payment be refunded?",
    answer: "If we are unable to deliver the work that we agreed upon in writing, then in that case, we will refund your entire payment. However, so far, this has never happened because we have designed our system in such a way that if someone doesn't like our work, the process begins with a demo where the customer chooses the frontend look they prefer. Backend features are decided beforehand. If a customer requests something that is not feasible or beyond our capabilities, we simply do not proceed with the agreement. But to date, this has never happened."
  }
];

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      {/* Creative Header Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 py-24 text-white shadow-xl">
        {/* Abstract background shapes */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-white opacity-5 rounded-full filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute -bottom-1/4 -right-1/4 w-1/3 h-1/3 bg-white opacity-5 rounded-full filter blur-3xl animate-pulse-slow delay-500"></div>
        </div>

        <div className="relative container mx-auto px-4 text-center z-10">
          <div className="flex justify-center items-center mb-6">
            <Lightbulb className="w-16 h-16 text-yellow-300 animate-bounce-slow" />
          </div>
          <h1 className="text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg animate-fade-in-down">
            Your Questions, Our Answers
          </h1>
          <p className="text-xl font-light mb-8 max-w-2xl mx-auto opacity-90 animate-fade-in-up">
            We've compiled a list of frequently asked questions to provide you with quick and clear information about our services.
          </p>

          {/* Creative Breadcrumbs */}
          <nav className="text-sm flex justify-center items-center space-x-2 opacity-80">
            <Home className="w-4 h-4 text-blue-200" />
            <a href="/" className="text-blue-200 hover:text-white transition duration-300">Home</a>
            <span className="text-blue-300">/</span>
            <span className="text-white font-medium">FAQ</span>
          </nav>
        </div>
      </header>

      {/* Main FAQ Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Common Questions</h2>
          <div className="space-y-6">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl border border-gray-200"
              >
                <button
                  className="flex justify-between items-center w-full p-6 text-left text-xl font-semibold text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75 rounded-t-xl"
                  onClick={() => toggleAccordion(index)}
                >
                  <span>{item.question}</span>
                  {activeIndex === index ? (
                    <ChevronUp className="w-7 h-7 text-blue-600 transition-transform duration-300 transform rotate-180" />
                  ) : (
                    <ChevronDown className="w-7 h-7 text-gray-500 transition-transform duration-300" />
                  )}
                </button>
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    activeIndex === index ? 'max-h-screen opacity-100 p-6 pt-0' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="text-gray-700 leading-relaxed border-t border-gray-200 pt-4">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action / Footer */}
      {/* <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-2xl font-semibold mb-4">Can't find what you're looking for?</p>
          <p className="text-lg mb-8 opacity-80">Our team is ready to assist you with any further questions.</p>
          <a
            href="tel:+919356393094"
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75"
          >
            <PhoneCall className="w-6 h-6 mr-3" /> Call Us Now
          </a>
          <p className="mt-10 text-sm text-gray-400">&copy; {new Date().getFullYear()} VA Computers. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
};

export default FAQPage;