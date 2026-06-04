import { ShieldCheck, Wrench, Trophy, Award, Users, Clock } from "lucide-react";
import { connectToDatabase } from './lib/db';
import { normalizeMongoDocuments } from './lib/mongo-utils';

import HeroClient from "./components/HeroClient";
import FeatureCardClient from "./components/FeatureCardClient";
import ProductCardClient from "./components/ProductCardClient";
import HomeContactForm from "./components/HomeContactForm";
import MediaSlider from "./components/MediaSlider";
import Header from "./components/Header";

type Product = {
  order: number;
  isFeatured: boolean;
  _id: string;
  slug: string;
  name: string;
  imageUrl?: string;
  shortDescription: string;
  category: string;
};

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const { db } = await connectToDatabase();
    const products = await db.collection('jbi_products').find({ isFeatured: true }).sort({ order: 1 }).toArray();
    return normalizeMongoDocuments(products) as unknown as Product[];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroClient />

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Our Products
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Premium Stone Processing Machinery
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our comprehensive range of high-performance equipment designed for precision and reliability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCardClient
                key={product._id}
                product={product}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
              Our Facility
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              State-of-the-Art Manufacturing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take a look inside our advanced production facility where precision meets innovation
            </p>
          </div>
          <div className="relative">
            <MediaSlider />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
              Why Choose Us
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Jai Balaji Industries?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine decades of expertise with cutting-edge technology to deliver unmatched quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCardClient
              icon={<Trophy size={48} className="text-primary" />}
              title="Industry Leaders"
            >
              Over 25 years of experience in designing and manufacturing
              high-performance stone processing machinery for global markets.
            </FeatureCardClient>
            
            <FeatureCardClient
              icon={<ShieldCheck size={48} className="text-primary" />}
              title="Unmatched Durability"
            >
              Our machines are built with premium materials and rigorous testing
              to withstand the toughest industrial environments.
            </FeatureCardClient>
            
            <FeatureCardClient
              icon={<Wrench size={48} className="text-primary" />}
              title="Expert Support"
            >
              Comprehensive after-sales support, maintenance services, and technical
              assistance to ensure optimal performance.
            </FeatureCardClient>
            
            <FeatureCardClient
              icon={<Award size={48} className="text-primary" />}
              title="Quality Certified"
            >
              ISO certified manufacturing processes and quality control systems
              ensure every machine meets international standards.
            </FeatureCardClient>
            
            <FeatureCardClient
              icon={<Users size={48} className="text-primary" />}
              title="Trusted by 500+"
            >
              Serving over 500 satisfied clients worldwide with customized
              solutions for diverse industrial requirements.
            </FeatureCardClient>
            
            <FeatureCardClient
              icon={<Clock size={48} className="text-primary" />}
              title="24/7 Service"
            >
              Round-the-clock technical support and emergency service to minimize
              downtime and maximize productivity.
            </FeatureCardClient>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Transform Your Production?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Let&apos;s discuss how Jai Balaji Industries can help you achieve your production goals.
              Get in touch with our experts today.
            </p>
          </div>
          <HomeContactForm />
        </div>
      </section>
    </div>
  );
}