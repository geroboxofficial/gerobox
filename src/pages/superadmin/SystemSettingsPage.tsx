import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Settings, Users, Package, LayoutGrid, Globe, Star, MessageSquare, DollarSign, FileText } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const SystemSettingsPage: React.FC = () => {
  const { user } = useAuth();

  // Navigation items for the System Settings section
  const systemSettingsNavItems = [
    { label: 'Tetapan Umum', href: '/super-admin-dashboard/settings/general', icon: Settings },
    { label: 'Tetapan Komunikasi', href: '/super-admin-dashboard/settings/communication', icon: MessageSquare },
    { label: 'Tetapan Kewangan', href: '/super-admin-dashboard/settings/financial', icon: DollarSign },
    { label: 'Pengurusan Kandungan', href: '/super-admin-dashboard/settings/content', icon: FileText },
    { label: 'Tetapan SEO', href: '/super-admin-dashboard/settings/seo', icon: Globe },
  ];

  // Main navigation items for the Super Admin Dashboard (passed to DashboardLayout)
  const superAdminNavItems = [
    { label: 'Pengurusan Sistem', href: '/super-admin-dashboard/settings', icon: Settings },
    { label: 'Pengurusan Pengguna & Admin', href: '/super-admin-dashboard/users', icon: Users },
    { label: 'Produk & Kategori', href: '/super-admin-dashboard/products-categories', icon: Package },
    { label: 'Lokasi', href: '/super-admin-dashboard/locations', icon: Globe },
    { label: 'Ikon Produk', href: '/super-admin-dashboard/product-icons', icon: LayoutGrid },
    { label: 'Pengguna Premium', href: '/super-admin-dashboard/premium-users', icon: Star },
    { label: 'Statistik', href: '/super-admin-dashboard', icon: TrendingUp },
  ];

  const settingCards = [
    {
      title: 'Tetapan Umum',
      description: 'Urus nama laman web, logo, maklumat hubungan, dan mod penyelenggaraan.',
      icon: Settings,
      link: '/super-admin-dashboard/settings/general',
    },
    {
      title: 'Tetapan Komunikasi',
      description: 'Konfigurasi templat emel dan tetapan notifikasi lain.',
      icon: MessageSquare,
      link: '/super-admin-dashboard/settings/communication',
    },
    {
      title: 'Tetapan Kewangan',
      description: 'Urus gerbang pembayaran, mata wang, dan tetapan cukai.',
      icon: DollarSign,
      link: '/super-admin-dashboard/settings/financial',
    },
    {
      title: 'Pengurusan Kandungan',
      description: 'Edit halaman statik dan urus banner/promosi utama.',
      icon: FileText,
      link: '/super-admin-dashboard/settings/content',
    },
    {
      title: 'Tetapan SEO',
      description: 'Konfigurasi meta tags, deskripsi, dan peta laman.',
      icon: Globe,
      link: '/super-admin-dashboard/settings/seo',
    },
  ];

  return (
    <DashboardLayout title="Papan Pemuka Super Admin" navItems={superAdminNavItems}>
      <h1 className="text-4xl font-bold mb-4 text-center">Pengurusan Sistem</h1>
      {user && (
        <p className="text-center text-lg text-muted-foreground mb-8">
          Anda log masuk sebagai: <span className="font-semibold">{user.email} ({user.role})</span>
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingCards.map((card) => (
          <Card key={card.title} className="flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4">
              <card.icon className="h-6 w-6 text-primary" />
              <CardTitle className="text-xl">{card.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground mb-4">{card.description}</p>
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link to={card.link}>Urus Sekarang</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-lg text-muted-foreground">
          Gunakan pautan di atas untuk mengurus pelbagai aspek sistem.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default SystemSettingsPage;