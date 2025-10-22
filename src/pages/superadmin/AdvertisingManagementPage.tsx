import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Settings, Users, Package, LayoutGrid, Globe, Star, TrendingUp, PlusCircle, Edit, Trash2, Eye, LayoutTemplate } from 'lucide-react';
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
  contentType: 'image' | 'html'; // New: Type of ad content
  imageUrl?: string; // New: For image ads
  targetUrl?: string; // New: For image ads
  adCode?: string; // New: For HTML/script ads
}

const initialAdSpots: AdSpot[] = [
  { id: 'ad1', name: 'Banner Utama Atas', location: 'Atas Halaman', rate: 'RM 150/hari', status: 'Aktif', contentType: 'image', imageUrl: '/placeholder.svg', targetUrl: 'https://example.com/promo1' },
  { id: 'ad2', name: 'Banner Bawah Kaki', location: 'Bawah Halaman', rate: 'RM 80/hari', status: 'Aktif', contentType: 'image', imageUrl: '/placeholder.svg', targetUrl: 'https://example.com/promo2' },
  { id: 'ad3', name: 'Pop-up Promosi', location: 'Pop-up', rate: 'RM 200/hari', status: 'Tidak Aktif', contentType: 'html', adCode: '<div class="p-4 bg-yellow-100 text-yellow-800 rounded-lg">Iklan Pop-up Eksklusif!</div>' },
  { id: 'ad4', name: 'Iklan Sisi Kanan', location: 'Sisi Kanan', rate: 'RM 120/hari', status: 'Aktif', contentType: 'image', imageUrl: '/placeholder.svg', targetUrl: 'https://example.com/promo4' },
];

const AdvertisingManagementPage: React.FC = () => {
  const { user: loggedInUser } = useAuth();
  const [adSpots, setAdSpots] = useState<AdSpot[]>(initialAdSpots);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAdSpot, setEditingAdSpot] = useState<AdSpot | null>(null);
  const [deletingAdSpotId, setDeletingAdSpotId] = useState<string | null>(null);
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] = useState(false);

  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [previewAdSpot, setPreviewAdSpot] = useState<AdSpot | null>(null);

  const superAdminNavItems = [
    { label: 'Pengurusan Sistem', href: '/super-admin-dashboard/settings', icon: Settings },
    { label: 'Pengurusan Pengguna & Admin', href: '/super-admin-dashboard/users', icon: Users },
    { label: 'Produk & Kategori', href: '/super-admin-dashboard/products-categories', icon: Package },
    { label: 'Lokasi', href: '/super-admin-dashboard/locations', icon: Globe },
    { label: 'Ikon Produk', href: '/super-admin-dashboard/product-icons', icon: LayoutGrid },
    { label: 'Pengguna Premium', href: '/super-admin-dashboard/premium-users', icon: Star },
    { label: 'Pengurusan Iklan', href: '/super-admin-dashboard/advertising', icon: LayoutTemplate },
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
    const contentType = (form.elements.namedItem('contentType') as HTMLSelectElement).value as AdSpot['contentType'];
    const imageUrl = (form.elements.namedItem('imageUrl') as HTMLInputElement)?.value || undefined;
    const targetUrl = (form.elements.namedItem('targetUrl') as HTMLInputElement)?.value || undefined;
    const adCode = (form.elements.namedItem('adCode') as HTMLTextAreaElement)?.value || undefined;

    const newAdData: AdSpot = {
      id: editingAdSpot?.id || `ad${adSpots.length + 1}`,
      name,
      location,
      rate,
      status,
      contentType,
      imageUrl: contentType === 'image' ? imageUrl : undefined,
      targetUrl: contentType === 'image' ? targetUrl : undefined,
      adCode: contentType === 'html' ? adCode : undefined,
    };

    if (editingAdSpot) {
      setAdSpots(adSpots.map((spot) => (spot.id === editingAdSpot.id ? newAdData : spot)));
      toast.success('Tapak iklan berjaya dikemaskini.');
    } else {
      setAdSpots([...adSpots, newAdData]);
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

  const handlePreviewClick = (adSpot: AdSpot) => {
    setPreviewAdSpot(adSpot);
    setIsPreviewDialogOpen(true);
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
                <TableHead>Jenis Kandungan</TableHead>
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
                  <TableCell>{spot.contentType === 'image' ? 'Imej' : 'HTML/Skrip'}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePreviewClick(spot)}
                      className="mr-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Pratonton</span>
                    </Button>
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
        <DialogContent className="sm:max-w-[600px]">
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contentType" className="text-right">
                Jenis Kandungan
              </Label>
              <Select
                name="contentType"
                defaultValue={editingAdSpot?.contentType || 'image'}
                onValueChange={(value: 'image' | 'html') => setEditingAdSpot(prev => prev ? { ...prev, contentType: value } : { ...newAdSpotTemplate, contentType: value })}
                required
              >
                <SelectTrigger id="contentType" className="col-span-3">
                  <SelectValue placeholder="Pilih Jenis Kandungan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">Imej Banner</SelectItem>
                  <SelectItem value="html">Kod HTML/Skrip</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {editingAdSpot?.contentType === 'image' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="imageUrl" className="text-right">
                    URL Imej
                  </Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    defaultValue={editingAdSpot?.imageUrl || ''}
                    className="col-span-3"
                    placeholder="https://example.com/banner.jpg"
                    type="url"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="targetUrl" className="text-right">
                    URL Sasaran
                  </Label>
                  <Input
                    id="targetUrl"
                    name="targetUrl"
                    defaultValue={editingAdSpot?.targetUrl || ''}
                    className="col-span-3"
                    placeholder="https://example.com/landing-page"
                    type="url"
                  />
                </div>
              </>
            )}

            {editingAdSpot?.contentType === 'html' && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="adCode" className="text-right">
                  Kod HTML/Skrip
                </Label>
                <Textarea
                  id="adCode"
                  name="adCode"
                  defaultValue={editingAdSpot?.adCode || ''}
                  className="col-span-3"
                  rows={6}
                  placeholder="<img src='...' /><script>...</script>"
                />
              </div>
            )}

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

      {/* Ad Preview Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Pratonton Iklan: {previewAdSpot?.name}</DialogTitle>
            <DialogDescription>
              Ini adalah bagaimana iklan anda akan kelihatan di lokasi '{previewAdSpot?.location}'.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-800 min-h-[150px] flex items-center justify-center">
            {previewAdSpot?.contentType === 'image' && previewAdSpot.imageUrl && (
              <a href={previewAdSpot.targetUrl} target="_blank" rel="noopener noreferrer">
                <img src={previewAdSpot.imageUrl} alt={previewAdSpot.name} className="max-w-full h-auto" />
              </a>
            )}
            {previewAdSpot?.contentType === 'html' && previewAdSpot.adCode && (
              <div dangerouslySetInnerHTML={{ __html: previewAdSpot.adCode }} />
            )}
            {!previewAdSpot?.contentType && (
              <p className="text-muted-foreground">Tiada kandungan iklan untuk dipratonton.</p>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsPreviewDialogOpen(false)}>Tutup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

// Template for new ad spot when contentType is changed in dialog
const newAdSpotTemplate: AdSpot = {
  id: '', // Will be generated
  name: '',
  location: 'Atas Halaman',
  rate: '',
  status: 'Aktif',
  contentType: 'image',
  imageUrl: '',
  targetUrl: '',
  adCode: '',
};

export default AdvertisingManagementPage;