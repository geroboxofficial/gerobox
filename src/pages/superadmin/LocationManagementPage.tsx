import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Globe, Settings, Users, Package, LayoutGrid, Star, TrendingUp, PlusCircle, Edit, Trash2 } from 'lucide-react';
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

interface State {
  id: string;
  name: string;
}

interface District {
  id: string;
  name: string;
  stateId: string;
}

const initialStates: State[] = [
  { id: 's1', name: 'Selangor' },
  { id: 's2', name: 'Kuala Lumpur' },
  { id: 's3', name: 'Johor' },
  { id: 's4', name: 'Pulau Pinang' },
];

const initialDistricts: District[] = [
  { id: 'd1', name: 'Petaling Jaya', stateId: 's1' },
  { id: 'd2', name: 'Shah Alam', stateId: 's1' },
  { id: 'd3', name: 'Cheras', stateId: 's2' },
  { id: 'd4', name: 'Johor Bahru', stateId: 's3' },
];

const LocationManagementPage: React.FC = () => {
  const { user: loggedInUser } = useAuth();
  const [states, setStates] = useState<State[]>(initialStates);
  const [districts, setDistricts] = useState<District[]>(initialDistricts);

  // State Dialogs
  const [isStateDialogOpen, setIsStateDialogOpen] = useState(false);
  const [editingState, setEditingState] = useState<State | null>(null);
  const [deletingStateId, setDeletingStateId] = useState<string | null>(null);
  const [isStateConfirmDeleteDialogOpen, setIsStateConfirmDeleteDialogOpen] = useState(false);

  // District Dialogs
  const [isDistrictDialogOpen, setIsDistrictDialogOpen] = useState(false);
  const [editingDistrict, setEditingDistrict] = useState<District | null>(null);
  const [deletingDistrictId, setDeletingDistrictId] = useState<string | null>(null);
  const [isDistrictConfirmDeleteDialogOpen, setIsDistrictConfirmDeleteDialogOpen] = useState(false);

  const superAdminNavItems = [
    { label: 'Pengurusan Sistem', href: '/super-admin-dashboard/settings', icon: Settings },
    { label: 'Pengurusan Pengguna & Admin', href: '/super-admin-dashboard/users', icon: Users },
    { label: 'Produk & Kategori', href: '/super-admin-dashboard/products-categories', icon: Package },
    { label: 'Lokasi', href: '/super-admin-dashboard/locations', icon: Globe },
    { label: 'Ikon Produk', href: '/super-admin-dashboard/product-icons', icon: LayoutGrid },
    { label: 'Pengguna Premium', href: '/super-admin-dashboard/premium-users', icon: Star },
    { label: 'Statistik', href: '/super-admin-dashboard', icon: TrendingUp },
  ];

  // State Management Handlers
  const handleAddStateClick = () => {
    setEditingState(null);
    setIsStateDialogOpen(true);
  };

  const handleEditStateClick = (state: State) => {
    setEditingState(state);
    setIsStateDialogOpen(true);
  };

  const handleSaveState = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;

    if (editingState) {
      setStates(states.map((s) => (s.id === editingState.id ? { ...s, name } : s)));
      toast.success('Negeri berjaya dikemaskini.');
    } else {
      const newState: State = {
        id: `s${states.length + 1}`,
        name,
      };
      setStates([...states, newState]);
      toast.success('Negeri baru berjaya ditambah.');
    }
    setIsStateDialogOpen(false);
  };

  const handleDeleteStateClick = (stateId: string) => {
    setDeletingStateId(stateId);
    setIsStateConfirmDeleteDialogOpen(true);
  };

  const handleConfirmDeleteState = () => {
    if (deletingStateId) {
      setStates(states.filter((s) => s.id !== deletingStateId));
      // Also remove districts associated with this state
      setDistricts(districts.filter((d) => d.stateId !== deletingStateId));
      toast.success('Negeri dan daerah berkaitan berjaya dipadam.');
    }
    setIsStateConfirmDeleteDialogOpen(false);
    setDeletingStateId(null);
  };

  const handleCancelDeleteState = () => {
    setIsStateConfirmDeleteDialogOpen(false);
    setDeletingStateId(null);
  };

  // District Management Handlers
  const handleAddDistrictClick = () => {
    setEditingDistrict(null);
    setIsDistrictDialogOpen(true);
  };

  const handleEditDistrictClick = (district: District) => {
    setEditingDistrict(district);
    setIsDistrictDialogOpen(true);
  };

  const handleSaveDistrict = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const stateId = (form.elements.namedItem('stateId') as HTMLSelectElement).value;

    if (editingDistrict) {
      setDistricts(districts.map((d) => (d.id === editingDistrict.id ? { ...d, name, stateId } : d)));
      toast.success('Daerah berjaya dikemaskini.');
    } else {
      const newDistrict: District = {
        id: `d${districts.length + 1}`,
        name,
        stateId,
      };
      setDistricts([...districts, newDistrict]);
      toast.success('Daerah baru berjaya ditambah.');
    }
    setIsDistrictDialogOpen(false);
  };

  const handleDeleteDistrictClick = (districtId: string) => {
    setDeletingDistrictId(districtId);
    setIsDistrictConfirmDeleteDialogOpen(true);
  };

  const handleConfirmDeleteDistrict = () => {
    if (deletingDistrictId) {
      setDistricts(districts.filter((d) => d.id !== deletingDistrictId));
      toast.success('Daerah berjaya dipadam.');
    }
    setIsDistrictConfirmDeleteDialogOpen(false);
    setDeletingDistrictId(null);
  };

  const handleCancelDeleteDistrict = () => {
    setIsDistrictConfirmDeleteDialogOpen(false);
    setDeletingDistrictId(null);
  };

  const getStateName = (stateId: string) => {
    return states.find(s => s.id === stateId)?.name || 'Tidak Diketahui';
  };

  return (
    <DashboardLayout title="Papan Pemuka Super Admin" navItems={superAdminNavItems}>
      <h1 className="text-4xl font-bold mb-4 text-center">Pengurusan Lokasi</h1>
      {loggedInUser && (
        <p className="text-center text-lg text-muted-foreground mb-8">
          Anda log masuk sebagai: <span className="font-semibold">{loggedInUser.email} ({loggedInUser.role})</span>
        </p>
      )}

      {/* State Management Section */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Pengurusan Negeri</CardTitle>
          <Button onClick={handleAddStateClick} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Tambah Negeri
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nama Negeri</TableHead>
                <TableHead className="text-right">Tindakan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {states.map((state) => (
                <TableRow key={state.id}>
                  <TableCell>{state.id}</TableCell>
                  <TableCell>{state.name}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditStateClick(state)}
                      className="mr-2"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteStateClick(state.id)}
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

      {/* District Management Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Pengurusan Daerah</CardTitle>
          <Button onClick={handleAddDistrictClick} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Tambah Daerah
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nama Daerah</TableHead>
                <TableHead>Negeri</TableHead>
                <TableHead className="text-right">Tindakan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {districts.map((district) => (
                <TableRow key={district.id}>
                  <TableCell>{district.id}</TableCell>
                  <TableCell>{district.name}</TableCell>
                  <TableCell>{getStateName(district.stateId)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditDistrictClick(district)}
                      className="mr-2"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteDistrictClick(district.id)}
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

      {/* Add/Edit State Dialog */}
      <Dialog open={isStateDialogOpen} onOpenChange={setIsStateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]" aria-labelledby="state-dialog-title">
          <DialogHeader>
            <DialogTitle id="state-dialog-title">{editingState ? 'Edit Negeri' : 'Tambah Negeri Baru'}</DialogTitle>
            <DialogDescription>
              {editingState ? 'Kemaskini nama negeri ini.' : 'Tambah negeri baru ke dalam sistem.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveState} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="state-name" className="text-right">
                Nama Negeri
              </Label>
              <Input
                id="state-name"
                name="name"
                defaultValue={editingState?.name || ''}
                className="col-span-3"
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit">{editingState ? 'Simpan Perubahan' : 'Tambah Negeri'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete State Confirmation Dialog */}
      <Dialog open={isStateConfirmDeleteDialogOpen} onOpenChange={setIsStateConfirmDeleteDialogOpen}>
        <DialogContent aria-labelledby="confirm-delete-state-title">
          <DialogHeader>
            <DialogTitle id="confirm-delete-state-title">Adakah anda pasti?</DialogTitle>
            <DialogDescription>
              Tindakan ini tidak boleh diundur. Ini akan memadam negeri secara kekal dan semua daerah di bawahnya.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelDeleteState}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleConfirmDeleteState}>
              Padam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit District Dialog */}
      <Dialog open={isDistrictDialogOpen} onOpenChange={setIsDistrictDialogOpen}>
        <DialogContent className="sm:max-w-[425px]" aria-labelledby="district-dialog-title">
          <DialogHeader>
            <DialogTitle id="district-dialog-title">{editingDistrict ? 'Edit Daerah' : 'Tambah Daerah Baru'}</DialogTitle>
            <DialogDescription>
              {editingDistrict ? 'Kemaskini butiran daerah ini.' : 'Tambah daerah baru ke dalam sistem.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveDistrict} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="district-name" className="text-right">
                Nama Daerah
              </Label>
              <Input
                id="district-name"
                name="name"
                defaultValue={editingDistrict?.name || ''}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="state-select" className="text-right">
                Negeri
              </Label>
              <Select
                name="stateId"
                defaultValue={editingDistrict?.stateId || ''}
                required
              >
                <SelectTrigger id="state-select" className="col-span-3">
                  <SelectValue placeholder="Pilih Negeri" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.id} value={state.id}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="submit">{editingDistrict ? 'Simpan Perubahan' : 'Tambah Daerah'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete District Confirmation Dialog */}
      <Dialog open={isDistrictConfirmDeleteDialogOpen} onOpenChange={setIsDistrictConfirmDeleteDialogOpen}>
        <DialogContent aria-labelledby="confirm-delete-district-title">
          <DialogHeader>
            <DialogTitle id="confirm-delete-district-title">Adakah anda pasti?</DialogTitle>
            <DialogDescription>
              Tindakan ini tidak boleh diundur. Ini akan memadam daerah secara kekal.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelDeleteDistrict}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleConfirmDeleteDistrict}>
              Padam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default LocationManagementPage;