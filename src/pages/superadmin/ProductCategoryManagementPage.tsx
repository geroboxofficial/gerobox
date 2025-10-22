import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Package, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const ProductCategoryManagementPage: React.FC = () => {
  const { user } = useAuth();

  const superAdminNavItems = [
    { label: 'Pengurusan Sistem', href: '/super-admin-dashboard/settings', icon: Settings },
    { label: 'Pengurusan Pengguna & Admin', href: '/super-admin-dashboard/users', icon: Settings },
    { label: 'Produk & Kategori', href: '/super-admin-dashboard/products-categories', icon: Package },
    { label: 'Lokasi', href: '/super-admin-dashboard/locations', icon: Settings },
    { label: 'Ikon Produk', href: '/super-admin-dashboard/product-icons', icon: Settings },
    { label: 'Pengguna Premium', href: '/super-admin-dashboard/premium-users', icon: Settings },
    { label: 'Statistik', href: '/super-admin-dashboard', icon: Settings },
  ];

  return (
    <DashboardLayout title="Papan Pemuka Super Admin" navItems={superAdminNavItems}>
      <div className="flex flex-col items-center justify-center py-10">
        <h1 className="text-4xl font-bold mb-4">Pengurusan Produk & Kategori</h1>
        <p className="text-lg text-muted-foreground">Halaman ini adalah untuk mengurus produk dan kategori. (Dalam Pembinaan)</p>
        {user && (
          <p className="text-center text-sm text-muted-foreground mt-4">
            Anda log masuk sebagai: <span className="font-semibold">{user.email} ({user.role})</span>
          </p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProductCategoryManagementPage;