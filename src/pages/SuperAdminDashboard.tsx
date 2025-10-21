import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Users, Package, LayoutGrid, Globe } from 'lucide-react';

const SuperAdminDashboard: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Papan Pemuka Super Admin</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pengurusan Sistem</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Lengkap</div>
              <p className="text-xs text-muted-foreground">Kawalan penuh ke atas semua fungsi</p>
              <p className="text-sm mt-2">
                <a href="#" className="text-primary hover:underline">Tetapan Sistem</a>
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
                <a href="#" className="text-primary hover:underline">Urus Pengguna</a>
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
                <a href="#" className="text-primary hover:underline">Urus Produk & Kategori</a>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lokasi</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14 Negeri</div>
              <p className="text-xs text-muted-foreground">Urus negara, negeri, daerah</p>
              <p className="text-sm mt-2">
                <a href="#" className="text-primary hover:underline">Urus Lokasi</a>
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 text-center">
          <p className="text-lg text-muted-foreground">
            Ini adalah papan pemuka super admin. Anda mempunyai kawalan penuh ke atas semua aspek platform.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SuperAdminDashboard;