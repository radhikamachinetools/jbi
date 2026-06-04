"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Package, Mail, Image, LogOut, FolderOpen, Award, ImageIcon, Building2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/admin/login') {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check');
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
        } else {
          router.replace('/admin/login');
        }
      } catch {
        router.replace('/admin/login');
      }
      setLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/admin/login');
  };

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green"></div>
    </div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="w-64 bg-white shadow-lg min-h-screen border-r border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img src="/jbilogo.jpeg" alt="JBI" className="w-10 h-10 rounded-lg" />
              <div>
                <h2 className="text-sm font-bold text-gray-900">Admin Panel</h2>
                <p className="text-xs text-gray-500">Content Management</p>
              </div>
            </div>
          </div>
          <nav className="mt-6">
            <Link href="/admin" className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors ${pathname === '/admin' ? 'bg-brand-green text-white hover:bg-brand-green' : ''}`}>
              <Package size={20} /> Dashboard
            </Link>
            <Link href="/admin/categories" className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors ${pathname === '/admin/categories' ? 'bg-brand-green text-white hover:bg-brand-green' : ''}`}>
              <FolderOpen size={20} /> Categories
            </Link>
            <Link href="/admin/products" className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors ${pathname.startsWith('/admin/products') ? 'bg-brand-green text-white hover:bg-brand-green' : ''}`}>
              <Package size={20} /> Products
            </Link>
            <Link href="/admin/contacts" className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors ${pathname === '/admin/contacts' ? 'bg-brand-green text-white hover:bg-brand-green' : ''}`}>
              <Mail size={20} /> Contacts
            </Link>
            <Link href="/admin/certificates" className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors ${pathname === '/admin/certificates' ? 'bg-brand-green text-white hover:bg-brand-green' : ''}`}>
              <Award size={20} /> Certificates
            </Link>
            <Link href="/admin/gallery" className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors ${pathname === '/admin/gallery' ? 'bg-brand-green text-white hover:bg-brand-green' : ''}`}>
              <ImageIcon size={20} /> Gallery
            </Link>
            <Link href="/admin/infrastructure" className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors ${pathname === '/admin/infrastructure' ? 'bg-brand-green text-white hover:bg-brand-green' : ''}`}>
              <Building2 size={20} /> Infrastructure
            </Link>
            <Link href="/admin/media" className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors ${pathname.startsWith('/admin/media') ? 'bg-brand-green text-white hover:bg-brand-green' : ''}`}>
              <Image size={20} /> Media
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 w-full text-left transition-colors">
              <LogOut size={20} /> Logout
            </button>
          </nav>
        </aside>
        <main className="flex-1 p-8">
          {children}
          <footer className="mt-12 pt-6 border-t border-gray-200 text-center">
            <a href="https://techrover.co.in" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-brand-green transition-colors">
              Developed with ❤️ by <span className="font-medium">Team TechRover</span>
            </a>
          </footer>
        </main>
      </div>
    </div>
  );
}
