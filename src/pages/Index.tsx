import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/product/ProductCard';
import CategoryCard from '@/components/category/CategoryCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { initialAdSpots, AdSpot } from '@/data/mockAds'; // Import ad data

const Index: React.FC = () => {
  // Data contoh untuk slider
  const sliderItems = [
    {
      id: '1',
      title: 'Jual Beli Mudah, Cepat & Percuma!',
      description: 'Temui barangan terpakai dan baharu di gerobox.my.',
      imageUrl: '/placeholder.svg', // Changed to local placeholder
      buttonText: 'Mula Menjual',
      buttonLink: '/register',
    },
    {
      id: '2',
      title: 'Diskaun Menarik Menanti Anda!',
      description: 'Jangan lepaskan tawaran istimewa dari penjual kami.',
      imageUrl: '/placeholder.svg', // Changed to local placeholder
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
    { name: 'Buku & Media', icon: 'BookOpen', link: '/categories/books' },
    { name: 'Rumah & Taman', icon: 'Lamp', link: '/categories/home-garden' },
    { name: 'Sukan & Hobi', icon: 'Dumbbell', link: '/categories/sports-hobbies' },
  ];

  // Data contoh untuk produk terbaru
  const latestProducts = [
    { id: 'prod1', name: 'Telefon Pintar XYZ', price: 'RM 850', imageUrl: '/placeholder.svg', location: 'Kuala Lumpur' }, // Changed to local placeholder
    { id: 'prod2', name: 'Kereta Terpakai ABC', price: 'RM 35,000', imageUrl: '/placeholder.svg', location: 'Selangor' }, // Changed to local placeholder
    { id: 'prod3', name: 'Meja Kopi Moden', price: 'RM 120', imageUrl: '/placeholder.svg', location: 'Johor Bahru' }, // Changed to local placeholder
    { id: 'prod4', name: 'Baju Kurung Batik', price: 'RM 99', imageUrl: '/placeholder.svg', location: 'Pulau Pinang' }, // Changed to local placeholder
    { id: 'prod5', name: 'Laptop Gaming', price: 'RM 4,500', imageUrl: '/placeholder.svg', location: 'Cyberjaya' }, // Changed to local placeholder
    { id: 'prod6', name: 'Basikal Gunung', price: 'RM 700', imageUrl: '/placeholder.svg', location: 'Melaka' }, // Changed to local placeholder
  ];

  // Find the active "Atas Halaman" ad
  const activeTopAd = initialAdSpots.find(
    (ad) => ad.location === 'Atas Halaman' && ad.status === 'Aktif',
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Display the active "Atas Halaman" ad if available */}
        {activeTopAd && (
          <section className="w-full py-4 md:py-6 bg-gray-100 dark:bg-gray-800">
            <div className="container px-4 md:px-6 text-center">
              {activeTopAd.contentType === 'image' && activeTopAd.imageUrl && (
                <a href={activeTopAd.targetUrl} target="_blank" rel="noopener noreferrer">
                  <img
                    src={activeTopAd.imageUrl}
                    alt={activeTopAd.name}
                    className="max-w-3xl h-48 object-cover mx-auto rounded-lg shadow-md" // Adjusted size here
                  />
                </a>
              )}
              {activeTopAd.contentType === 'html' && activeTopAd.adCode && (
                <div dangerouslySetInnerHTML={{ __html: activeTopAd.adCode }} />
              )}
            </div>
          </section>
        )}

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