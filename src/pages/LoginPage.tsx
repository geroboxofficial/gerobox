import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Logo from '@/components/shared/Logo';

const LoginPage: React.FC = () => {
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
            <form className="space-y-4">
              <div>
                <Label htmlFor="email">Emel</Label>
                <Input id="email" type="email" placeholder="emel@contoh.com" required />
              </div>
              <div>
                <Label htmlFor="password">Kata Laluan</Label>
                <Input id="password" type="password" required />
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
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;