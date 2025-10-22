import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutGrid, Settings, Users, Package, Globe, Star, TrendingUp, PlusCircle, Edit, Trash2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react'; // Import all Lucide icons
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
import { toast } from 'sonner';

interface ProductIcon {
  id: string;
  name: string; // e.g., "Smartphone", "Car"
  lucideIconName: keyof typeof LucideIcons; // Name of the Lucide icon component
}

const initialProductIcons: ProductIcon[] = [
  { id: 'pi1', name: 'Telefon Pintar', lucideIconName: 'Smartphone' },
  { id: 'pi2', name: 'Kereta', lucideIconName: 'Car' },
  { id: 'pi3', name: 'Rumah', lucideIconName: 'Home' },
  { id: 'pi4', name: 'Baju', lucideIconName: 'Shirt' },
  { id: 'pi5', name: 'Beg Kerja', lucideIconName: 'Briefcase' },
  { id: 'pi6', name: 'Buku', lucideIconName: 'BookOpen' },
  { id: 'pi7', name: 'Lampu', lucideIconName: 'Lamp' },
  { id: 'pi8', name: 'Dumbbell', lucideIconName: 'Dumbbell' },
  { id: 'pi9', name: 'Bayi', lucideIconName: 'Baby' },
  { id: 'pi10', name: 'Kesihatan', lucideIconName: 'HeartPulse' },
  { id: 'pi11', name: 'Haiwan Peliharaan', lucideIconName: 'PawPrint' },
];

const ProductIconManagementPage: React.FC = () => {
  const { user: loggedInUser } = useAuth();
  const [productIcons, setProductIcons] = useState<ProductIcon[]>(initialProductIcons);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingIcon, setEditingIcon] = useState<ProductIcon | null>(null);
  const [deletingIconId, setDeletingIconId] = useState<string | null>(null);
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] = useState(false);

  const superAdminNavItems = [
    { label: 'Pengurusan Sistem', href: '/super-admin-dashboard/settings', icon: Settings },
    { label: 'Pengurusan Pengguna & Admin', href: '/super-admin-dashboard/users', icon: Users },
    { label: 'Produk & Kategori', href: '/super-admin-dashboard/products-categories', icon: Package },
    { label: 'Lokasi', href: '/super-admin-dashboard/locations', icon: Globe },
    { label: 'Ikon Produk', href: '/super-admin-dashboard/product-icons', icon: LayoutGrid },
    { label: 'Pengguna Premium', href: '/super-admin-dashboard/premium-users', icon: Star },
    { label: 'Statistik', href: '/super-admin-dashboard', icon: TrendingUp },
  ];

  const handleAddIconClick = () => {
    setEditingIcon(null);
    setIsDialogOpen(true);
  };

  const handleEditIconClick = (icon: ProductIcon) => {
    setEditingIcon(icon);
    setIsDialogOpen(true);
  };

  const handleSaveIcon = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const lucideIconName = (form.elements.namedItem('lucideIconName') as HTMLInputElement).value as keyof typeof LucideIcons;

    if (!Object.keys(LucideIcons).includes(lucideIconName)) {
      toast.error(`Ikon Lucide '${lucideIconName}' tidak wujud. Sila semak nama ikon.`);
      return;
    }

    if (editingIcon) {
      setProductIcons(productIcons.map((pi) => (pi.id === editingIcon.id ? { ...pi, name, lucideIconName } : pi)));
      toast.success('Ikon produk berjaya dikemaskini.');
    } else {
      const newIcon: ProductIcon = {
        id: `pi${productIcons.length + 1}`,
        name,
        lucideIconName,
      };
      setProductIcons([...productIcons, newIcon]);
      toast.success('Ikon produk baru berjaya ditambah.');
    }
    setIsDialogOpen(false);
  };

  const handleDeleteIconClick = (iconId: string) => {
    setDeletingIconId(iconId);
    setIsConfirmDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingIconId) {
      setProductIcons(productIcons.filter((pi) => pi.id !== deletingIconId));
      toast.success('Ikon produk berjaya dipadam.');
    }
    setIsConfirmDeleteDialogOpen(false);
    setDeletingIconId(null);
  };

  const handleCancelDelete = () => {
    setIsConfirmDeleteDialogOpen(false);
    setDeletingIconId(null);
  };

  return (
    <DashboardLayout title="Papan Pemuka Super Admin" navItems={superAdminNavItems}>
      <h1 className="text-4xl font-bold mb-4 text-center">Pengurusan Ikon Produk</h1>
      {loggedInUser && (
        <p className="text-center text-lg text-muted-foreground mb-8">
          Anda log masuk sebagai: <span className="font-semibold">{loggedInUser.email} ({loggedInUser.role})</span>
        </p>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Senarai Ikon Produk</CardTitle>
          <Button onClick={handleAddIconClick} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Tambah Ikon
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nama Ikon</TableHead>
                <TableHead>Nama Lucide Icon</TableHead>
                <TableHead>Pratonton</TableHead>
                <TableHead className="text-right">Tindakan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productIcons.map((icon) => {
                const IconComponent = LucideIcons[icon.lucideIconName] || LayoutGrid; // Fallback icon
                return (
                  <TableRow key={icon.id}>
                    <TableCell>{icon.id}</TableCell>
                    <TableCell>{icon.name}</TableCell>
                    <TableCell>{icon.lucideIconName}</TableCell>
                    <TableCell>
                      <IconComponent className="h-5 w-5 text-primary" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditIconClick(icon)}
                        className="mr-2"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteIconClick(icon.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Padam</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Icon Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingIcon ? 'Edit Ikon Produk' : 'Tambah Ikon Produk Baru'}</DialogTitle>
            <DialogDescription>
              {editingIcon ? 'Kemaskini butiran ikon produk ini.' : 'Tambah ikon produk baru ke dalam sistem.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveIcon} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nama Ikon
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={editingIcon?.name || ''}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lucideIconName" className="text-right">
                Nama Lucide Icon
              </Label>
              <Input
                id="lucideIconName"
                name="lucideIconName"
                defaultValue={editingIcon?.lucideIconName || ''}
                className="col-span-3"
                placeholder="e.g., Smartphone, Car, Home"
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit">{editingIcon ? 'Simpan Perubahan' : 'Tambah Ikon'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isConfirmDeleteDialogOpen} onOpenChange={setIsConfirmDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adakah anda pasti?</DialogTitle>
            <DialogDescription>
              Tindakan ini tidak boleh diundur. Ini akan memadam ikon produk secara kekal.
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

export default ProductIconManagementPage;