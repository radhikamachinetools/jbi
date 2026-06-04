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
    const checkAuth = () => {
      const authCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('admin-auth='));
      
      if (authCookie && authCookie.split('=')[1] === 'true') {
        setIsAuthenticated(true);
      } else if (pathname !== '/admin/login') {
        router.push('/admin/login');
      }
      setLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  const handleLogout = () => {
    document.cookie = 'admin-auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/admin/login');
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>;
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="w-64 bg-white shadow-lg min-h-screen border-r border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">JBI Admin</h2>
            <p className="text-sm text-gray-600 mt-1">Content Management</p>
          </div>
          <nav className="mt-6">
            <Link
              href="/admin"
              className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors ${
                pathname === '/admin' ? 'bg-primary text-white hover:bg-primary' : ''
              }`}
            >
              <Package size={20} />
              Dashboard
            </Link>
            <Link
              href="/admin/categories"
              className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors ${
                pathname === '/admin/categories' ? 'bg-primary text-white hover:bg-primary' : ''
              }`}
            >
              <FolderOpen size={20} />
              Categories
            </Link>
            <Link
              href="/admin/products"
              className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors ${
                pathname.startsWith('/admin/products') ? 'bg-primary text-white hover:bg-primary' : ''
              }`}
            >
              <Package size={20} />
              Products
            </Link>
            <Link
              href="/admin/contacts"
              className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors ${
                pathname === '/admin/contacts' ? 'bg-primary text-white hover:bg-primary' : ''
              }`}
            >
              <Mail size={20} />
              Contacts
            </Link>
            <Link
              href="/admin/certificates"
              className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors ${
                pathname === '/admin/certificates' ? 'bg-primary text-white hover:bg-primary' : ''
              }`}
            >
              <Award size={20} />
              Certificates
            </Link>
            <Link
              href="/admin/gallery"
              className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors ${
                pathname === '/admin/gallery' ? 'bg-primary text-white hover:bg-primary' : ''
              }`}
            >
              <ImageIcon size={20} />
              Gallery
            </Link>
            <Link
              href="/admin/infrastructure"
              className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors ${
                pathname === '/admin/infrastructure' ? 'bg-primary text-white hover:bg-primary' : ''
              }`}
            >
              <Building2 size={20} />
              Infrastructure
            </Link>
            <Link
              href="/admin/media"
              className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors ${
                pathname === '/admin/media' ? 'bg-primary text-white hover:bg-primary' : ''
              }`}
            >
              <Image size={20} />
              Media
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 w-full text-left transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </nav>
        </aside>
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}