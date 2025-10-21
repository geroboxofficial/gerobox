import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CheckCircle, Megaphone } from 'lucide-react';
import { useAuth } from '@/context/AuthContext'; // New import

const AdminDashboard: React.FC = () => {
  const { user } = useAuth(); // Use auth context

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-4xl font-bold mb-4 text-center">Papan Pemuka Pentadbir</h1>
        {user && (
          <p className="text-center text-lg text-muted-foreground mb-8">
            Anda log masuk sebagai: <span className="font-semibold">{user.email} ({user.role})</span>
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pengurusan Pengguna</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">Jumlah pengguna berdaftar</p>
              <p className="text-sm mt-2">
                <a href="#" className="text-primary hover:underline">Lihat & Urus Pengguna</a>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pengesahan Iklan</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">Iklan menunggu pengesahan</p>
              <p className="text-sm mt-2">
                <a href="#" className="text-primary hover:underline">Semak Iklan</a>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Promosi & Tagline</CardTitle>
              <Megaphone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">Promosi aktif</p>
              <p className="text-sm mt-2">
                <a href="#" className="text-primary hover:underline">Urus Promosi</a>
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 text-center">
          <p className="text-lg text-muted-foreground">
            Ini adalah papan pemuka pentadbir. Fungsi-fungsi lain seperti chat sokongan dan pengurusan tagline akan ditambah di sini.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;