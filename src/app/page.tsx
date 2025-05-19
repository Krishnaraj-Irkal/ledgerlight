import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FiBarChart2,
  FiUserPlus,
  FiShield,
  FiPieChart,
  FiLock
} from 'react-icons/fi';

export default function Home() {
  return (
    <main className="bg-[var(--bg-color)] text-[var(--text-color)] space-y-0">
      {/* Hero Section */}
      <section className="border-b border-[var(--card-color)]">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12 px-4 sm:px-6 md:px-8 py-8 pb-24">
          <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--card-color)] rounded-full border border-[var(--highlight)]">
              <FiLock className="text-blue-500" size={16} />
              <span className="text-xs md:text-sm font-medium">Bank-Level Security</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Smart Financial Management<br />
              <span className="bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">Made Simple</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[var(--text-color)]/80">
              Track, analyze, and optimize your finances with our intuitive platform designed for clarity and control.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
              >
                <FiUserPlus className="mr-2" size={20} />
                Get Started Free
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <div className="rounded-2xl shadow-[8px_8px_16px_var(--shadow-dark),_-8px_-8px_16px_var(--shadow-light)] overflow-hidden">
              <Image
                src="/dashboard-mockup.png"
                alt="Financial dashboard interface"
                width={700}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-[var(--card-color)]">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-20 lg:py-24">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-[var(--text-color)]/80 text-base sm:text-lg">
              Everything you need to take control of your financial health
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <FiBarChart2 className="text-blue-500" size={32} />,
                title: "Smart Analytics",
                desc: "Real-time insights into spending patterns and trends"
              },
              {
                icon: <FiShield className="text-blue-500" size={32} />,
                title: "Secure Platform",
                desc: "Enterprise-grade security protecting your financial data"
              },
              {
                icon: <FiPieChart className="text-blue-500" size={32} />,
                title: "Wealth Tracking",
                desc: "Comprehensive view of all your assets and liabilities"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 sm:p-8 bg-[var(--bg-color)] rounded-2xl border border-[var(--card-color)] hover:border-blue-500 transition-all"
              >
                <div className="mb-4 sm:mb-6">{feature.icon}</div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-[var(--text-color)]">{feature.title}</h3>
                <p className="text-[var(--text-color)]/80 text-sm sm:text-base">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="bg-[var(--bg-color)]">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start md:items-center">
            <div className="space-y-6">
              <h2 className="text-xl sm:text-3xl md:text-4xl text-center md:text-left">Trusted by Thousands</h2>
              <p className="text-[var(--text-color)]/80 text-base sm:text-lg">
                Join over 15,000 users who have transformed their financial management
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  { value: "15K+", label: "Active Users" },
                  { value: "4.9/5", label: "Average Rating" },
                  { value: "256-bit", label: "Encryption" },
                  { value: "24/7", label: "Support" }
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="p-4 sm:p-6 bg-[var(--card-color)] rounded-lg"
                  >
                    <div className="text-xl sm:text-2xl font-bold text-blue-500 mb-1">{stat.value}</div>
                    <div className="text-[var(--text-color)]/80 text-xs sm:text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="grid gap-4 sm:gap-6">
              {[
                {
                  quote: "Finally found a financial tool that's both powerful and easy to use",
                  author: "Sarah M., Financial Advisor",
                  designation: "Financial Advisor"
                },
                {
                  quote: "Transformed how I manage my business finances",
                  author: "Rajesh P., Small Business Owner",
                  designation: "Small Business Owner"
                },
                {
                  quote: "The security features give me complete peace of mind",
                  author: "Priya K., Freelancer",
                  designation: "Freelancer"
                }
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="p-4 sm:p-6 bg-[var(--card-color)] rounded-lg"
                >
                  <p className="text-[var(--text-color)]/80 mb-2 text-sm sm:text-base">"{testimonial.quote}"</p>
                  <div className="text-sm sm:text-base text-blue-400 font-medium">{testimonial.author}</div>
                  <div className="text-xs text-[var(--text-color)]/80">{testimonial.designation}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[var(--card-color)]">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-20 lg:py-24 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-[var(--text-color)]">Start Your Financial Journey</h2>
            <p className="text-[var(--text-color)]/80 text-base sm:text-lg mb-4">
              Join today and take the first step towards financial clarity and control
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center px-6 sm:px-12 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-base sm:text-lg transition-all"
            >
              <FiUserPlus className="mr-2" size={20} />
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
