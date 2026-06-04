import Image from "next/image";
import Link from "next/link";
import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

type GalleryCategory = {
  _id: string;
  name: string;
  slug: string;
  headerImage: string;
  displayOrder: number;
};

type GalleryItem = {
  _id: string;
  categoryId: string;
  type: "image" | "video";
  url: string;
  title: string;
  displayOrder: number;
};

async function getGalleryData(slug: string): Promise<{ category: GalleryCategory | null, items: GalleryItem[] }> {
  try {
    const GALLERY_FILE = path.join(process.cwd(), 'data', 'gallery.json');
    const data = await fs.readFile(GALLERY_FILE, 'utf8');
    const galleryData = JSON.parse(data);
    
    const category = galleryData.galleryCategories.find((c: GalleryCategory) => c.slug === slug);
    if (!category) return { category: null, items: [] };
    
    const items = galleryData.galleryItems
      .filter((item: GalleryItem) => item.categoryId === category._id)
      .sort((a: GalleryItem, b: GalleryItem) => (a.displayOrder || 0) - (b.displayOrder || 0));
    
    return { category, items };
  } catch (error) {
    console.error("Failed to fetch gallery data:", error);
    return { category: null, items: [] };
  }
}

export default async function GalleryCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { category, items } = await getGalleryData(slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative h-96 bg-gradient-to-r from-brand-green-dark to-brand-green flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">{category.name}</h1>
          <p className="text-xl lg:text-2xl text-green-100">
            {items.length} {items.length === 1 ? 'item' : 'items'} in this gallery
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-brand-green hover:text-brand-green-dark transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Gallery
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl text-gray-400">📷</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Items Yet</h3>
              <p className="text-muted">This gallery category is empty. Please check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div key={item._id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="relative h-64 bg-gray-200">
                    {item.type === 'image' ? (
                      <Image
                        src={item.url}
                        alt={item.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <video
                        src={item.url}
                        className="w-full h-full object-cover"
                        controls
                        muted
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <span className="inline-block px-3 py-1 bg-brand-green/10 text-brand-green text-sm rounded-full">
                      {item.type === 'image' ? 'Image' : 'Video'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}