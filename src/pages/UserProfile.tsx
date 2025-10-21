import React from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Heart, MessageSquare } from 'lucide-react';

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Data contoh pengguna (akan diganti dengan data sebenar dari API)
  const user = {
    id: id,
    name: 'Nama Pengguna Contoh',
    avatarUrl: 'https://via.placeholder.com/150x150?text=Pengguna',
    email: 'pengguna@example.com',
    phone: '+60123456789',
    bio: 'Pengguna aktif di gerobox.my. Suka mencari barangan unik dan menjual barang-barang terpakai yang masih elok.',
    favorites: [
      { id: 'fav1', name: 'Kamera DSLR', price: 'RM 1,500', imageUrl: 'https://via.placeholder.com/100x70?text=Kamera' },
      { id: 'fav2', name: 'Jam Tangan Vintage', price: 'RM 250', imageUrl: 'https://via.placeholder.com/100x70?text=Jam' },
    ],
    chatHistory: [
      { id: 'chat1', with: 'Penjual A', lastMessage: 'Bila boleh COD?', time: '2 jam lalu' },
      { id: 'chat2', with: 'Pembeli B', lastMessage: 'Produk masih ada?', time: '1 hari lalu' },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* User Info Card */}
          <Card className="md:col-span-1">
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <p className="text-muted-foreground text-sm">{user.bio}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{user.phone}</span>
              </div>
              <Button className="w-full" asChild> {/* Added asChild */}
                <Link to="/chat"> {/* Link to chat page */}
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Mesej Pengguna
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Main Content (Favorites & Chat History) */}
          <div className="md:col-span-2 space-y-8">
            {/* Favorites List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Senarai Kegemaran
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user.favorites.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {user.favorites.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 border p-3 rounded-md">
                        <img src={item.imageUrl} alt={item.name} className="h-16 w-16 object-cover rounded-md" />
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-primary font-semibold">{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Tiada item dalam senarai kegemaran.</p>
                )}
              </CardContent>
            </Card>

            {/* Chat History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Sejarah Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user.chatHistory.length > 0 ? (
                  <div className="space-y-4">
                    {user.chatHistory.map((chat) => (
                      <Link to="/chat" key={chat.id} className="flex justify-between items-center border p-3 rounded-md hover:bg-accent transition-colors">
                        <div>
                          <h4 className="font-medium">Chat dengan {chat.with}</h4>
                          <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Tiada sejarah chat.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfile;