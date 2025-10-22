import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Heart, MessageSquare } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user: loggedInUser } = useAuth();
  const navigate = useNavigate();

  // Determine if we are viewing the logged-in user's own profile
  // This is true if no ID is in the URL (e.g., /profile) OR if the ID matches the logged-in user's email
  const isViewingOwnProfile = !id || (loggedInUser && id === loggedInUser.email);

  // Data for the profile to be displayed
  let displayUser;

  if (isViewingOwnProfile && loggedInUser) {
    // Display logged-in user's profile
    displayUser = {
      id: loggedInUser.email,
      name: loggedInUser.email.split('@')[0],
      avatarUrl: '/placeholder.svg', // Changed to local placeholder
      email: loggedInUser.email,
      phone: '+601122334455',
      bio: 'Ini adalah profil saya di gerobox.my. Suka mencari barangan unik dan menjual barang-barang terpakai yang masih elok.',
      favorites: [
        { id: 'fav1', name: 'Kamera DSLR', price: 'RM 1,500', imageUrl: '/placeholder.svg' }, // Changed to local placeholder
        { id: 'fav2', name: 'Jam Tangan Vintage', price: 'RM 250', imageUrl: '/placeholder.svg' }, // Changed to local placeholder
      ],
      chatHistory: [
        { id: 'chat1', with: 'Penjual A', lastMessage: 'Bila boleh COD?', time: '2 jam lalu' },
        { id: 'chat2', with: 'Pembeli B', lastMessage: 'Produk masih ada?', time: '1 hari lalu' },
      ],
    };
  } else {
    // Display a generic other user's profile or a placeholder if no ID is provided and not logged in
    // For simplicity, if not viewing own profile, we'll use a generic placeholder for now.
    // In a real app, you'd fetch this user's data from an API using `id`.
    displayUser = {
      id: id || 'guest-user',
      name: 'Pengguna Lain',
      avatarUrl: '/placeholder.svg', // Changed to local placeholder
      email: 'pengguna@example.com',
      phone: '+60123456789',
      bio: 'Pengguna aktif di gerobox.my. Suka mencari barangan unik dan menjual barang-barang terpakai yang masih elok.',
      favorites: [
        { id: 'fav3', name: 'Buku Lama', price: 'RM 50', imageUrl: '/placeholder.svg' }, // Changed to local placeholder
      ],
      chatHistory: [
        { id: 'chat3', with: 'Penjual C', lastMessage: 'Harga boleh nego?', time: '3 hari lalu' },
      ],
    };
  }

  // If displayUser is still null/undefined (e.g., loggedInUser is null and no ID),
  // this case should ideally be handled by ProtectedRoute, but as a fallback:
  if (!displayUser) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <p className="text-lg text-muted-foreground">Memuatkan profil atau tiada data tersedia.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const handleMessageUserClick = () => {
    if (loggedInUser) {
      navigate('/chat');
    } else {
      navigate('/login');
    }
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
                <AvatarImage src={displayUser.avatarUrl} alt={displayUser.name} />
                <AvatarFallback>{displayUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{displayUser.name}</CardTitle>
              <p className="text-muted-foreground text-sm">{displayUser.bio}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{displayUser.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{displayUser.phone}</span>
              </div>
              {!isViewingOwnProfile && ( // Only show "Mesej Pengguna" if viewing another user's profile
                <Button className="w-full" onClick={handleMessageUserClick}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Mesej Pengguna
                </Button>
              )}
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
                {displayUser.favorites.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {displayUser.favorites.map((item) => (
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
                {displayUser.chatHistory.length > 0 ? (
                  <div className="space-y-4">
                    {displayUser.chatHistory.map((chat) => (
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