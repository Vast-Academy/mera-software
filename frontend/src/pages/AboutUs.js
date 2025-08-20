import React from 'react';
import { FaCheckCircle, FaPhone, FaArrowCircleRight, FaQuoteRight } from 'react-icons/fa';
import { LuCode, LuPalette, LuActivity, LuLifeBuoy } from 'react-icons/lu'; // Using Lucide-like icons for features

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased">
      {/* About VA Computers Section */}
      <section className="py-16 lg:py-24 bg-white shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center lg:space-x-16">
            {/* Image Column */}
            <div className="lg:w-1/2 mb-10 lg:mb-0 relative">
              <img
                src="https://www.vacomputers.com/images/home/our-working-method-va-computers-best-website-development-company-amritsar-punjab.jpg"
                alt="Our Working Method - VA Computers"
                className="rounded-xl shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500 ease-in-out"
              />
            </div>

            {/* Content Column */}
            <div className="lg:w-1/2">
              <div className="mb-8">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">About Mera Software</h2>
                <h4 className="text-xl lg:text-2xl font-semibold text-blue-700 mb-6">
                  Your Vision, Our Custom Code – Building Beyond Templates
                </h4>
                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  At Mera Software, we believe every business deserves a website that reflects its unique essence.
                  That’s why we create tailor-made solutions by writing every line of code from scratch—no drag-and-drop tools, no shortcuts.
                  With over a decade of experience, we’ve been helping businesses in Amritsar and beyond elevate their online presence
                  through high-performance, custom-built websites.
                </p>
              </div>
              <ul className="list-none p-0 mb-8 space-y-3">
                <li className="flex items-center text-lg text-gray-800">
                  <FaCheckCircle className="text-green-500 mr-3 text-xl flex-shrink-0" /> Refreshing to get such a personal touch.
                </li>
                <li className="flex items-center text-lg text-gray-800">
                  <FaCheckCircle className="text-green-500 mr-3 text-xl flex-shrink-0" /> Duis aute irure dolor in reprehenderit in voluptate.
                </li>
                <li className="flex items-center text-lg text-gray-800">
                  <FaCheckCircle className="text-green-500 mr-3 text-xl flex-shrink-0" /> Velit esse cillum dolore eu fugiat nulla pariatur.
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a
                  href="tel:+919356393094"
                  className="inline-flex items-center bg-blue-600 text-white py-3 px-7 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  <FaPhone className="mr-3 text-xl" />
                  <div>
                    <small className="block text-xs opacity-90">Call Anytime</small>
                    <span className="text-lg font-bold">+91 93563-93094</span>
                  </div>
                </a>
                <a
                  href="#" // Replace with actual explore page link
                  className="inline-block bg-yellow-500 text-gray-900 py-3 px-7 rounded-full shadow-lg hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:-translate-y-1 font-bold"
                >
                  Explore now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-16 lg:py-24 bg-gray-100">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-8">Who We Are</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              We’re not just developers—we’re your digital partners. From web applications to SEO optimization and digital marketing,
              we specialize in crafting solutions designed to meet your business goals. Our work goes beyond aesthetics,
              focusing on creating platforms that engage, perform, and grow with your brand.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              With Mera Software, you’re in full control of your project. From choosing themes to monitoring live progress,
              we ensure transparency and a stress-free experience every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-16 lg:py-24 bg-white shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center md:space-x-16">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <img
                src="https://www.vacomputers.com/images/digital-marketing-service/seo-optimization-in-va-computers-in-digital-marketing-service.png"
                alt="Mission and Vision"
                className="rounded-xl shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500 ease-in-out"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">Our Mission</h2>
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                To empower businesses by creating custom-coded, performance-driven
                websites that build trust, engage audiences, and drive growth in the
                digital world.
              </p>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">Our Vision</h2>
              <p className="text-lg leading-relaxed text-gray-700">
                To become the preferred choice for businesses seeking a partner who
                understands the importance of precision, personalization, and performance
                in website development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart? Section */}
      <section className="py-16 lg:py-24 bg-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center lg:space-x-16">
            {/* Content Column */}
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">What Sets Us Apart?</h2>

              {/* Feature Block 1 */}
              <div className="mb-8 p-6 bg-white rounded-xl shadow-lg flex items-start space-x-4 hover:shadow-xl transition-shadow duration-300">
                <div className="flex-shrink-0 p-3 bg-blue-100 rounded-full">
                  <LuCode className="text-blue-600 text-3xl" />
                </div>
                <div>
                  <h5 className="text-xl font-semibold text-gray-900 mb-2">No Templates – Fully Custom Code</h5>
                  <p className="text-gray-700 leading-relaxed">
                    We don’t use platforms like WordPress or pre-built templates. Instead, we handcraft your website
                    using professional tools like Visual Studio Code. This ensures a clean, efficient, and secure
                    foundation for your online presence.
                  </p>
                </div>
              </div>

              {/* Feature Block 2 */}
              <div className="mb-8 p-6 bg-white rounded-xl shadow-lg flex items-start space-x-4 hover:shadow-xl transition-shadow duration-300">
                <div className="flex-shrink-0 p-3 bg-blue-100 rounded-full">
                  <LuPalette className="text-blue-600 text-3xl" />
                </div>
                <div>
                  <h5 className="text-xl font-semibold text-gray-900 mb-2">Interactive Theme Selection</h5>
                  <p className="text-gray-700 leading-relaxed">
                    We start every project by offering you three custom design demos. This empowers you to choose
                    the style that resonates with your brand before we dive into development.
                  </p>
                </div>
              </div>

              {/* Feature Block 3 */}
              <div className="mb-8 p-6 bg-white rounded-xl shadow-lg flex items-start space-x-4 hover:shadow-xl transition-shadow duration-300">
                <div className="flex-shrink-0 p-3 bg-blue-100 rounded-full">
                  <LuActivity className="text-blue-600 text-3xl" />
                </div>
                <div>
                  <h5 className="text-xl font-semibold text-gray-900 mb-2">Real-Time Progress Tracking</h5>
                  <p className="text-gray-700 leading-relaxed">
                    Stay connected with your project through our Progress Tracking System. From milestones to live updates,
                    you’ll always know exactly how your website is shaping up.
                  </p>
                </div>
              </div>

              {/* Feature Block 4 */}
              <div className="p-6 bg-white rounded-xl shadow-lg flex items-start space-x-4 hover:shadow-xl transition-shadow duration-300">
                <div className="flex-shrink-0 p-3 bg-blue-100 rounded-full">
                  <LuLifeBuoy className="text-blue-600 text-3xl" />
                </div>
                <div>
                  <h5 className="text-xl font-semibold text-gray-900 mb-2">Full After-Service Support</h5>
                  <p className="text-gray-700 leading-relaxed">
                    Our commitment doesn’t end at launch. We provide ongoing support for updates, performance enhancements,
                    and maintenance to ensure your website continues to thrive.
                  </p>
                </div>
              </div>
            </div>

            {/* Image Column for What Sets Us Apart */}
            <div className="lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="What Sets Us Apart - Collaboration and Innovation"
                className="rounded-xl shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500 ease-in-out"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy & Tools We Use Section */}
      <section className="py-16 lg:py-24 bg-blue-800 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Our Philosophy */}
            <div>
              <h3 className="text-3xl lg:text-4xl font-extrabold mb-6">Our Philosophy</h3>
              <p className="text-lg mb-4 flex items-center">
                We stand by these Core Principles: <FaArrowCircleRight className="inline-block ml-3 text-yellow-400 text-2xl" />
              </p>
              <ul className="list-disc list-inside text-lg space-y-3">
                <li><strong>Precision:</strong> Every detail matters.</li>
                <li><strong>Transparency:</strong> Clear communication and collaboration are key.</li>
                <li><strong>Performance:</strong> Your website should be more than visually stunning—it must work seamlessly across devices and platforms.</li>
              </ul>
            </div>

            {/* Tools We Use */}
            <div>
              <h3 className="text-3xl lg:text-4xl font-extrabold mb-6">Tools We Use</h3>
              <p className="text-lg mb-4">We use advanced tools and frameworks to build secure, high-quality websites.</p>
              <ul className="list-disc list-inside text-lg space-y-3">
                <li><strong>Code Editor:</strong> Visual Studio Code.</li>
                <li><strong>Frontend Tools:</strong> HTML5, CSS3, JavaScript.</li>
                <li><strong>Backend Frameworks:</strong> Node.js, Express, React.</li>
                <li><strong>Database Integration:</strong> MongoDB, Firebase.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg relative border-t-4 border-blue-600 hover:shadow-xl transition-shadow duration-300">
              <FaQuoteRight className="absolute top-6 right-6 text-blue-200 text-4xl opacity-70" />
              <p className="text-lg leading-relaxed text-gray-700 mb-4 italic">
                "Mera Software truly exceeded our expectations. Their team created a custom web application for our business
                that is both user-friendly and efficient. The professionalism and attention to detail were impressive.
                The after-service support is outstanding, ensuring everything runs smoothly even after project completion.
                Highly recommend!"
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg relative border-t-4 border-blue-600 hover:shadow-xl transition-shadow duration-300">
              <FaQuoteRight className="absolute top-6 right-6 text-blue-200 text-4xl opacity-70" />
              <p className="text-lg leading-relaxed text-gray-700 mb-4 italic">
                "Thanks to Mera Software, my small business now has an amazing online presence! Their 3-step strategy for
                going online made the entire process simple and stress-free. I’ve already seen a boost in sales and
                customer engagement. Couldn't be happier!"
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg relative border-t-4 border-blue-600 hover:shadow-xl transition-shadow duration-300">
              <FaQuoteRight className="absolute top-6 right-6 text-blue-200 text-4xl opacity-70" />
              <p className="text-lg leading-relaxed text-gray-700 mb-4 italic">
                "We hired Mera Software to develop a custom CRM for our company. The team not only delivered on time but
                went the extra mile to tailor it exactly to our needs. Their ongoing support ensures that we’re always
                ahead. Amazing experience!"
              </p>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-white p-8 rounded-xl shadow-lg relative border-t-4 border-blue-600 hover:shadow-xl transition-shadow duration-300">
              <FaQuoteRight className="absolute top-6 right-6 text-blue-200 text-4xl opacity-70" />
              <p className="text-lg leading-relaxed text-gray-700 mb-4 italic">
                "We reached out to many developers and companies to get our website made. After comparing their methods
                and costs, we found VAComputers to be the best in terms of working method, pricing, and support system.
                They promised to complete our project quickly and delivered on that promise. We are very satisfied with their work."
              </p>
            </div>

            {/* Testimonial 5 */}
            <div className="bg-white p-8 rounded-xl shadow-lg relative border-t-4 border-blue-600 hover:shadow-xl transition-shadow duration-300">
              <FaQuoteRight className="absolute top-6 right-6 text-blue-200 text-4xl opacity-70" />
              <p className="text-lg leading-relaxed text-gray-700 mb-4 italic">
                "I needed reliable update services after my website was built, as my previous WordPress site had many
                limitations and the developer failed to provide support. When I contacted Mera Software, I asked,
                'Do you not use WordPress?' I was impressed by their approach and how they catered to my needs,
                providing excellent support and exceeding my expectations."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
