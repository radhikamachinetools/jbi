// app/components/FeatureCardClient.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
};

export default function FeatureCardClient({
  icon,
  title,
  children,
}: FeatureCardProps) {
  return (
    <motion.div
      className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-2"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
    >
      <div className="text-center">
        {/* Icon Container */}
        <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300">
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-800 leading-relaxed">
          {children}
        </p>
      </div>

      {/* Decorative Element */}
      <div className="mt-6 w-12 h-1 bg-primary rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  );
}