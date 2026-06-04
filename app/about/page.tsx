// app/about/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Gem, Lightbulb, Handshake, Target } from "lucide-react";
import { ReactNode } from "react";

const ValueCard = ({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) => (
  <motion.div 
    className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg border border-gray-100 text-center transition-all duration-300 hover:-translate-y-2"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <div className="w-16 h-16 bg-brand-green/10 rounded-xl flex items-center justify-center mx-auto mb-6 text-brand-green">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{children}</p>
  </motion.div>
);

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-brand-green/10 text-brand-green rounded-full text-sm font-medium mb-6">
              About Our Company
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              About Jai Balaji Industries
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our Legacy of Precision Engineering Since 1990
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Forging the Future of Stone Industry
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Welcome to Jai Balaji Industries, a name synonymous with strength, precision, and innovation in stone processing technology. For over three decades, we have been at the forefront of the industry.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our journey began with a simple mission: to build machines that not only meet but exceed the demanding standards of the global stone industry.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gray-100 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-green mb-2">30+</div>
                    <div className="text-gray-600">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-green mb-2">500+</div>
                    <div className="text-gray-600">Happy Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-green mb-2">50+</div>
                    <div className="text-gray-600">Machine Models</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-brand-green mb-2">24/7</div>
                    <div className="text-gray-600">Support</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Core Values Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
              Our Values
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Drives Us Forward
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our core values guide every decision and shape our commitment to excellence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard icon={<Gem size={32} />} title="Unwavering Quality">
              Every machine is a testament to our commitment to excellence, built with the finest materials and superior craftsmanship.
            </ValueCard>
            <ValueCard icon={<Lightbulb size={32} />} title="Continuous Innovation">
              We relentlessly pursue technological advancement to provide our clients with the most efficient and cutting-edge solutions.
            </ValueCard>
            <ValueCard icon={<Handshake size={32} />} title="Customer Partnership">
              Your success is our success. We work closely with our clients to provide tailored solutions and dedicated support.
            </ValueCard>
            <ValueCard icon={<Target size={32} />} title="Precision & Performance">
              Our machinery is engineered for flawless accuracy and peak performance, ensuring maximum productivity for your operations.
            </ValueCard>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 lg:py-24 bg-brand-green text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Elevate Your Production?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Explore our full range of machinery or get in touch with our team to discuss your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-green font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                View Our Machines
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-brand-green transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
