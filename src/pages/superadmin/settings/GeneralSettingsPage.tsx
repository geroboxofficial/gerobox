import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Settings, MessageSquare, DollarSign, FileText, Globe, Users, Package, LayoutGrid, Star, TrendingUp } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const GeneralSettingsPage: React.FC = () => {
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
      <h1 className="text-3xl font-bold mb-6">Tetapan Umum Sistem</h1>
      {user && (
        <p className="text-sm text-muted-foreground mb-6">
          Anda log masuk sebagai: <span className="font-semibold">{user.email} ({user.role})</span>
        </p>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Maklumat Laman Web</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="site-name">Nama Laman Web</Label>
            <Input id="site-name" defaultValue="gerobox.my" />
          </div>
          <div>
            <Label htmlFor="site-logo">URL Logo Laman Web</Label>
            <Input id="site-logo" defaultValue="/placeholder.svg" /> {/* Changed to local placeholder */}
          </div>
          <div>
            <Label htmlFor="contact-email">Emel Hubungan Utama</Label>
            <Input id="contact-email" type="email" defaultValue="support@gerobox.my" />
          </div>
          <div>
            <Label htmlFor="contact-phone">Nombor Telefon Hubungan</Label>
            <Input id="contact-phone" type="tel" defaultValue="+60123456789" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="maintenance-mode">Mod Penyelenggaraan</Label>
            <Switch id="maintenance-mode" />
          </div>
          <Button>Simpan Perubahan</Button>
        </CardContent>
      </Card>

      <div className="mt-8 text-center text-muted-foreground">
        <p>Halaman ini membolehkan anda mengurus tetapan umum laman web.</p>
      </div>
    </DashboardLayout>
  );
};

export default GeneralSettingsPage;