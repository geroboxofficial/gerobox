import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Users, Package, LayoutGrid, Globe, TrendingUp, Eye, Star, DollarSign, LayoutTemplate, Image } from 'lucide-react'; // Added Image icon
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Link } from 'react-router-dom';

const SuperAdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const superAdminNavItems = [
    { label: 'Pengurusan Sistem', href: '/super-admin-dashboard/settings', icon: Settings },
    { label: 'Pengurusan Pengguna & Admin', href: '/super-admin-dashboard/users', icon: Users },
    { label: 'Produk & Kategori', href: '/super-admin-dashboard/products-categories', icon: Package },
    { label: 'Lokasi', href: '/super-admin-dashboard/locations', icon: Globe },
    { label: 'Ikon Produk', href: '/super-admin-dashboard/product-icons', icon: LayoutGrid },
    { label: 'Pengguna Premium', href: '/super-admin-dashboard/premium-users', icon: Star },
    { label: 'Pengurusan Iklan', href: '/super-admin-dashboard/advertising', icon: LayoutTemplate },
    { label: 'Pengurusan Carousel', href: '/super-admin-dashboard/carousel-management', icon: Image }, // New item
    { label: 'Statistik', href: '/super-admin-dashboard/statistics', icon: TrendingUp },
  ];

  return (
    <DashboardLayout title="Papan Pemuka Super Admin" navItems={superAdminNavItems}>
      <h1 className="text-4xl font-bold mb-4 text-center">Papan Pemuka Super Admin</h1>
      {user && (
        <p className="text-center text-lg text-muted-foreground mb-8">
          Anda log masuk sebagai: <span className="font-semibold">{user.email} ({user.role})</span>
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Existing Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pengurusan Sistem</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Lengkap</div>
            <p className="text-xs text-muted-foreground">Kawalan penuh ke atas semua fungsi</p>
            <p className="text-sm mt-2">
              <Link to="/super-admin-dashboard/settings" className="text-primary hover:underline">Tetapan Sistem</Link>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pengurusan Pengguna & Admin</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 Admin</div>
            <p className="text-xs text-muted-foreground">Urus pengguna premium & had capaian</p>
            <p className="text-sm mt-2">
              <Link to="/super-admin-dashboard/users" className="text-primary hover:underline">Urus Pengguna</Link>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produk & Kategori</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">200+ Kategori</div>
            <p className="text-xs text-muted-foreground">Urus produk, kategori, ikon</p>
            <p className="text-sm mt-2">
              <Link to="/super-admin-dashboard/products-categories" className="text-primary hover:underline">Urus Produk & Kategori</Link>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pengurusan Iklan</CardTitle>
            <LayoutTemplate className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4 Tapak Aktif</div>
            <p className="text-xs text-muted-foreground">Tetapkan lokasi & kadar jualan iklan</p>
            <p className="text-sm mt-2">
              <Link to="/super-admin-dashboard/advertising" className="text-primary hover:underline">Urus Iklan</Link>
            </p>
          </CardContent>
        </Card>

        {/* New Card: Pengurusan Carousel */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pengurusan Carousel</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 Item Aktif</div>
            <p className="text-xs text-muted-foreground">Urus banner utama & promosi</p>
            <p className="text-sm mt-2">
              <Link to="/super-admin-dashboard/carousel-management" className="text-primary hover:underline">Urus Carousel</Link>
            </p>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jumlah Produk Aktif</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground">Produk disenaraikan di platform</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trafik Harian</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34,567</div>
            <p className="text-xs text-muted-foreground">Pengunjung unik hari ini</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jualan Bulan Ini</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">RM 250,000</div>
            <p className="text-xs text-muted-foreground">Jumlah nilai transaksi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jualan Token</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">RM 15,000</div>
            <p className="text-xs text-muted-foreground">Jumlah jualan token bulan ini</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 text-center">
        <p className="text-lg text-muted-foreground">
          Ini adalah papan pemuka super admin. Gunakan menu di sisi untuk navigasi.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;