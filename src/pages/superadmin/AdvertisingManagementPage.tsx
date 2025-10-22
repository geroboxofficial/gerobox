import React, { useState, useEffect } from 'react';
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
import { initialAdSpots, AdSpot, newAdSpotTemplate } from '@/data/mockAds';

const AdvertisingManagementPage: React.FC = () => {
  const { user: loggedInUser } = useAuth();
  const [adSpots, setAdSpots] = useState<AdSpot[]>(initialAdSpots);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAdSpot, setEditingAdSpot] = useState<AdSpot | null>(null);
  const [deletingAdSpotId, setDeletingAdSpotId] = useState<string | null>(null);
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] = useState(false);

  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [previewAdSpot, setPreviewAdSpot] = useState<AdSpot | null>(null);

  const [currentContentType, setCurrentContentType] = useState<AdSpot['contentType']>(newAdSpotTemplate.contentType);

  // Effect to update currentContentType when editingAdSpot changes or dialog opens/closes
  useEffect(() => {
    if (isDialogOpen) {
      if (editingAdSpot) {
        setCurrentContentType(editingAdSpot.contentType);
      } else {
        setCurrentContentType(newAdSpotTemplate.contentType);
      }
    }
  }, [editingAdSpot, isDialogOpen]);

  // Effect to check and update ad statuses on component mount or adSpots change
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date to compare correctly

    const updatedAdSpots = adSpots.map(ad => {
      const endDate = new Date(ad.endDate);
      endDate.setHours(23, 59, 59, 999); // Normalize end date to include the whole day

      if (ad.status === 'Aktif' && endDate < today) {
        return { ...ad, status: 'Tidak Aktif' };
      }
      return ad;
    });

    // Only update state if there are actual changes to prevent infinite loops
    if (JSON.stringify(updatedAdSpots) !== JSON.stringify(adSpots)) {
      setAdSpots(updatedAdSpots);
    }
  }, [adSpots]); // Dependency on adSpots to re-evaluate when ads change

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
    const companyName = (form.elements.namedItem('companyName') as HTMLInputElement).value;
    const location = (form.elements.namedItem('location') as HTMLSelectElement).value as AdSpot['location'];
    const rate = (form.elements.namedItem('rate') as HTMLInputElement).value;
    const status = (form.elements.namedItem('status') as HTMLSelectElement).value as AdSpot['status'];
    const startDate = (form.elements.namedItem('startDate') as HTMLInputElement).value;
    const endDate = (form.elements.namedItem('endDate') as HTMLInputElement).value;
    
    const imageUrl = (form.elements.namedItem('imageUrl') as HTMLInputElement)?.value || undefined;
    const targetUrl = (form.elements.namedItem('targetUrl') as HTMLInputElement)?.value || undefined;
    const adCode = (form.elements.namedItem('adCode') as HTMLTextAreaElement)?.value || undefined;

    const newAdData: AdSpot = {
      id: editingAdSpot?.id || `ad${adSpots.length + 1}`,
      name,
      companyName,
      location,
      rate,
      status,
      contentType: currentContentType,
      imageUrl: currentContentType === 'image' ? imageUrl : undefined,
      targetUrl: currentContentType === 'image' ? targetUrl : undefined,
      adCode: currentContentType === 'html' ? adCode : undefined,
      startDate,
      endDate,
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

      <Card className="mb-8">
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
                <TableHead>ID</TableHead><TableHead>Nama Iklan</TableHead><TableHead>Syarikat</TableHead><TableHead>Lokasi</TableHead><TableHead>Kadar Jualan</TableHead><TableHead>Tempoh Iklan</TableHead><TableHead>Status</TableHead><TableHead>Jenis Kandungan</TableHead><TableHead className="text-right">Tindakan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adSpots.map((spot) => (
                <TableRow key={spot.id}>
                  <TableCell>{spot.id}</TableCell><TableCell>{spot.name}</TableCell><TableCell>{spot.companyName}</TableCell><TableCell>{spot.location}</TableCell><TableCell>{spot.rate}</TableCell><TableCell>{`${spot.startDate} hingga ${spot.endDate}`}</TableCell><TableCell>{spot.status}</TableCell><TableCell>{spot.contentType === 'image' ? 'Imej' : 'HTML/Skrip'}</TableCell><TableCell className="text-right">
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
        <DialogContent className="sm:max-w-[600px]" aria-labelledby="ad-spot-dialog-title">
          <DialogHeader>
            <DialogTitle id="ad-spot-dialog-title">{editingAdSpot ? 'Edit Tapak Iklan' : 'Tambah Tapak Iklan Baru'}</DialogTitle>
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
              <Label htmlFor="companyName" className="text-right">
                Nama Syarikat
              </Label>
              <Input
                id="companyName"
                name="companyName"
                defaultValue={editingAdSpot?.companyName || ''}
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
              <Label htmlFor="startDate" className="text-right">
                Tarikh Mula
              </Label>
              <Input
                id="startDate"
                name="startDate"
                defaultValue={editingAdSpot?.startDate || newAdSpotTemplate.startDate}
                className="col-span-3"
                type="date"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right">
                Tarikh Tamat
              </Label>
              <Input
                id="endDate"
                name="endDate"
                defaultValue={editingAdSpot?.endDate || newAdSpotTemplate.endDate}
                className="col-span-3"
                type="date"
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
                value={currentContentType}
                onValueChange={(value: AdSpot['contentType']) => setCurrentContentType(value)}
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

            {currentContentType === 'image' && (
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

            {currentContentType === 'html' && (
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
        <DialogContent aria-labelledby="confirm-delete-ad-spot-title">
          <DialogHeader>
            <DialogTitle id="confirm-delete-ad-spot-title">Adakah anda pasti?</DialogTitle>
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
        <DialogContent className="sm:max-w-[700px]" aria-labelledby="preview-ad-spot-title">
          <DialogHeader>
            <DialogTitle id="preview-ad-spot-title">Pratonton Iklan: {previewAdSpot?.name || 'Iklan'}</DialogTitle>
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

      {/* Usage Instructions Card */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Cara Menggunakan Iklan di Laman Web Anda</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p>Untuk memaparkan iklan yang telah anda konfigurasi di halaman-halaman utama aplikasi (contohnya, <code>Index.tsx</code>, <code>ProductDetail.tsx</code>, atau <code>CommunityPage.tsx</code>), anda perlu:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>Ambil data iklan yang relevan:</strong>
              <p className="mt-1">Di komponen React yang ingin anda paparkan iklan, anda perlu mendapatkan data iklan yang aktif. Untuk tujuan demo ini, anda boleh menggunakan data <code>adSpots</code> yang ada dalam state. Dalam aplikasi sebenar, ini akan melibatkan panggilan API ke pangkalan data anda untuk mengambil iklan yang aktif berdasarkan lokasinya.</p>
              <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md mt-2 overflow-x-auto">
                <code>
                  {`// Contoh: Mendapatkan iklan 'Atas Halaman' yang aktif
const activeTopAd = adSpots.find(
  (ad) => ad.location === 'Atas Halaman' && ad.status === 'Aktif',
);`}
                </code>
              </pre>
            </li>
            <li>
              <strong>Paparkan iklan secara kondisional:</strong>
              <p className="mt-1">Setelah anda mendapatkan objek iklan, anda boleh memaparkannya berdasarkan <code>contentType</code> (jenis kandungan) iklan tersebut. Gunakan tag <code>&lt;img&gt;</code> untuk iklan imej atau <code>dangerouslySetInnerHTML</code> untuk kod HTML/skrip.</p>
              <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md mt-2 overflow-x-auto">
                <code>
                  {`{activeTopAd && (
  <div className="my-8 text-center">
    {activeTopAd.contentType === 'image' && activeTopAd.imageUrl && (
      <a href={activeTopAd.targetUrl} target="_blank" rel="noopener noreferrer">
        <img
          src={activeTopAd.imageUrl}
          alt={activeTopAd.name}
          className="max-w-full h-auto mx-auto"
        />
      </a>
    )}
    {activeTopAd.contentType === 'html' && activeTopAd.adCode && (
      <div dangerouslySetInnerHTML={{ __html: activeTopAd.adCode }} />
    )}
  </div>
)}`}
                </code>
              </pre>
            </li>
            <li>
              <strong>Ulangi untuk lokasi iklan lain:</strong>
              <p className="mt-1">Anda boleh mengulangi langkah ini untuk setiap lokasi iklan yang anda ingin paparkan (contohnya, 'Bawah Halaman', 'Sisi Kanan', 'Pop-up') di halaman yang berbeza dalam aplikasi anda.</p>
            </li>
          </ol>
          <p className="mt-4">Pastikan anda mengimport <code>adSpots</code> (atau data iklan dari API anda) ke dalam komponen yang relevan.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AdvertisingManagementPage;