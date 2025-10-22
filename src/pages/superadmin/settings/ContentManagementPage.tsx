import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Settings, MessageSquare, DollarSign, FileText, Globe, Users, Package, LayoutGrid, Star, TrendingUp } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ContentManagementPage: React.FC = () => {
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
      <h1 className="text-3xl font-bold mb-6">Pengurusan Kandungan</h1>
      {user && (
        <p className="text-sm text-muted-foreground mb-6">
          Anda log masuk sebagai: <span className="font-semibold">{user.email} ({user.role})</span>
        </p>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Halaman Statik</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="static-page-select">Pilih Halaman</Label>
            <Select>
              <SelectTrigger id="static-page-select">
                <SelectValue placeholder="Tentang Kami" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="about-us">Tentang Kami</SelectItem>
                <SelectItem value="faq">Soalan Lazim</SelectItem>
                <SelectItem value="privacy-policy">Polisi Privasi</SelectItem>
                <SelectItem value="terms-of-service">Terma Perkhidmatan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="page-title">Tajuk Halaman</Label>
            <Input id="page-title" defaultValue="Tentang gerobox.my" />
          </div>
          <div>
            <Label htmlFor="page-content">Isi Kandungan Halaman (HTML/Markdown)</Label>
            <Textarea id="page-content" rows={15} defaultValue="<p>gerobox.my adalah platform jual beli barangan terpakai dan baharu...</p>" />
          </div>
          <Button>Simpan Kandungan Halaman</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Banner & Promosi Utama</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="banner-image-url">URL Imej Banner 1</Label>
            <Input id="banner-image-url" defaultValue="https://via.placeholder.com/1200x400?text=Banner+Utama+1" />
          </div>
          <div>
            <Label htmlFor="banner-title">Tajuk Banner 1</Label>
            <Input id="banner-title" defaultValue="Jual Beli Mudah, Cepat & Percuma!" />
          </div>
          <div>
            <Label htmlFor="banner-description">Deskripsi Banner 1</Label>
            <Textarea id="banner-description" defaultValue="Temui barangan terpakai dan baharu di gerobox.my." />
          </div>
          <div>
            <Label htmlFor="banner-link">Pautan Banner 1</Label>
            <Input id="banner-link" defaultValue="/register" />
          </div>
          <Button>Simpan Banner</Button>
        </CardContent>
      </Card>

      <div className="mt-8 text-center text-muted-foreground">
        <p>Urus kandungan statik dan elemen promosi di laman web anda.</p>
      </div>
    </DashboardLayout>
  );
};

export default ContentManagementPage;