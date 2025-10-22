import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Settings, MessageSquare, DollarSign, FileText, Globe, Users, Package, LayoutGrid, Star, TrendingUp } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const FinancialSettingsPage: React.FC = () => {
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
      <h1 className="text-3xl font-bold mb-6">Tetapan Kewangan</h1>
      {user && (
        <p className="text-sm text-muted-foreground mb-6">
          Anda log masuk sebagai: <span className="font-semibold">{user.email} ({user.role})</span>
        </p>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Gerbang Pembayaran</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="stripe-enabled" />
            <Label htmlFor="stripe-enabled">Aktifkan Stripe</Label>
          </div>
          <div>
            <Label htmlFor="stripe-api-key">Stripe Secret Key</Label>
            <Input id="stripe-api-key" type="password" placeholder="sk_live_..." />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="paypal-enabled" />
            <Label htmlFor="paypal-enabled">Aktifkan PayPal</Label>
          </div>
          <div>
            <Label htmlFor="paypal-client-id">PayPal Client ID</Label>
            <Input id="paypal-client-id" placeholder="Client ID" />
          </div>
          <Button>Simpan Tetapan Pembayaran</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mata Wang & Cukai</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="default-currency">Mata Wang Lalai</Label>
            <Input id="default-currency" defaultValue="MYR" />
          </div>
          <div>
            <Label htmlFor="tax-rate">Kadar Cukai (%)</Label>
            <Input id="tax-rate" type="number" defaultValue="6" />
          </div>
          <Button>Simpan Tetapan Mata Wang & Cukai</Button>
        </CardContent>
      </Card>

      <div className="mt-8 text-center text-muted-foreground">
        <p>Urus semua tetapan berkaitan kewangan dan pembayaran.</p>
      </div>
    </DashboardLayout>
  );
};

export default FinancialSettingsPage;