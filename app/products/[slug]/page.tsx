"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import ImageGallery from './components/ImageGallery';

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
  variants?: Array<{
    name: string;
    model: string;
    description: string;
    imageUrl?: string;
    contentSections?: Array<{
      heading: string;
      description: string;
      listType: 'bullet' | 'numbered' | 'plain';
      items: string[];
    }>;
    technicalInformation?: any;
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
  contentSections?: Array<{
    heading: string;
    description: string;
    listType: 'bullet' | 'numbered' | 'plain';
    items: string[];
  }>;
  features?: string[];
};

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      const { slug } = await params;
      try {
        const res = await fetch(`/api/products/slug/${slug}`);
        const data = await res.json();
        setProduct(data.success ? data.product : null);
      } catch {
        setProduct(null);
      }
      setLoading(false);
    };
    getProduct();
  }, [params]);

  if (loading) {
    return <div className="min-h-screen bg-zinc-50 flex items-center justify-center">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-brand-green flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
          <Link href="/products" className="text-white hover:underline font-medium">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [product.imageUrl, ...(product.images || [])];
  const allVideos = product.videos || [];
  
  const variantImages = product.variants?.map(v => v.imageUrl).filter(Boolean) || [];
  const combinedImages = [...allImages, ...variantImages];
  
  const currentContent = selectedVariant !== null && product.variants?.[selectedVariant] 
    ? product.variants[selectedVariant] 
    : product;
  
  const handleImageClick = (imageIndex: number) => {
    const mainImageCount = allImages.length;
    if (imageIndex >= mainImageCount && product.variants) {
      const variantIndex = imageIndex - mainImageCount;
      setSelectedVariant(variantIndex);
    } else {
      setSelectedVariant(null);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="flex flex-col lg:flex-row">
        <ImageGallery 
          images={combinedImages} 
          videos={allVideos} 
          productName={product.name}
          onImageClick={handleImageClick}
        />

        <div className="lg:w-1/2 bg-white">
          <div className={`p-6 space-y-3 ${(!product.contentSections || product.contentSections.length === 0) && (!product.features || product.features.length === 0) ? 'pb-3' : ''}`}>
            <div className="border-b border-zinc-200 pb-6">
              <h1 className="text-xl font-bold text-white mb-3 leading-tight bg-brand-green px-3 py-2 -mx-3 uppercase tracking-wide">
                {selectedVariant !== null && product.variants?.[selectedVariant] 
                  ? `${product.name} - ${product.variants[selectedVariant].name}` 
                  : product.name}
                {(selectedVariant !== null && product.variants?.[selectedVariant]?.model) ? (
                  <span className="ml-3">{product.variants[selectedVariant].model}</span>
                ) : product.model && (
                  <span className="ml-3">{product.model}</span>
                )}
              </h1>
              <p className="text-base text-zinc-700 leading-relaxed">
                {selectedVariant !== null && product.variants?.[selectedVariant] 
                  ? product.variants[selectedVariant].description || product.shortDescription || product.description
                  : product.shortDescription || product.description}
              </p>
              {/* Show description when shortDescription exists separately */}
              {product.description && product.shortDescription && product.description !== product.shortDescription && selectedVariant === null && (!product.contentSections || product.contentSections.length === 0) && (
                <p className="mt-3 text-sm text-zinc-600 leading-relaxed whitespace-pre-line">{product.description}</p>
              )}
            </div>

            {currentContent.contentSections && currentContent.contentSections.length > 0 && currentContent.contentSections.map((section, index) => (
              <div key={index} className="border-b border-zinc-100 pb-3">
                <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide bg-brand-green px-3 py-2 -mx-3">
                  {section.heading}
                </h3>
                {section.description && (
                  <p className="text-zinc-700 mb-2">{section.description}</p>
                )}
                {section.items.length > 0 && (
                  <div className="space-y-1">
                    {section.listType === 'numbered' ? (
                      <ol className="space-y-1">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2">
                            <span className="text-brand-green font-bold text-sm mt-0.5">
                              {itemIndex + 1}.
                            </span>
                            <span className="text-zinc-700 text-sm">{item}</span>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <ul className="space-y-1">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2">
                            <span className="text-brand-green mt-1 text-xs">■</span>
                            <span className="text-zinc-700 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}

            {product.features && product.features.length > 0 && (
              <div className="border-b border-zinc-100 pb-3">
                <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide bg-brand-green px-3 py-2 -mx-3">
                  Key Features
                </h3>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-brand-green mt-1 text-xs">■</span>
                      <span className="text-zinc-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technical table in right panel when few content sections */}
            {(!currentContent.contentSections || currentContent.contentSections.length <= 1) && ((product.technicalTable && product.technicalTable.headers.length > 0) || (product.technicalInformation && product.technicalInformation.headers.length > 0)) && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-brand-green uppercase tracking-wide">
                    {product.technicalInformation?.tableHeading || product.technicalTable?.tableHeading || 'TECHNICAL INFORMATION'}
                  </h2>
                  <div className="text-xs text-gray-500 flex items-center gap-1 md:hidden">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    Scroll to view
                  </div>
                </div>
                <div style={{overflowX: 'scroll', width: '100%'}}>
                  {product.technicalInformation ? (
                    <table style={{minWidth: '800px'}} className="bg-white border-collapse">
                      <thead>
                        <tr>
                          {product.technicalInformation.headers.map((header, index) => (
                            <th
                              key={index}
                              colSpan={header.colSpan || 1}
                              rowSpan={header.rowSpan || (header.children ? 1 : 2)}
                              className={`px-4 py-3 font-bold uppercase tracking-wider border border-zinc-400 text-center bg-brand-green text-white`}
                              style={{ width: header.width }}
                            >
                              {header.label}
                            </th>
                          ))}
                        </tr>
                        {product.technicalInformation.headers.some((h: any) => h.children) && (
                          <tr>
                            {product.technicalInformation.headers.map((header, headerIndex) => 
                              header.children ? header.children.map((child, childIndex) => (
                                <th
                                  key={`${headerIndex}-${childIndex}`}
                                  className="px-4 py-2 font-semibold border border-zinc-400 text-center text-sm bg-brand-green/80 text-white"
                                >
                                  {child}
                                </th>
                              )) : null
                            )}
                          </tr>
                        )}
                      </thead>
                      <tbody>
                        {product.technicalInformation.rows.map((row, rowIndex) => {
                          const expectedColumns = product.technicalInformation!.headers.reduce((sum: number, header: any) => {
                            if (header.children && header.children.length > 0) return sum + header.children.length;
                            return sum + (header.colSpan || 1);
                          }, 0);
                          const trimmedValues = row.values.slice(0, expectedColumns);
                          return (
                            <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? 'bg-white' : 'bg-zinc-100'} hover:bg-zinc-200 transition-colors`} style={{ height: row.height }}>
                              {trimmedValues.map((value, valueIndex) => (
                                <td key={valueIndex} className="px-4 py-3 text-sm border border-zinc-400 text-center font-mono text-zinc-900">
                                  {value.split('\n').map((line, lineIndex) => (
                                    <div key={lineIndex}>{line}</div>
                                  ))}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <table style={{minWidth: '800px'}} className="bg-white">
                      <thead>
                        <tr>
                          {product.technicalTable!.headers.map((header, index) => (
                            <th key={index} className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-r border-zinc-400 last:border-r-0 bg-brand-green text-white whitespace-nowrap">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {product.technicalTable!.rows.map((row, rowIndex) => (
                          <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? 'bg-white' : 'bg-zinc-50'} hover:bg-zinc-100 transition-colors`}>
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className="px-6 py-4 text-sm text-zinc-900 border-r border-zinc-400 last:border-r-0 font-mono whitespace-nowrap">
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
          </div>
        </div>
      </div>

      {/* Technical table below when multiple content sections */}
      {(product.contentSections && product.contentSections.length > 1) && ((product.technicalTable && product.technicalTable.headers.length > 0) || (product.technicalInformation && product.technicalInformation.headers.length > 0)) ? (
        <div className="bg-zinc-50 mt-4">
          <div className="px-8 py-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-brand-green uppercase tracking-wide font-mono">
                {product.technicalInformation?.tableHeading || product.technicalTable?.tableHeading || 'TECHNICAL INFORMATION'}
              </h2>
            </div>
            <div style={{overflowX: 'scroll', width: '100%'}}>
              {product.technicalInformation ? (
                <table style={{minWidth: '800px'}} className="bg-white border-collapse">
                  <thead>
                    <tr>
                      {product.technicalInformation.headers.map((header, index) => (
                        <th key={index} colSpan={header.colSpan || 1} rowSpan={header.rowSpan || (header.children ? 1 : 2)} className="px-4 py-3 font-bold uppercase tracking-wider border border-zinc-400 text-center bg-brand-green text-white" style={{ width: header.width }}>
                          {header.label}
                        </th>
                      ))}
                    </tr>
                    {product.technicalInformation.headers.some((h: any) => h.children) && (
                      <tr>
                        {product.technicalInformation.headers.map((header, headerIndex) => 
                          header.children ? header.children.map((child, childIndex) => (
                            <th key={`${headerIndex}-${childIndex}`} className="px-4 py-2 font-semibold border border-zinc-400 text-center text-sm bg-brand-green/80 text-white">
                              {child}
                            </th>
                          )) : null
                        )}
                      </tr>
                    )}
                  </thead>
                  <tbody>
                    {product.technicalInformation.rows.map((row, rowIndex) => {
                      const expectedColumns = product.technicalInformation!.headers.reduce((sum: number, header: any) => {
                        if (header.children && header.children.length > 0) return sum + header.children.length;
                        return sum + (header.colSpan || 1);
                      }, 0);
                      const trimmedValues = row.values.slice(0, expectedColumns);
                      return (
                        <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? 'bg-white' : 'bg-zinc-100'} hover:bg-zinc-200 transition-colors`} style={{ height: row.height }}>
                          {trimmedValues.map((value, valueIndex) => (
                            <td key={valueIndex} className="px-4 py-3 text-sm border border-zinc-400 text-center font-mono text-zinc-900">
                              {value.split('\n').map((line, lineIndex) => (<div key={lineIndex}>{line}</div>))}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <table style={{minWidth: '800px'}} className="bg-white">
                  <thead>
                    <tr>
                      {product.technicalTable!.headers.map((header, index) => (
                        <th key={index} className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-r border-zinc-400 last:border-r-0 bg-brand-green text-white whitespace-nowrap">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {product.technicalTable!.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? 'bg-white' : 'bg-zinc-50'} hover:bg-zinc-100 transition-colors`}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="px-6 py-4 text-sm text-zinc-900 border-r border-zinc-400 last:border-r-0 font-mono whitespace-nowrap">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {/* Contact Section */}
      <div className="bg-brand-green-dark text-white">
        <div className="px-8 py-12">
          <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide">
            Get Quote & Technical Support
          </h2>
          <p className="text-zinc-300 mb-8 text-lg max-w-3xl">
            Contact our engineering team for detailed specifications, customization options, and pricing information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+919983813366"
              className="flex items-center justify-center gap-3 bg-brand-green text-white px-8 py-4 font-bold hover:bg-brand-green-dark transition-colors text-lg"
            >
              <Phone size={20} />
              +91 9983813366
            </a>
            <a
              href="mailto:jbi.jodhpur@gmail.com"
              className="flex items-center justify-center gap-3 border-2 border-white text-white px-8 py-4 font-bold hover:bg-zinc-800 transition-colors text-lg"
            >
              <Mail size={20} />
              Email Quote Request
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
