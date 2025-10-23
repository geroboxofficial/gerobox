import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/product/ProductCard';
import CategoryCard from '@/components/category/CategoryCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { initialAdSpots } from '@/data/mockAds';
import { initialCarouselItems } from '@/data/mockCarouselItems';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, XCircle } from 'lucide-react';

const Index: React.FC = () => {
  // Data contoh untuk produk terbaru
  const allProducts = [
    { id: 'prod1', name: 'Telefon Pintar XYZ', price: 'RM 850', imageUrl: '/placeholder.svg', location: 'Kuala Lumpur', category: 'Elektronik' },
    { id: 'prod2', name: 'Kereta Terpakai ABC', price: 'RM 35,000', imageUrl: '/placeholder.svg', location: 'Selangor', category: 'Kenderaan' },
    { id: 'prod3', name: 'Meja Kopi Moden', price: 'RM 120', imageUrl: '/placeholder.svg', location: 'Johor Bahru', category: 'Hartanah' },
    { id: 'prod4', name: 'Baju Kurung Batik', price: 'RM 99', imageUrl: '/placeholder.svg', location: 'Pulau Pinang', category: 'Fesyen' },
    { id: 'prod5', name: 'Laptop Gaming', price: 'RM 4,500', imageUrl: '/placeholder.svg', location: 'Cyberjaya', category: 'Elektronik' },
    { id: 'prod6', name: 'Basikal Gunung', price: 'RM 700', imageUrl: '/placeholder.svg', location: 'Melaka', category: 'Sukan & Hobi' },
    { id: 'prod7', name: 'Set Sofa Ruang Tamu', price: 'RM 2,500', imageUrl: '/placeholder.svg', location: 'Kuala Lumpur', category: 'Rumah & Taman' },
    { id: 'prod8', name: 'Jam Tangan Vintage', price: 'RM 250', imageUrl: '/placeholder.svg', location: 'Selangor', category: 'Fesyen' },
    { id: 'prod9', name: 'Buku Sejarah Malaysia', price: 'RM 45', imageUrl: '/placeholder.svg', location: 'Johor Bahru', category: 'Buku & Media' },
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

  // State untuk penapis
  const [filterCategory, setFilterCategory] = useState<string>('all'); // Changed initial state to 'all'
  const [filterLocation, setFilterLocation] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Logik penapisan produk
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesCategory = filterCategory === 'all' ? true : product.category === filterCategory; // Updated logic
      const matchesLocation = filterLocation ? product.location.toLowerCase().includes(filterLocation.toLowerCase()) : true;
      const matchesSearchTerm = searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      return matchesCategory && matchesLocation && matchesSearchTerm;
    });
  }, [allProducts, filterCategory, filterLocation, searchTerm]);

  // Reset penapis
  const handleResetFilters = () => {
    setFilterCategory('all'); // Changed to 'all'
    setFilterLocation('');
    setSearchTerm('');
  };

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
                    className="max-w-3xl h-48 object-cover mx-auto rounded-lg shadow-md"
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
                {initialCarouselItems.map((item) => (
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

        {/* Filter Section */}
        <section className="w-full py-8 md:py-12 lg:py-16 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Cari Produk</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="col-span-1">
                <label htmlFor="search-term" className="block text-sm font-medium text-foreground mb-1">Nama Produk</label>
                <Input
                  id="search-term"
                  type="text"
                  placeholder="Cari nama produk..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="filter-category" className="block text-sm font-medium text-foreground mb-1">Kategori</label>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger id="filter-category" className="w-full">
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem> {/* Changed value to 'all' */}
                    {popularCategories.map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-1">
                <label htmlFor="filter-location" className="block text-sm font-medium text-foreground mb-1">Lokasi</label>
                <Input
                  id="filter-location"
                  type="text"
                  placeholder="Cari lokasi..."
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="col-span-1 flex gap-2">
                <Button onClick={handleResetFilters} variant="outline" className="w-full">
                  <XCircle className="h-4 w-4 mr-2" />
                  Reset Filter
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Produk Terbaru / Hasil Carian */}
        <section className="w-full py-8 md:py-12 lg:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-8">
              {searchTerm || (filterCategory !== 'all') || filterLocation ? 'Hasil Carian' : 'Produk Terbaru'}
            </h2>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-lg text-muted-foreground">Tiada produk ditemui dengan kriteria carian anda.</p>
            )}
            <div className="text-center mt-10">
              <Button asChild>
                <Link to="/products">Lihat Semua Produk</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Seksyen Ikon Semua Kategori (placeholder) */}
        <section className="w-full py-8 md:py-12 lg:py-16 bg-gray-50 dark:bg-gray-900">
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