import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Settings, Users, Package, LayoutGrid, Globe, Star, TrendingUp, DollarSign, LineChart as LineChartIcon, BarChart as BarChartIcon, LayoutTemplate } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';

// Mock Data for Charts
const monthlySalesData = [
  { name: 'Jan', 'Jualan (RM)': 4000, 'Purata (RM)': 2400 },
  { name: 'Feb', 'Jualan (RM)': 3000, 'Purata (RM)': 1398 },
  { name: 'Mac', 'Jualan (RM)': 2000, 'Purata (RM)': 9800 },
  { name: 'Apr', 'Jualan (RM)': 2780, 'Purata (RM)': 3908 },
  { name: 'Mei', 'Jualan (RM)': 1890, 'Purata (RM)': 4800 },
  { name: 'Jun', 'Jualan (RM)': 2390, 'Purata (RM)': 3800 },
  { name: 'Jul', 'Jualan (RM)': 3490, 'Purata (RM)': 4300 },
];

const userGrowthData = [
  { name: 'Jan', 'Pengguna Baru': 100, 'Pengguna Aktif': 800 },
  { name: 'Feb', 'Pengguna Baru': 120, 'Pengguna Aktif': 850 },
  { name: 'Mac', 'Pengguna Baru': 90, 'Pengguna Aktif': 820 },
  { name: 'Apr', 'Pengguna Baru': 150, 'Pengguna Aktif': 900 },
  { name: 'Mei', 'Pengguna Baru': 110, 'Pengguna Aktif': 880 },
  { name: 'Jun', 'Pengguna Baru': 130, 'Pengguna Aktif': 920 },
  { name: 'Jul', 'Pengguna Baru': 160, 'Pengguna Aktif': 950 },
];

const productListingData = [
  { name: 'Jan', 'Produk Baru': 50, 'Produk Aktif': 500 },
  { name: 'Feb', 'Produk Baru': 60, 'Produk Aktif': 520 },
  { name: 'Mac', 'Produk Baru': 45, 'Produk Aktif': 510 },
  { name: 'Apr', 'Produk Baru': 70, 'Produk Aktif': 550 },
  { name: 'Mei', 'Produk Baru': 55, 'Produk Aktif': 530 },
  { name: 'Jun', 'Produk Baru': 65, 'Produk Aktif': 560 },
  { name: 'Jul', 'Produk Baru': 75, 'Produk Aktif': 580 },
];

const tokenSalesData = [
  { name: 'Jan', 'Jualan Token (RM)': 500 },
  { name: 'Feb', 'Jualan Token (RM)': 600 },
  { name: 'Mac', 'Jualan Token (RM)': 450 },
  { name: 'Apr', 'Jualan Token (RM)': 700 },
  { name: 'Mei', 'Jualan Token (RM)': 550 },
  { name: 'Jun', 'Jualan Token (RM)': 650 },
  { name: 'Jul', 'Jualan Token (RM)': 750 },
];

const advertisingRevenueData = [
  { name: 'Jan', 'Hasil Iklan (RM)': 1200 },
  { name: 'Feb', 'Hasil Iklan (RM)': 1500 },
  { name: 'Mac', 'Hasil Iklan (RM)': 1100 },
  { name: 'Apr', 'Hasil Iklan (RM)': 1800 },
  { name: 'Mei', 'Hasil Iklan (RM)': 1400 },
  { name: 'Jun', 'Hasil Iklan (RM)': 1600 },
  { name: 'Jul', 'Hasil Iklan (RM)': 2000 },
];

const SuperAdminStatisticsPage: React.FC = () => {
  const { user } = useAuth();

  const superAdminNavItems = [
    { label: 'Pengurusan Sistem', href: '/super-admin-dashboard/settings', icon: Settings },
    { label: 'Pengurusan Pengguna & Admin', href: '/super-admin-dashboard/users', icon: Users },
    { label: 'Produk & Kategori', href: '/super-admin-dashboard/products-categories', icon: Package },
    { label: 'Lokasi', href: '/super-admin-dashboard/locations', icon: Globe },
    { label: 'Ikon Produk', href: '/super-admin-dashboard/product-icons', icon: LayoutGrid },
    { label: 'Pengguna Premium', href: '/super-admin-dashboard/premium-users', icon: Star },
    { label: 'Pengurusan Iklan', href: '/super-admin-dashboard/advertising', icon: LayoutTemplate }, // New item
    { label: 'Statistik', href: '/super-admin-dashboard/statistics', icon: TrendingUp },
  ];

  return (
    <DashboardLayout title="Papan Pemuka Super Admin" navItems={superAdminNavItems}>
      <h1 className="text-4xl font-bold mb-4 text-center">Statistik Sistem</h1>
      {user && (
        <p className="text-center text-lg text-muted-foreground mb-8">
          Anda log masuk sebagai: <span className="font-semibold">{user.email} ({user.role})</span>
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Sales Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Jualan Bulanan</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlySalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Jualan (RM)" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Purata (RM)" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Growth Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Pertumbuhan Pengguna</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Pengguna Baru" fill="#8884d8" />
                <Bar dataKey="Pengguna Aktif" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Product Listing Trend Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Trend Penyenaraian Produk</CardTitle>
            <Package className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productListingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Produk Baru" stroke="#ffc658" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Produk Aktif" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Token Sales Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Jualan Token</CardTitle>
            <Star className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tokenSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Jualan Token (RM)" fill="#a4de6c" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Advertising Revenue Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Hasil Pengiklanan</CardTitle>
            <LayoutTemplate className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={advertisingRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Hasil Iklan (RM)" stroke="#ff0000" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 text-center">
        <p className="text-lg text-muted-foreground">
          Ini adalah halaman statistik sistem. Gunakan carta di atas untuk memantau prestasi.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminStatisticsPage;