import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Logo from '@/components/shared/Logo';

const RegisterPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Logo />
            <CardTitle className="text-2xl mt-4">Daftar Akaun Baru</CardTitle>
            <CardDescription>Cipta akaun anda untuk mula menjual dan membeli.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Nama Penuh</Label>
                <Input id="name" type="text" placeholder="Nama Anda" required />
              </div>
              <div>
                <Label htmlFor="email">Emel</Label>
                <Input id="email" type="email" placeholder="emel@contoh.com" required />
              </div>
              <div>
                <Label htmlFor="password">Kata Laluan</Label>
                <Input id="password" type="password" required />
              </div>
              <div>
                <Label htmlFor="confirm-password">Sahkan Kata Laluan</Label>
                <Input id="confirm-password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Daftar
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Sudah mempunyai akaun?{' '}
              <Link to="/login" className="underline">
                Log Masuk
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;