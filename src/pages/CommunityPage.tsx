import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Newspaper, BookText, Users } from 'lucide-react';

const CommunityPage: React.FC = () => {
  const articles = [
    {
      id: 'art1',
      title: 'Tips Menjual Barangan Terpakai dengan Cepat',
      category: 'Artikel',
      summary: 'Ketahui strategi terbaik untuk menjual barangan terpakai anda di gerobox.my.',
      link: '/community/articles/tips-menjual',
      icon: BookText,
    },
    {
      id: 'news1',
      title: 'gerobox.my Melancarkan Ciri Chat Baharu!',
      category: 'Berita',
      summary: 'Berita baik! Kini anda boleh berhubung terus dengan pembeli dan penjual.',
      link: '/community/news/chat-feature',
      icon: Newspaper,
    },
    {
      id: 'story1',
      title: 'Kisah Kejayaan Penjual: Dari Hobi ke Perniagaan',
      category: 'Kisah Penjual',
      summary: 'Temui bagaimana seorang penjual berjaya membina perniagaan di platform kami.',
      link: '/community/seller-stories/success-story',
      icon: Users,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Komuniti gerobox.my</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((item) => (
            <Card key={item.id} className="flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4">
                <item.icon className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground mb-4">{item.summary}</p>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <Link to={item.link}>Baca Lebih Lanjut</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-lg text-muted-foreground">
            Ada cerita untuk dikongsi atau ingin menyumbang artikel?{' '}
            <Link to="/contact" className="text-primary hover:underline">
              Hubungi Kami
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CommunityPage;