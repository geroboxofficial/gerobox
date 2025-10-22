import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Settings, MessageSquare, DollarSign, FileText, Globe, Users, Package, LayoutGrid, Star, TrendingUp } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const SeoSettingsPage: React.FC = () => {
  const { user } = useAuth();

  const superAdminNavItems = [
    { label: 'Pengurusan Sistem', href: '/super-admin-dashboard/settings', icon: Settings },
    { label: 'Pengurusan Pengguna & Admin', href: '/super-admin-dashboard/users', icon: Users },
    { label: 'Produk & Kategori', href: '/super-admin-dashboard/products-categories', icon: Package },
    { label: 'Lokasi', href: '/super-admin-dashboard/locations', icon: Globe },
    { label: 'Ikon Produk', href: '/super-admin-dashboard/product-icons', icon: LayoutGrid },
    { label: 'Pengguna Premium', href: '/super-admin-dashboard/premium-users', icon: Star },
    { label: 'Statistik', href: '/super-admin-dashboard', icon: TrendingUp },
  ];

  return (
    <DashboardLayout title="Papan Pemuka Super Admin" navItems={superAdminNavItems}>
      <h1 className="text-3xl font-bold mb-6">Tetapan SEO</h1>
      {user && (
        <p className="text-sm text-muted-foreground mb-6">
          Anda log masuk sebagai: <span className="font-semibold">{user.email} ({user.role})</span>
        </p>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Meta Tags Global</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="meta-title">Tajuk Meta (Global)</Label>
            <Input id="meta-title" defaultValue="gerobox.my - Jual Beli Barangan Terpakai & Baharu di Malaysia" />
          </div>
          <div>
            <Label htmlFor="meta-description">Deskripsi Meta (Global)</Label>
            <Textarea id="meta-description" rows={4} defaultValue="Platform jual beli dalam talian terbaik di Malaysia untuk barangan terpakai dan baharu. Cari tawaran hebat atau jual barang anda dengan mudah." />
          </div>
          <div>
            <Label htmlFor="meta-keywords">Kata Kunci Meta (Global, dipisahkan dengan koma)</Label>
            <Input id="meta-keywords" defaultValue="gerobox, jual beli, terpakai, baharu, Malaysia, e-dagang" />
          </div>
          <Button>Simpan Meta Tags Global</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pengurusan Peta Laman (Sitemap)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Peta laman anda dijana secara automatik. Anda boleh memuat turun atau menghantar semula ke enjin carian.
          </p>
          <div className="flex gap-4">
            <Button variant="outline">Muat Turun Sitemap XML</Button>
            <Button>Hantar Sitemap ke Google</Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 text-center text-muted-foreground">
        <p>Optimumkan laman web anda untuk enjin carian.</p>
      </div>
    </DashboardLayout>
  );
};

export default SeoSettingsPage;