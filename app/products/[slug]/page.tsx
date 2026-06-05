"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { useParams } from 'next/navigation';

type ContentSection = {
  heading: string;
  description: string;
  listType: 'bullet' | 'numbered' | 'plain';
  items: string[];
};

type Product = {
  _id: string;
  slug: string;
  name: string;
  model?: string;
  category: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  images?: string[];
  videos?: string[];
  keyFeatures?: string[];
  features?: string[];
  contentSections?: ContentSection[];
  variants?: Array<{
    name: string;
    model: string;
    description: string;
    imageUrl?: string;
    contentSections?: ContentSection[];
  }>;
  technicalTable?: {
    headers: string[];
    rows: string[][];
    tableHeading?: string;
  };
  technicalInformation?: {
    headers: Array<{
      label: string;
      colSpan?: number;
      rowSpan?: number;
      children?: string[];
      width?: string;
      align?: 'left' | 'center' | 'right';
    }>;
    rows: Array<{
      model: string;
      values: string[];
      height?: string;
    }>;
    tableHeading?: string;
  };
  specifications?: Array<{spec: string; value: string}> | {
    power?: string;
    capacity?: string;
    weight?: string;
  };
};

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(`/api/products/slug/${params.slug}`);
        const data = await res.json();
        setProduct(data.product || null);
      } catch {
        setProduct(null);
      }
      setLoading(false);
    };
    getProduct();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/products" className="text-brand-green hover:text-brand-green-dark">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [product.imageUrl, ...(product.images || [])].filter(Boolean);
  const currentContent = selectedVariant !== null && product.variants?.[selectedVariant]
    ? product.variants[selectedVariant]
    : product;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-brand-green hover:text-brand-green-dark mb-8"
        >
          <ArrowLeft size={20} />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
              <img
                src={allImages[selectedImage] || '/images/wallpaper1.jpeg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {allImages.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-brand-green' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="text-brand-green font-medium">{product.category}</span>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2">
                {selectedVariant !== null && product.variants?.[selectedVariant]
                  ? `${product.name} - ${product.variants[selectedVariant].name}`
                  : product.name}
              </h1>
              {product.shortDescription && (
                <p className="text-lg text-gray-600 mt-4">{product.shortDescription}</p>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{product.description}</p>
              </div>
            )}

            {/* Variants selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase">Variants</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedVariant(null)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedVariant === null ? 'bg-brand-green text-white' : 'bg-white text-gray-700 border'
                    }`}
                  >
                    Main
                  </button>
                  {product.variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVariant(index)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedVariant === index ? 'bg-brand-green text-white' : 'bg-white text-gray-700 border'
                      }`}
                    >
                      {variant.name || `Variant ${index + 1}`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Content Sections (bullet points) */}
            {currentContent.contentSections && currentContent.contentSections.length > 0 && (
              <div className="space-y-4">
                {currentContent.contentSections.map((section, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{section.heading}</h3>
                    {section.description && (
                      <p className="text-gray-600 mb-3">{section.description}</p>
                    )}
                    {section.items && section.items.length > 0 && (
                      <ul className="space-y-2">
                        {section.items.filter(item => item.trim()).map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2">
                            {section.listType === 'numbered' ? (
                              <span className="text-brand-green font-bold text-sm mt-0.5">{itemIndex + 1}.</span>
                            ) : (
                              <span className="text-brand-green mt-1.5 text-xs">●</span>
                            )}
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Key Features fallback */}
            {product.keyFeatures && product.keyFeatures.length > 0 && (!product.contentSections || product.contentSections.length === 0) && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.keyFeatures.filter(f => f.trim()).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-brand-green mt-1.5 text-xs">●</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Features fallback */}
            {product.features && product.features.length > 0 && (!product.keyFeatures || product.keyFeatures.length === 0) && (!product.contentSections || product.contentSections.length === 0) && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.filter(f => f.trim()).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-brand-green mt-1.5 text-xs">●</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Array.isArray(product.specifications) ? (
                    product.specifications.filter(spec => spec.spec && spec.value).map((spec, index) => (
                      <div key={index}>
                        <span className="text-sm text-gray-500">{spec.spec}</span>
                        <p className="font-semibold">{spec.value}</p>
                      </div>
                    ))
                  ) : (
                    <>
                      {product.specifications.power && (
                        <div>
                          <span className="text-sm text-gray-500">Power</span>
                          <p className="font-semibold">{product.specifications.power}</p>
                        </div>
                      )}
                      {product.specifications.capacity && (
                        <div>
                          <span className="text-sm text-gray-500">Capacity</span>
                          <p className="font-semibold">{product.specifications.capacity}</p>
                        </div>
                      )}
                      {product.specifications.weight && (
                        <div>
                          <span className="text-sm text-gray-500">Weight</span>
                          <p className="font-semibold">{product.specifications.weight}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Technical Table */}
            {((product.technicalTable && product.technicalTable.headers.length > 0) || (product.technicalInformation && product.technicalInformation.headers.length > 0)) && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  {product.technicalInformation?.tableHeading || product.technicalTable?.tableHeading || 'Technical Information'}
                </h3>
                <div className="overflow-x-auto">
                  {product.technicalInformation ? (
                    <table className="w-full min-w-[600px] border-collapse">
                      <thead>
                        <tr>
                          {product.technicalInformation.headers.map((header, index) => (
                            <th
                              key={index}
                              colSpan={header.colSpan || 1}
                              rowSpan={header.rowSpan || (header.children ? 1 : 2)}
                              className="px-4 py-3 font-bold text-sm uppercase border border-gray-300 bg-brand-green text-white text-center"
                            >
                              {header.label}
                            </th>
                          ))}
                        </tr>
                        {product.technicalInformation.headers.some(h => h.children) && (
                          <tr>
                            {product.technicalInformation.headers.map((header, headerIndex) =>
                              header.children ? header.children.map((child, childIndex) => (
                                <th
                                  key={`${headerIndex}-${childIndex}`}
                                  className="px-4 py-2 font-semibold border border-gray-300 text-center text-sm bg-brand-green/80 text-white"
                                >
                                  {child}
                                </th>
                              )) : null
                            )}
                          </tr>
                        )}
                      </thead>
                      <tbody>
                        {product.technicalInformation.rows.map((row, rowIndex) => (
                          <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            {row.values.map((value, valueIndex) => (
                              <td key={valueIndex} className="px-4 py-3 text-sm border border-gray-300 text-center">
                                {value}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : product.technicalTable && (
                    <table className="w-full min-w-[600px] border-collapse">
                      <thead>
                        <tr>
                          {product.technicalTable.headers.map((header, index) => (
                            <th key={index} className="px-4 py-3 font-bold text-sm uppercase border border-gray-300 bg-brand-green text-white text-left">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {product.technicalTable.rows.map((row, rowIndex) => (
                          <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className="px-4 py-3 text-sm border border-gray-300">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-gradient-to-r from-brand-green to-brand-green-dark text-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Interested in this machine?</h3>
              <p className="mb-6 text-green-100">Get in touch with our experts for pricing and customization options.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+919983813366"
                  className="flex items-center justify-center gap-2 bg-white text-brand-green px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  <Phone size={20} />
                  Call Now
                </a>
                <a
                  href="mailto:jbi.jodhpur@gmail.com"
                  className="flex items-center justify-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-brand-green transition-colors"
                >
                  <Mail size={20} />
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
