import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Logo from '@/components/shared/Logo';
import { useAuth } from '@/context/AuthContext'; // New import

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Logo />
            <CardTitle className="text-2xl mt-4">Log Masuk</CardTitle>
            <CardDescription>Masukkan butiran akaun anda untuk log masuk.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="email">Emel</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="emel@contoh.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password">Kata Laluan</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Log Masuk
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Belum mempunyai akaun?{' '}
              <Link to="/register" className="underline">
                Daftar
              </Link>
            </div>
            <div className="mt-2 text-center text-sm">
              <Link to="/forgot-password" className="underline">
                Lupa Kata Laluan?
              </Link>
            </div>
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p className="font-semibold mb-2">Akaun Demo (Kata Laluan: password untuk semua):</p>
              <ul className="list-disc list-inside text-left mx-auto w-fit">
                <li>superadmin@gerobox.my</li>
                <li>admin@gerobox.my</li>
                <li>seller@gerobox.my</li>
                <li>user@gerobox.my</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;