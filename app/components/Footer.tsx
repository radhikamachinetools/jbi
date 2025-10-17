// app/components/Footer.tsx

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-brand-green-dark via-brand-green to-brand-green-deeper text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative">
                <Image
                  src="/images/radhika-logo.png"
                  alt="Jai Balaji Industries Logo"
                  width={50}
                  height={50}
                  className="rounded-full ring-2 ring-white/20"
                />
              </div>
              <div>
                <span className="text-xl font-bold text-white block">
                  Jai Balaji Industries
                </span>
                <span className="text-xs text-green-100">
                  Engineering Excellence
                </span>
              </div>
            </Link>
            
            <p className="text-green-100 mb-6 leading-relaxed">
              Engineering excellence in stone processing machinery for the
              global stone industry. Trusted by 500+ clients worldwide.
            </p>
            
            <div className="flex space-x-4">
              <Link
                href="https://www.jbijodhpur.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-brand-accent rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                title="Visit our website"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-brand-accent">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/about" 
                  className="text-green-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-brand-accent rounded-full transition-all duration-300 group-hover:w-2"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-green-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-brand-accent rounded-full transition-all duration-300 group-hover:w-2"></span>
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-green-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-brand-accent rounded-full transition-all duration-300 group-hover:w-2"></span>
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  href="/faq" 
                  className="text-green-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-brand-accent rounded-full transition-all duration-300 group-hover:w-2"></span>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-brand-accent">
              Support
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-green-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-brand-accent rounded-full transition-all duration-300 group-hover:w-2"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-green-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-brand-accent rounded-full transition-all duration-300 group-hover:w-2"></span>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/service-center"
                  className="text-green-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-brand-accent rounded-full transition-all duration-300 group-hover:w-2"></span>
                  Service Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-brand-accent">
              Contact Info
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-brand-accent mt-1 flex-shrink-0" size={18} />
                <div className="text-green-100">
                  <p className="font-medium text-white mb-1">Address:</p>
                  <p className="text-sm">J1-65, RIICO 1st Phase, Sangariya, Jodhpur 342008</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="text-brand-accent flex-shrink-0" size={18} />
                <a 
                  href="mailto:jbi.jodhpur@gmail.com"
                  className="text-green-100 hover:text-white transition-colors"
                >
                  jbi.jodhpur@gmail.com
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="text-brand-accent flex-shrink-0" size={18} />
                <div className="text-green-100">
                  <a href="tel:+919983813366" className="hover:text-white transition-colors block">+91 9983813366</a>
                  <a href="tel:+919950329359" className="hover:text-white transition-colors block">+91 9950329359</a>
                  <p className="text-xs mt-1">Moksh: +91 8445403317</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <svg className="text-brand-accent flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                <a 
                  href="https://www.jbijodhpur.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-100 hover:text-white transition-colors"
                >
                  www.jbijodhpur.com
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="text-brand-accent flex-shrink-0" size={18} />
                <div className="text-green-100">
                  <p className="text-sm">Mon - Sat: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <p className="text-green-100 text-center lg:text-left">
              &copy; {new Date().getFullYear()} Jai Balaji Industries. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-green-100">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/sitemap" className="hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;