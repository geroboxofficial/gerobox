import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Star, Settings, Users, Package, LayoutGrid, Globe, TrendingUp, PlusCircle, Edit, Trash2, CalendarDays } from 'lucide-react';
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

interface PremiumUser {
  id: string;
  email: string;
  membershipType: 'Premium Basic' | 'Premium Pro' | 'Premium Elite';
  startDate: string;
  endDate: string;
}

const initialPremiumUsers: PremiumUser[] = [
  { id: 'pu1', email: 'premiumuser1@example.com', membershipType: 'Premium Basic', startDate: '2023-01-01', endDate: '2024-01-01' },
  { id: 'pu2', email: 'premiumuser2@example.com', membershipType: 'Premium Pro', startDate: '2023-03-15', endDate: '2024-03-15' },
  { id: 'pu3', email: 'premiumuser3@example.com', membershipType: 'Premium Elite', startDate: '2023-06-01', endDate: '2024-06-01' },
];

const PremiumUserManagementPage: React.FC = () => {
  const { user: loggedInUser } = useAuth();
  const [premiumUsers, setPremiumUsers] = useState<PremiumUser[]>(initialPremiumUsers);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<PremiumUser | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
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

  const handleAddUserClick = () => {
    setEditingUser(null);
    setIsDialogOpen(true);
  };

  const handleEditUserClick = (user: PremiumUser) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const membershipType = (form.elements.namedItem('membershipType') as HTMLSelectElement).value as PremiumUser['membershipType'];
    const startDate = (form.elements.namedItem('startDate') as HTMLInputElement).value;
    const endDate = (form.elements.namedItem('endDate') as HTMLInputElement).value;

    if (editingUser) {
      setPremiumUsers(premiumUsers.map((u) => (u.id === editingUser.id ? { ...u, email, membershipType, startDate, endDate } : u)));
      toast.success('Pengguna premium berjaya dikemaskini.');
    } else {
      const newUser: PremiumUser = {
        id: `pu${premiumUsers.length + 1}`,
        email,
        membershipType,
        startDate,
        endDate,
      };
      setPremiumUsers([...premiumUsers, newUser]);
      toast.success('Pengguna premium baru berjaya ditambah.');
    }
    setIsDialogOpen(false);
  };

  const handleDeleteUserClick = (userId: string) => {
    setDeletingUserId(userId);
    setIsConfirmDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingUserId) {
      setPremiumUsers(premiumUsers.filter((u) => u.id !== deletingUserId));
      toast.success('Pengguna premium berjaya dipadam.');
    }
    setIsConfirmDeleteDialogOpen(false);
    setDeletingUserId(null);
  };

  const handleCancelDelete = () => {
    setIsConfirmDeleteDialogOpen(false);
    setDeletingUserId(null);
  };

  return (
    <DashboardLayout title="Papan Pemuka Super Admin" navItems={superAdminNavItems}>
      <h1 className="text-4xl font-bold mb-4 text-center">Pengurusan Pengguna Premium</h1>
      {loggedInUser && (
        <p className="text-center text-lg text-muted-foreground mb-8">
          Anda log masuk sebagai: <span className="font-semibold">{loggedInUser.email} ({loggedInUser.role})</span>
        </p>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Senarai Pengguna Premium</CardTitle>
          <Button onClick={handleAddUserClick} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Tambah Pengguna Premium
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Emel</TableHead>
                <TableHead>Jenis Keahlian</TableHead>
                <TableHead>Tarikh Mula</TableHead>
                <TableHead>Tarikh Tamat</TableHead>
                <TableHead className="text-right">Tindakan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {premiumUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.membershipType}</TableCell>
                  <TableCell>{user.startDate}</TableCell>
                  <TableCell>{user.endDate}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditUserClick(user)}
                      className="mr-2"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteUserClick(user.id)}
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

      {/* Add/Edit User Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]" aria-labelledby="premium-user-dialog-title">
          <DialogHeader>
            <DialogTitle id="premium-user-dialog-title">{editingUser ? 'Edit Pengguna Premium' : 'Tambah Pengguna Premium Baru'}</DialogTitle>
            <DialogDescription>
              {editingUser ? 'Kemaskini butiran pengguna premium ini.' : 'Tambah pengguna premium baru ke dalam sistem.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveUser} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Emel
              </Label>
              <Input
                id="email"
                name="email"
                defaultValue={editingUser?.email || ''}
                className="col-span-3"
                type="email"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="membershipType" className="text-right">
                Jenis Keahlian
              </Label>
              <Select
                name="membershipType"
                defaultValue={editingUser?.membershipType || 'Premium Basic'}
                required
              >
                <SelectTrigger id="membershipType" className="col-span-3">
                  <SelectValue placeholder="Pilih Jenis Keahlian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Premium Basic">Premium Basic</SelectItem>
                  <SelectItem value="Premium Pro">Premium Pro</SelectItem>
                  <SelectItem value="Premium Elite">Premium Elite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                Tarikh Mula
              </Label>
              <Input
                id="startDate"
                name="startDate"
                defaultValue={editingUser?.startDate || ''}
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
                defaultValue={editingUser?.endDate || ''}
                className="col-span-3"
                type="date"
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit">{editingUser ? 'Simpan Perubahan' : 'Tambah Pengguna'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isConfirmDeleteDialogOpen} onOpenChange={setIsConfirmDeleteDialogOpen}>
        <DialogContent aria-labelledby="confirm-delete-premium-user-title">
          <DialogHeader>
            <DialogTitle id="confirm-delete-premium-user-title">Adakah anda pasti?</DialogTitle>
            <DialogDescription>
              Tindakan ini tidak boleh diundur. Ini akan memadam pengguna premium secara kekal.
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

export default PremiumUserManagementPage;