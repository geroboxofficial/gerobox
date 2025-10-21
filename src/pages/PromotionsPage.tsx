import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PromotionsPage: React.FC = () => {
  const promotions = [
    {
      id: 'promo1',
      title: 'Diskaun 20% untuk Elektronik!',
      description: 'Dapatkan diskaun hebat untuk semua barangan elektronik terpilih. Terhad!',
      type: 'Diskaun',
      endDate: '31 Disember 2024',
      imageUrl: 'https://via.placeholder.com/400x250?text=Elektronik+Promo',
    },
    {
      id: 'promo2',
      title: 'Produk Sorotan Minggu Ini: Basikal Gunung',
      description: 'Lihat basikal gunung terbaik dengan harga istimewa.',
      type: 'Sorotan',
      endDate: '25 Disember 2024',
      imageUrl: 'https://via.placeholder.com/400x250?text=Basikal+Promo',
    },
    {
      id: 'promo3',
      title: 'Iklan Percuma untuk Penjual Baru!',
      description: 'Daftar sekarang dan nikmati iklan percuma untuk 3 produk pertama anda.',
      type: 'Iklan',
      endDate: '31 Januari 2025',
      imageUrl: 'https://via.placeholder.com/400x250?text=Iklan+Percuma',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Promosi & Tawaran Hebat</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <Card key={promo.id} className="overflow-hidden">
              <img src={promo.imageUrl} alt={promo.title} className="w-full h-48 object-cover" />
              <CardHeader>
                <CardTitle className="text-xl">{promo.title}</CardTitle>
                <Badge className="w-fit mt-2">{promo.type}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{promo.description}</p>
                <p className="text-sm text-gray-500">Berakhir: {promo.endDate}</p>
                <Button className="w-full mt-4" asChild>
                  <Link to={`/promotions/${promo.id}`}>Lihat Tawaran</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-lg text-muted-foreground">
            Ingin mempromosikan produk anda?{' '}
            <Link to="/seller-dashboard" className="text-primary hover:underline">
              Pergi ke Papan Pemuka Penjual
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PromotionsPage;