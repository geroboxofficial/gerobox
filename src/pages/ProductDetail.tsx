import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Data contoh produk (akan diganti dengan data sebenar dari API)
  const product = {
    id: id,
    name: `Produk Contoh ${id}`,
    price: 'RM 1,200',
    stock: 5,
    description: 'Ini adalah penerangan terperinci untuk produk contoh ini. Ia adalah barangan berkualiti tinggi yang sesuai untuk kegunaan harian anda. Dapatkan sekarang!',
    images: [
      'https://via.placeholder.com/600x400?text=Produk+Utama',
      'https://via.placeholder.com/300x200?text=Galeri+1',
      'https://via.placeholder.com/300x200?text=Galeri+2',
    ],
    seller: {
      name: 'Penjual Hebat',
      profileLink: '/profile/seller123',
      isTrusted: true,
    },
    views: 1234,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div>
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
            <div className="grid grid-cols-3 gap-2 mt-4">
              {product.images.slice(1).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} galeri ${index + 1}`}
                  className="w-full h-24 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-4xl font-extrabold text-primary mb-4">{product.price}</p>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
              <span>Stok: {product.stock}</span>
              <span>|</span>
              <span>Dilihat: {product.views} kali</span>
            </div>

            <p className="text-lg mb-6">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <Button variant="outline" className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Tambah ke Kegemaran
              </Button>
              <Button className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Chat Penjual
              </Button>
            </div>

            <div className="border-t pt-6 mt-6">
              <h3 className="text-xl font-semibold mb-3">Maklumat Penjual</h3>
              <div className="flex items-center gap-3">
                <img
                  src="https://via.placeholder.com/50x50?text=Penjual"
                  alt={product.seller.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <Link to={product.seller.profileLink} className="text-lg font-medium hover:underline">
                    {product.seller.name}
                  </Link>
                  {product.seller.isTrusted && (
                    <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Trusted Seller
                    </span>
                  )}
                </div>
              </div>
              <Button variant="outline" className="mt-4 flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Kongsi ke Media Sosial
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;