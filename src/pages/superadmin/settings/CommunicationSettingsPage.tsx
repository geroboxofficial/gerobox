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

const CommunicationSettingsPage: React.FC = () => {
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
      <h1 className="text-3xl font-bold mb-6">Tetapan Komunikasi</h1>
      {user && (
        <p className="text-sm text-muted-foreground mb-6">
          Anda log masuk sebagai: <span className="font-semibold">{user.email} ({user.role})</span>
        </p>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Templat Emel</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email-template-type">Pilih Jenis Templat</Label>
            <Select>
              <SelectTrigger id="email-template-type">
                <SelectValue placeholder="Pendaftaran Pengguna" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="registration">Pendaftaran Pengguna</SelectItem>
                <SelectItem value="password-reset">Lupa Kata Laluan</SelectItem>
                <SelectItem value="order-confirmation">Pengesahan Pesanan</SelectItem>
                <SelectItem value="product-inquiry">Pertanyaan Produk</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="email-subject">Subjek Emel</Label>
            <Input id="email-subject" defaultValue="Selamat Datang ke gerobox.my!" />
          </div>
          <div>
            <Label htmlFor="email-body">Isi Kandungan Emel (HTML/Markdown)</Label>
            <Textarea id="email-body" rows={10} defaultValue="<p>Hai {{user_name}},</p><p>Terima kasih kerana mendaftar dengan gerobox.my!</p><p>Sila klik pautan ini untuk mengesahkan akaun anda: {{verification_link}}</p>" />
          </div>
          <Button>Simpan Templat</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tetapan Notifikasi Lain</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="sms-gateway">Integrasi SMS Gateway</Label>
            <Input id="sms-gateway" placeholder="API Key atau Endpoint" />
          </div>
          <div>
            <Label htmlFor="push-notification-provider">Penyedia Push Notification</Label>
            <Input id="push-notification-provider" placeholder="OneSignal App ID" />
          </div>
          <Button>Simpan Tetapan Notifikasi</Button>
        </CardContent>
      </Card>

      <div className="mt-8 text-center text-muted-foreground">
        <p>Urus semua komunikasi automatik dengan pengguna dan penjual.</p>
      </div>
    </DashboardLayout>
  );
};

export default CommunicationSettingsPage;