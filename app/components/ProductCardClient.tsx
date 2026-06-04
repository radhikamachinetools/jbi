// app/components/ProductCardClient.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";

type Product = {
  _id: string;
  slug: string;
  name: string;
  category: string;
  imageUrl?: string;
  shortDescription: string;
};

type ProductCardProps = {
  product: Product;
  index: number;
};

export default function ProductCardClient({
  product,
  index,
}: ProductCardProps) {
  return (
    <motion.div
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={product.imageUrl || "/images/placeholder.png"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
            {product.category}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
            <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-medium text-gray-800">4.9</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-green transition-colors duration-300">
          {product.name}
        </h3>
        
        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">High Precision</span>
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Durable</span>
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Energy Efficient</span>
        </div>

        {/* CTA */}
        <Link
          href={`/products/${product.slug}`}
          className="inline-flex items-center justify-center w-full px-4 py-3 bg-gray-50 text-gray-700 font-medium rounded-lg hover:bg-brand-green hover:text-white transition-all duration-300 group/btn"
        >
          View Details
          <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Link>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-green/20 rounded-xl transition-all duration-300 pointer-events-none"></div>
    </motion.div>
  );
}