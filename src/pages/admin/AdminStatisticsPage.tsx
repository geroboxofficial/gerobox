import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Users, CheckCircle, Megaphone, Package, TrendingUp, LineChart as LineChartIcon, BarChart as BarChartIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';

// Mock Data for Charts
const userRegistrationData = [
  { name: 'Jan', 'Pendaftaran Baru': 80 },
  { name: 'Feb', 'Pendaftaran Baru': 95 },
  { name: 'Mac', 'Pendaftaran Baru': 70 },
  { name: 'Apr', 'Pendaftaran Baru': 110 },
  { name: 'Mei', 'Pendaftaran Baru': 85 },
  { name: 'Jun', 'Pendaftaran Baru': 100 },
  { name: 'Jul', 'Pendaftaran Baru': 120 },
];

const adVerificationData = [
  { name: 'Jan', 'Diluluskan': 150, 'Menunggu': 20 },
  { name: 'Feb', 'Diluluskan': 180, 'Menunggu': 15 },
  { name: 'Mac', 'Diluluskan': 130, 'Menunggu': 25 },
  { name: 'Apr', 'Diluluskan': 200, 'Menunggu': 10 },
  { name: 'Mei', 'Diluluskan': 160, 'Menunggu': 18 },
  { name: 'Jun', 'Diluluskan': 190, 'Menunggu': 12 },
  { name: 'Jul', 'Diluluskan': 220, 'Menunggu': 8 },
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

const monthlySalesData = [
  { name: 'Jan', 'Jualan (RM)': 4000, 'Purata (RM)': 2400 },
  { name: 'Feb', 'Jualan (RM)': 3000, 'Purata (RM)': 1398 },
  { name: 'Mac', 'Jualan (RM)': 2000, 'Purata (RM)': 9800 },
  { name: 'Apr', 'Jualan (RM)': 2780, 'Purata (RM)': 3908 },
  { name: 'Mei', 'Jualan (RM)': 1890, 'Purata (RM)': 4800 },
  { name: 'Jun', 'Jualan (RM)': 2390, 'Purata (RM)': 3800 },
  { name: 'Jul', 'Jualan (RM)': 3490, 'Purata (RM)': 4300 },
];

const AdminStatisticsPage: React.FC = () => {
  const { user } = useAuth();

  const adminNavItems = [
    { label: 'Pengurusan Pengguna', href: '/admin-dashboard/users', icon: Users },
    { label: 'Pengesahan Iklan', href: '/admin-dashboard/ad-verification', icon: CheckCircle },
    { label: 'Chat Sokongan', href: '/admin-dashboard/support-chat', icon: Megaphone },
    { label: 'Promosi & Tagline', href: '/admin-dashboard/promotions-taglines', icon: Megaphone },
    { label: 'Statistik', href: '/admin-dashboard/statistics', icon: TrendingUp }, // Updated link
  ];

  return (
    <DashboardLayout title="Papan Pemuka Pentadbir" navItems={adminNavItems}>
      <h1 className="text-4xl font-bold mb-4 text-center">Statistik Pentadbir</h1>
      {user && (
        <p className="text-center text-lg text-muted-foreground mb-8">
          Anda log masuk sebagai: <span className="font-semibold">{user.email} ({user.role})</span>
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* User Registration Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Pendaftaran Pengguna Baru</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userRegistrationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Pendaftaran Baru" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Ad Verification Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Status Pengesahan Iklan</CardTitle>
            <CheckCircle className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={adVerificationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Diluluskan" fill="#82ca9d" />
                <Bar dataKey="Menunggu" fill="#ffc658" />
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
                <Line type="monotone" dataKey="Produk Baru" stroke="#ff7300" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Produk Aktif" stroke="#a4de6c" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Sales Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Jualan Bulanan</CardTitle>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
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
      </div>

      <div className="mt-10 text-center">
        <p className="text-lg text-muted-foreground">
          Ini adalah halaman statistik pentadbir. Gunakan carta di atas untuk memantau prestasi.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default AdminStatisticsPage;