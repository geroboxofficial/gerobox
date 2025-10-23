import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Settings, Users, Package, LayoutGrid, Globe, Star, TrendingUp, PlusCircle, Edit, Trash2, Image, Link as LinkIcon, LayoutTemplate } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { initialCarouselItems, CarouselItem } from '@/data/mockCarouselItems';

const CarouselManagementPage: React.FC = () => {
  const { user: loggedInUser } = useAuth();
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>(initialCarouselItems);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CarouselItem | null>(null);
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] = useState(false);

  const superAdminNavItems = [
    { label: 'Pengurusan Sistem', href: '/super-admin-dashboard/settings', icon: Settings },
    { label: 'Pengurusan Pengguna & Admin', href: '/super-admin-dashboard/users', icon: Users },
    { label: 'Produk & Kategori', href: '/super-admin-dashboard/products-categories', icon: Package },
    { label: 'Lokasi', href: '/super-admin-dashboard/locations', icon: Globe },
    { label: 'Ikon Produk', href: '/super-admin-dashboard/product-icons', icon: LayoutGrid },
    { label: 'Pengguna Premium', href: '/super-admin-dashboard/premium-users', icon: Star },
    { label: 'Pengurusan Iklan', href: '/super-admin-dashboard/advertising', icon: LayoutTemplate },
    { label: 'Pengurusan Carousel', href: '/super-admin-dashboard/carousel-management', icon: Image },
    { label: 'Statistik', href: '/super-admin-dashboard/statistics', icon: TrendingUp },
  ];

  const handleAddCarouselItemClick = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  const handleEditCarouselItemClick = (item: CarouselItem) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleSaveCarouselItem = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;
    const imageUrl = (form.elements.namedItem('imageUrl') as HTMLInputElement).value;
    const buttonText = (form.elements.namedItem('buttonText') as HTMLInputElement).value;
    const buttonLink = (form.elements.namedItem('buttonLink') as HTMLInputElement).value;

    const newItemData: CarouselItem = {
      id: editingItem?.id || String(carouselItems.length + 1),
      title,
      description,
      imageUrl,
      buttonText,
      buttonLink,
    };

    if (editingItem) {
      setCarouselItems(carouselItems.map((item) => (item.id === editingItem.id ? newItemData : item)));
      toast.success('Item karusel berjaya dikemaskini.');
    } else {
      setCarouselItems([...carouselItems, newItemData]);
      toast.success('Item karusel baru berjaya ditambah.');
    }
    setIsDialogOpen(false);
  };

  const handleDeleteCarouselItemClick = (itemId: string) => {
    setDeletingItemId(itemId);
    setIsConfirmDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingItemId) {
      setCarouselItems(carouselItems.filter((item) => item.id !== deletingItemId));
      toast.success('Item karusel berjaya dipadam.');
    }
    setIsConfirmDeleteDialogOpen(false);
    setDeletingItemId(null);
  };

  const handleCancelDelete = () => {
    setIsConfirmDeleteDialogOpen(false);
    setDeletingItemId(null);
  };

  return (
    <DashboardLayout title="Papan Pemuka Super Admin" navItems={superAdminNavItems}>
      <h1 className="text-4xl font-bold mb-4 text-center">Pengurusan Carousel Utama</h1>
      {loggedInUser && (
        <p className="text-center text-lg text-muted-foreground mb-8">
          Anda log masuk sebagai: <span className="font-semibold">{loggedInUser.email} ({loggedInUser.role})</span>
        </p>
      )}

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Senarai Item Carousel</CardTitle>
          <Button onClick={handleAddCarouselItemClick} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Tambah Item Carousel
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tajuk</TableHead>
                <TableHead>Imej</TableHead>
                <TableHead>Teks Butang</TableHead>
                <TableHead>Pautan Butang</TableHead>
                <TableHead className="text-right">Tindakan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {carouselItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    <img src={item.imageUrl} alt={item.title} className="h-12 w-20 object-cover rounded-md" />
                  </TableCell>
                  <TableCell>{item.buttonText}</TableCell>
                  <TableCell>{item.buttonLink}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditCarouselItemClick(item)}
                      className="mr-2"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteCarouselItemClick(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Padam</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Carousel Item Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]" aria-labelledby="carousel-item-dialog-title">
          <DialogHeader>
            <DialogTitle id="carousel-item-dialog-title">{editingItem ? 'Edit Item Carousel' : 'Tambah Item Carousel Baru'}</DialogTitle>
            <DialogDescription>
              {editingItem ? 'Kemaskini butiran item karusel ini.' : 'Tambah item baru ke dalam karusel utama.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveCarouselItem} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Tajuk
              </Label>
              <Input
                id="title"
                name="title"
                defaultValue={editingItem?.title || ''}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Deskripsi
              </Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={editingItem?.description || ''}
                className="col-span-3"
                rows={3}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right">
                URL Imej
              </Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                defaultValue={editingItem?.imageUrl || '/placeholder.svg'}
                className="col-span-3"
                type="url"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="buttonText" className="text-right">
                Teks Butang
              </Label>
              <Input
                id="buttonText"
                name="buttonText"
                defaultValue={editingItem?.buttonText || ''}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="buttonLink" className="text-right">
                Pautan Butang
              </Label>
              <Input
                id="buttonLink"
                name="buttonLink"
                defaultValue={editingItem?.buttonLink || ''}
                className="col-span-3"
                type="url"
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit">{editingItem ? 'Simpan Perubahan' : 'Tambah Item Carousel'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isConfirmDeleteDialogOpen} onOpenChange={setIsConfirmDeleteDialogOpen}>
        <DialogContent aria-labelledby="confirm-delete-carousel-item-title">
          <DialogHeader>
            <DialogTitle id="confirm-delete-carousel-item-title">Adakah anda pasti?</DialogTitle>
            <DialogDescription>
              Tindakan ini tidak boleh diundur. Ini akan memadam item karusel secara kekal.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelDelete}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Padam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default CarouselManagementPage;