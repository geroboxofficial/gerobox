import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/product/ProductCard';
import CategoryCard from '@/components/category/CategoryCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const Index: React.FC = () => {
  // Data contoh untuk slider
  const sliderItems = [
    {
      id: '1',
      title: 'Jual Beli Mudah, Cepat & Percuma!',
      description: 'Temui barangan terpakai dan baharu di gerobox.my.',
      imageUrl: 'https://via.placeholder.com/1200x400/F0F4F8/888888?text=Promosi+Hebat+1',
      buttonText: 'Mula Menjual',
      buttonLink: '/register',
    },
    {
      id: '2',
      title: 'Diskaun Menarik Menanti Anda!',
      description: 'Jangan lepaskan tawaran istimewa dari penjual kami.',
      imageUrl: 'https://via.placeholder.com/1200x400/E8F0F4/888888?text=Promosi+Hebat+2',
      buttonText: 'Lihat Promosi',
      buttonLink: '/promotions',
    },
  ];

  // Data contoh untuk kategori popular
  const popularCategories = [
    { name: 'Elektronik', icon: 'Smartphone', link: '/categories/electronics' },
    { name: 'Kenderaan', icon: 'Car', link: '/categories/vehicles' },
    { name: 'Hartanah', icon: 'Home', link: '/categories/property' },
    { name: 'Fesyen', icon: 'Shirt', link: '/categories/fashion' },
    { name: 'Perkhidmatan', icon: 'Briefcase', link: '/categories/services' },
    { name: 'Buku', icon: 'BookOpen', link: '/categories/books' },
  ];

  // Data contoh untuk produk terbaru
  const latestProducts = [
    { id: 'prod1', name: 'Telefon Pintar XYZ', price: 'RM 850', imageUrl: 'https://via.placeholder.com/300x200?text=Telefon+Pintar', location: 'Kuala Lumpur' },
    { id: 'prod2', name: 'Kereta Terpakai ABC', price: 'RM 35,000', imageUrl: 'https://via.placeholder.com/300x200?text=Kereta+Terpakai', location: 'Selangor' },
    { id: 'prod3', name: 'Meja Kopi Moden', price: 'RM 120', imageUrl: 'https://via.placeholder.com/300x200?text=Meja+Kopi', location: 'Johor Bahru' },
    { id: 'prod4', name: 'Baju Kurung Batik', price: 'RM 99', imageUrl: 'https://via.placeholder.com/300x200?text=Baju+Kurung', location: 'Pulau Pinang' },
    { id: 'prod5', name: 'Laptop Gaming', price: 'RM 4,500', imageUrl: 'https://via.placeholder.com/300x200?text=Laptop+Gaming', location: 'Cyberjaya' },
    { id: 'prod6', name: 'Basikal Gunung', price: 'RM 700', imageUrl: 'https://via.placeholder.com/300x200?text=Basikal+Gunung', location: 'Melaka' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Main Slider */}
        <section className="w-full py-8 md:py-12 lg:py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <Carousel className="w-full max-w-4xl mx-auto">
              <CarouselContent>
                {sliderItems.map((item) => (
                  <CarouselItem key={item.id}>
                    <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
                        <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
                          {item.title}
                        </h2>
                        <p className="text-base md:text-lg text-white mb-4">
                          {item.description}
                        </p>
                        <Button asChild>
                          <Link to={item.buttonLink}>{item.buttonText}</Link>
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        {/* Kategori Popular */}
        <section className="w-full py-8 md:py-12 lg:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Kategori Popular</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {popularCategories.map((category) => (
                <CategoryCard key={category.name} {...category} />
              ))}
            </div>
          </div>
        </section>

        {/* Produk Terbaru */}
        <section className="w-full py-8 md:py-12 lg:py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Produk Terbaru</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {latestProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Button asChild>
                <Link to="/products">Lihat Semua Produk</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Seksyen Ikon Semua Kategori (placeholder) */}
        <section className="w-full py-8 md:py-12 lg:py-16">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">Terokai Semua Kategori</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Cari apa sahaja yang anda perlukan dari pelbagai kategori kami.
            </p>
            <Button asChild>
              <Link to="/categories">Lihat Semua Kategori</Link>
            </Button>
          </div>
        </section>
      </main>
      <MadeWithDyad />
      <Footer />
    </div>
  );
};

export default Index;