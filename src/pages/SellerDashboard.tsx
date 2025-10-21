import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, BarChart, Bell, User, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext'; // New import

const SellerDashboard: React.FC = () => {
  const { user } = useAuth(); // Use auth context

  // Data contoh penjual
  const seller = {
    name: 'Kedai ABC',
    imageUrl: 'https://via.placeholder.com/100x100?text=Kedai',
    bio: 'Menjual pelbagai barangan elektronik dan gajet terkini.',
    businessPhone: '+60198765432',
    businessEmail: 'kedaiabc@example.com',
    businessAddress: 'No. 1, Jalan Perniagaan, 50000 Kuala Lumpur',
    businessRegNo: 'SA123456789',
    isTrusted: true,
    productsCount: 45,
    totalSales: 'RM 12,500',
    totalViews: 15000,
    notifications: 3,
    tokens: 10,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-4xl font-bold mb-4 text-center">GeroBox Saya (Papan Pemuka Penjual)</h1>
        {user && (
          <p className="text-center text-lg text-muted-foreground mb-8">
            Anda log masuk sebagai: <span className="font-semibold">{user.email} ({user.role})</span>
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Seller Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader className="flex flex-col items-center text-center">
              <img
                src={seller.imageUrl}
                alt={seller.name}
                className="h-24 w-24 rounded-full object-cover mb-4"
              />
              <CardTitle className="text-2xl">{seller.name}</CardTitle>
              {seller.isTrusted && (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 mt-2">
                  <Star className="h-4 w-4 mr-1" /> Trusted Seller
                </span>
              )}
              <p className="text-muted-foreground text-sm mt-2">{seller.bio}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <h3 className="font-semibold text-lg">Profil Perniagaan</h3>
              <p className="text-sm text-muted-foreground">Telefon: {seller.businessPhone}</p>
              <p className="text-sm text-muted-foreground">Emel: {seller.businessEmail}</p>
              <p className="text-sm text-muted-foreground">Alamat: {seller.businessAddress}</p>
              <p className="text-sm text-muted-foreground">No. Pendaftaran: {seller.businessRegNo}</p>
              <Button className="w-full mt-4" asChild>
                <Link to="/seller/profile/edit">Kemaskini Profil</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Main Dashboard Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Jumlah Produk</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{seller.productsCount}</div>
                  <p className="text-xs text-muted-foreground">Produk aktif</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Jumlah Jualan</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{seller.totalSales}</div>
                  <p className="text-xs text-muted-foreground">Sepanjang masa</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Jumlah View</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{seller.totalViews}</div>
                  <p className="text-xs text-muted-foreground">Produk anda</p>
                </CardContent>
              </Card>
            </div>

            {/* Product Management */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">Pengurusan Produk</CardTitle>
                <Button size="sm" asChild>
                  <Link to="/seller/products/add">Tambah Produk Baru</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Urus produk anda: tambah, padam, edit harga, stok, dan kategori.</p>
                <Button variant="link" className="p-0 h-auto mt-2" asChild>
                  <Link to="/seller/products">Lihat Semua Produk</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">Notifikasi Pelanggan</CardTitle>
                <Bell className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Anda mempunyai {seller.notifications} notifikasi baru.</p>
                <Button variant="link" className="p-0 h-auto mt-2" asChild>
                  <Link to="/seller/notifications">Lihat Notifikasi</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Token & Promotions */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">Token & Promosi</CardTitle>
                <Star className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Anda mempunyai {seller.tokens} token. Gunakan token untuk mengiklankan dalam kategori premium.</p>
                <div className="flex gap-4 mt-4">
                  <Button size="sm" asChild>
                    <Link to="/seller/tokens">Beli Token</Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/seller/promotions">Urus Promosi</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SellerDashboard;