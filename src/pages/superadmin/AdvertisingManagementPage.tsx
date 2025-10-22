import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Settings, Users, Package, LayoutGrid, Globe, Star, TrendingUp, PlusCircle, Edit, Trash2, DollarSign, LayoutTemplate } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface AdSpot {
  id: string;
  name: string;
  location: 'Atas Halaman' | 'Bawah Halaman' | 'Pop-up' | 'Sisi Kanan' | 'Sisi Kiri';
  rate: string; // e.g., "RM 100/hari", "RM 500/minggu"
  status: 'Aktif' | 'Tidak Aktif';
}

const initialAdSpots: AdSpot[] = [
  { id: 'ad1', name: 'Banner Utama Atas', location: 'Atas Halaman', rate: 'RM 150/hari', status: 'Aktif' },
  { id: 'ad2', name: 'Banner Bawah Kaki', location: 'Bawah Halaman', rate: 'RM 80/hari', status: 'Aktif' },
  { id: 'ad3', name: 'Pop-up Promosi', location: 'Pop-up', rate: 'RM 200/hari', status: 'Tidak Aktif' },
  { id: 'ad4', name: 'Iklan Sisi Kanan', location: 'Sisi Kanan', rate: 'RM 120/hari', status: 'Aktif' },
];

const AdvertisingManagementPage: React.FC = () => {
  const { user: loggedInUser } = useAuth();
  const [adSpots, setAdSpots] = useState<AdSpot[]>(initialAdSpots);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAdSpot, setEditingAdSpot] = useState<AdSpot | null>(null);
  const [deletingAdSpotId, setDeletingAdSpotId] = useState<string | null>(null);
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] = useState(false);

  const superAdminNavItems = [
    { label: 'Pengurusan Sistem', href: '/super-admin-dashboard/settings', icon: Settings },
    { label: 'Pengurusan Pengguna & Admin', href: '/super-admin-dashboard/users', icon: Users },
    { label: 'Produk & Kategori', href: '/super-admin-dashboard/products-categories', icon: Package },
    { label: 'Lokasi', href: '/super-admin-dashboard/locations', icon: Globe },
    { label: 'Ikon Produk', href: '/super-admin-dashboard/product-icons', icon: LayoutGrid },
    { label: 'Pengguna Premium', href: '/super-admin-dashboard/premium-users', icon: Star },
    { label: 'Pengurusan Iklan', href: '/super-admin-dashboard/advertising', icon: LayoutTemplate }, // New item
    { label: 'Statistik', href: '/super-admin-dashboard/statistics', icon: TrendingUp },
  ];

  const handleAddAdSpotClick = () => {
    setEditingAdSpot(null);
    setIsDialogOpen(true);
  };

  const handleEditAdSpotClick = (adSpot: AdSpot) => {
    setEditingAdSpot(adSpot);
    setIsDialogOpen(true);
  };

  const handleSaveAdSpot = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const location = (form.elements.namedItem('location') as HTMLSelectElement).value as AdSpot['location'];
    const rate = (form.elements.namedItem('rate') as HTMLInputElement).value;
    const status = (form.elements.namedItem('status') as HTMLSelectElement).value as AdSpot['status'];

    if (editingAdSpot) {
      setAdSpots(adSpots.map((spot) => (spot.id === editingAdSpot.id ? { ...spot, name, location, rate, status } : spot)));
      toast.success('Tapak iklan berjaya dikemaskini.');
    } else {
      const newAdSpot: AdSpot = {
        id: `ad${adSpots.length + 1}`,
        name,
        location,
        rate,
        status,
      };
      setAdSpots([...adSpots, newAdSpot]);
      toast.success('Tapak iklan baru berjaya ditambah.');
    }
    setIsDialogOpen(false);
  };

  const handleDeleteAdSpotClick = (adSpotId: string) => {
    setDeletingAdSpotId(adSpotId);
    setIsConfirmDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingAdSpotId) {
      setAdSpots(adSpots.filter((spot) => spot.id !== deletingAdSpotId));
      toast.success('Tapak iklan berjaya dipadam.');
    }
    setIsConfirmDeleteDialogOpen(false);
    setDeletingAdSpotId(null);
  };

  const handleCancelDelete = () => {
    setIsConfirmDeleteDialogOpen(false);
    setDeletingAdSpotId(null);
  };

  return (
    <DashboardLayout title="Papan Pemuka Super Admin" navItems={superAdminNavItems}>
      <h1 className="text-4xl font-bold mb-4 text-center">Pengurusan Iklan</h1>
      {loggedInUser && (
        <p className="text-center text-lg text-muted-foreground mb-8">
          Anda log masuk sebagai: <span className="font-semibold">{loggedInUser.email} ({loggedInUser.role})</span>
        </p>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Senarai Tapak Iklan</CardTitle>
          <Button onClick={handleAddAdSpotClick} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Tambah Tapak Iklan
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nama Iklan</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Kadar Jualan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Tindakan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adSpots.map((spot) => (
                <TableRow key={spot.id}>
                  <TableCell>{spot.id}</TableCell>
                  <TableCell>{spot.name}</TableCell>
                  <TableCell>{spot.location}</TableCell>
                  <TableCell>{spot.rate}</TableCell>
                  <TableCell>{spot.status}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditAdSpotClick(spot)}
                      className="mr-2"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteAdSpotClick(spot.id)}
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

      {/* Add/Edit Ad Spot Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingAdSpot ? 'Edit Tapak Iklan' : 'Tambah Tapak Iklan Baru'}</DialogTitle>
            <DialogDescription>
              {editingAdSpot ? 'Kemaskini butiran tapak iklan ini.' : 'Tambah tapak iklan baru ke dalam sistem.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveAdSpot} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nama Iklan
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={editingAdSpot?.name || ''}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Lokasi
              </Label>
              <Select
                name="location"
                defaultValue={editingAdSpot?.location || 'Atas Halaman'}
                required
              >
                <SelectTrigger id="location" className="col-span-3">
                  <SelectValue placeholder="Pilih Lokasi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Atas Halaman">Atas Halaman</SelectItem>
                  <SelectItem value="Bawah Halaman">Bawah Halaman</SelectItem>
                  <SelectItem value="Pop-up">Pop-up</SelectItem>
                  <SelectItem value="Sisi Kanan">Sisi Kanan</SelectItem>
                  <SelectItem value="Sisi Kiri">Sisi Kiri</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rate" className="text-right">
                Kadar Jualan
              </Label>
              <Input
                id="rate"
                name="rate"
                defaultValue={editingAdSpot?.rate || ''}
                className="col-span-3"
                placeholder="e.g., RM 100/hari"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                name="status"
                defaultValue={editingAdSpot?.status || 'Aktif'}
                required
              >
                <SelectTrigger id="status" className="col-span-3">
                  <SelectValue placeholder="Pilih Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Aktif">Aktif</SelectItem>
                  <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="submit">{editingAdSpot ? 'Simpan Perubahan' : 'Tambah Tapak Iklan'}</Button>
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
              Tindakan ini tidak boleh diundur. Ini akan memadam tapak iklan secara kekal.
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

export default AdvertisingManagementPage;