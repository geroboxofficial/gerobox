import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Users, Settings, Package, LayoutGrid, Globe, Star, TrendingUp, Edit, Trash2, PlusCircle } from 'lucide-react';
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

interface UserManagement {
  id: string;
  email: string;
  role: 'superadmin' | 'admin' | 'seller' | 'user';
}

const initialUsers: UserManagement[] = [
  { id: '1', email: 'superadmin@gerobox.my', role: 'superadmin' },
  { id: '2', email: 'admin@gerobox.my', role: 'admin' },
  { id: '3', email: 'seller@gerobox.my', role: 'seller' },
  { id: '4', email: 'user@gerobox.my', role: 'user' },
];

const UserAdminManagementPage: React.FC = () => {
  const { user: loggedInUser } = useAuth();
  const [users, setUsers] = useState<UserManagement[]>(initialUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserManagement | null>(null);
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

  const handleEditUserClick = (user: UserManagement) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const role = (form.elements.namedItem('role') as HTMLSelectElement).value as UserManagement['role'];

    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...u, email, role } : u)));
      toast.success('Pengguna berjaya dikemaskini.');
    } else {
      const newUser: UserManagement = {
        id: String(users.length + 1),
        email,
        role,
      };
      setUsers([...users, newUser]);
      toast.success('Pengguna baru berjaya ditambah.');
    }
    setIsDialogOpen(false);
  };

  const handleDeleteUserClick = (userId: string) => {
    setDeletingUserId(userId);
    setIsConfirmDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingUserId) {
      setUsers(users.filter((u) => u.id !== deletingUserId));
      toast.success('Pengguna berjaya dipadam.');
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
      <h1 className="text-4xl font-bold mb-4 text-center">Pengurusan Pengguna & Admin</h1>
      {loggedInUser && (
        <p className="text-center text-lg text-muted-foreground mb-8">
          Anda log masuk sebagai: <span className="font-semibold">{loggedInUser.email} ({loggedInUser.role})</span>
        </p>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Senarai Pengguna & Admin</CardTitle>
          <Button onClick={handleAddUserClick} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Tambah Pengguna/Admin
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Emel</TableHead>
                <TableHead>Peranan</TableHead>
                <TableHead className="text-right">Tindakan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Edit Pengguna/Admin' : 'Tambah Pengguna/Admin Baru'}</DialogTitle>
            <DialogDescription>
              {editingUser ? 'Kemaskini butiran pengguna ini.' : 'Tambah pengguna atau pentadbir baru ke sistem.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveUser} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Emel
              </Label>
              <Input
                id="email"
                defaultValue={editingUser?.email || ''}
                className="col-span-3"
                type="email"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Peranan
              </Label>
              <Select
                name="role"
                defaultValue={editingUser?.role || 'user'}
                required
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih Peranan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="superadmin">Super Admin</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="seller">Penjual</SelectItem>
                  <SelectItem value="user">Pengguna</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="submit">{editingUser ? 'Simpan Perubahan' : 'Tambah Pengguna'}</Button>
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
              Tindakan ini tidak boleh diundur. Ini akan memadam pengguna secara kekal.
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

export default UserAdminManagementPage;