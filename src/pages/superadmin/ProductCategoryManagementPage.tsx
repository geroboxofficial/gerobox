import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Package, Settings, Users, LayoutGrid, Globe, Star, TrendingUp, PlusCircle, Edit, Trash2 } from 'lucide-react';
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

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
}

interface Category {
  id: string;
  name: string;
}

const initialProducts: Product[] = [
  { id: 'p1', name: 'Telefon Pintar XYZ', category: 'Elektronik', price: 'RM 850' },
  { id: 'p2', name: 'Kereta Terpakai ABC', category: 'Kenderaan', price: 'RM 35,000' },
  { id: 'p3', name: 'Meja Kopi Moden', category: 'Hartanah', price: 'RM 120' },
];

const initialCategories: Category[] = [
  { id: 'c1', name: 'Elektronik' },
  { id: 'c2', name: 'Kenderaan' },
  { id: 'c3', name: 'Hartanah' },
  { id: 'c4', name: 'Fesyen' },
  { id: 'c5', name: 'Perkhidmatan' },
  { id: 'c6', name: 'Buku & Media' },
  { id: 'c7', name: 'Rumah & Taman' },
  { id: 'c8', name: 'Sukan & Hobi' },
  { id: 'c9', name: 'Barangan Bayi & Kanak-kanak' },
  { id: 'c10', name: 'Kesihatan & Kecantikan' },
  { id: 'c11', name: 'Makanan & Minuman' },
  { id: 'c12', name: 'Haiwan Peliharaan' },
];

const ProductCategoryManagementPage: React.FC = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  // Product Dialog States
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [isProductConfirmDeleteDialogOpen, setIsProductConfirmDeleteDialogOpen] = useState(false);

  // Category Dialog States
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(null);
  const [isCategoryConfirmDeleteDialogOpen, setIsCategoryConfirmDeleteDialogOpen] = useState(false);

  const superAdminNavItems = [
    { label: 'Pengurusan Sistem', href: '/super-admin-dashboard/settings', icon: Settings },
    { label: 'Pengurusan Pengguna & Admin', href: '/super-admin-dashboard/users', icon: Users },
    { label: 'Produk & Kategori', href: '/super-admin-dashboard/products-categories', icon: Package },
    { label: 'Lokasi', href: '/super-admin-dashboard/locations', icon: Globe },
    { label: 'Ikon Produk', href: '/super-admin-dashboard/product-icons', icon: LayoutGrid },
    { label: 'Pengguna Premium', href: '/super-admin-dashboard/premium-users', icon: Star },
    { label: 'Statistik', href: '/super-admin-dashboard', icon: TrendingUp },
  ];

  // Product Management Handlers
  const handleAddProductClick = () => {
    setEditingProduct(null);
    setIsProductDialogOpen(true);
  };

  const handleEditProductClick = (product: Product) => {
    setEditingProduct(product);
    setIsProductDialogOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const category = (form.elements.namedItem('category') as HTMLInputElement).value;
    const price = (form.elements.namedItem('price') as HTMLInputElement).value;

    if (editingProduct) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? { ...p, name, category, price } : p)));
      toast.success('Produk berjaya dikemaskini.');
    } else {
      const newProduct: Product = {
        id: `p${products.length + 1}`,
        name,
        category,
        price,
      };
      setProducts([...products, newProduct]);
      toast.success('Produk baru berjaya ditambah.');
    }
    setIsProductDialogOpen(false);
  };

  const handleDeleteProductClick = (productId: string) => {
    setDeletingProductId(productId);
    setIsProductConfirmDeleteDialogOpen(true);
  };

  const handleConfirmDeleteProduct = () => {
    if (deletingProductId) {
      setProducts(products.filter((p) => p.id !== deletingProductId));
      toast.success('Produk berjaya dipadam.');
    }
    setIsProductConfirmDeleteDialogOpen(false);
    setDeletingProductId(null);
  };

  const handleCancelDeleteProduct = () => {
    setIsProductConfirmDeleteDialogOpen(false);
    setDeletingProductId(null);
  };

  // Category Management Handlers
  const handleAddCategoryClick = () => {
    setEditingCategory(null);
    setIsCategoryDialogOpen(true);
  };

  const handleEditCategoryClick = (category: Category) => {
    setEditingCategory(category);
    setIsCategoryDialogOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;

    if (editingCategory) {
      setCategories(categories.map((c) => (c.id === editingCategory.id ? { ...c, name } : c)));
      toast.success('Kategori berjaya dikemaskini.');
    } else {
      const newCategory: Category = {
        id: `c${categories.length + 1}`,
        name,
      };
      setCategories([...categories, newCategory]);
      toast.success('Kategori baru berjaya ditambah.');
    }
    setIsCategoryDialogOpen(false);
  };

  const handleDeleteCategoryClick = (categoryId: string) => {
    setDeletingCategoryId(categoryId);
    setIsCategoryConfirmDeleteDialogOpen(true);
  };

  const handleConfirmDeleteCategory = () => {
    if (deletingCategoryId) {
      setCategories(categories.filter((c) => c.id !== deletingCategoryId));
      toast.success('Kategori berjaya dipadam.');
    }
    setIsCategoryConfirmDeleteDialogOpen(false);
    setDeletingCategoryId(null);
  };

  const handleCancelDeleteCategory = () => {
    setIsCategoryConfirmDeleteDialogOpen(false);
    setDeletingCategoryId(null);
  };

  return (
    <DashboardLayout title="Papan Pemuka Super Admin" navItems={superAdminNavItems}>
      <h1 className="text-4xl font-bold mb-4 text-center">Pengurusan Produk & Kategori</h1>
      {user && (
        <p className="text-center text-lg text-muted-foreground mb-8">
          Anda log masuk sebagai: <span className="font-semibold">{user.email} ({user.role})</span>
        </p>
      )}

      {/* Product Management Section */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Pengurusan Produk</CardTitle>
          <Button onClick={handleAddProductClick} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Tambah Produk
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nama Produk</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead className="text-right">Tindakan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditProductClick(product)}
                      className="mr-2"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteProductClick(product.id)}
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

      {/* Category Management Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Pengurusan Kategori</CardTitle>
          <Button onClick={handleAddCategoryClick} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Tambah Kategori
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nama Kategori</TableHead>
                <TableHead className="text-right">Tindakan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditCategoryClick(category)}
                      className="mr-2"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteCategoryClick(category.id)}
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

      {/* Add/Edit Product Dialog */}
      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="sm:max-w-[425px]" aria-labelledby="product-dialog-title">
          <DialogHeader>
            <DialogTitle id="product-dialog-title">{editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}</DialogTitle>
            <DialogDescription>
              {editingProduct ? 'Kemaskini butiran produk ini.' : 'Tambah produk baru ke platform.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveProduct} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nama Produk
              </Label>
              <Input
                id="name"
                defaultValue={editingProduct?.name || ''}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Kategori
              </Label>
              <Input
                id="category"
                defaultValue={editingProduct?.category || ''}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Harga
              </Label>
              <Input
                id="price"
                defaultValue={editingProduct?.price || ''}
                className="col-span-3"
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit">{editingProduct ? 'Simpan Perubahan' : 'Tambah Produk'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Product Confirmation Dialog */}
      <Dialog open={isProductConfirmDeleteDialogOpen} onOpenChange={setIsProductConfirmDeleteDialogOpen}>
        <DialogContent aria-labelledby="confirm-delete-product-title">
          <DialogHeader>
            <DialogTitle id="confirm-delete-product-title">Adakah anda pasti?</DialogTitle>
            <DialogDescription>
              Tindakan ini tidak boleh diundur. Ini akan memadam produk secara kekal.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelDeleteProduct}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleConfirmDeleteProduct}>
              Padam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Category Dialog */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent className="sm:max-w-[425px]" aria-labelledby="category-dialog-title">
          <DialogHeader>
            <DialogTitle id="category-dialog-title">{editingCategory ? 'Edit Kategori' : 'Tambah Kategori Baru'}</DialogTitle>
            <DialogDescription>
              {editingCategory ? 'Kemaskini nama kategori ini.' : 'Tambah kategori baru ke platform.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveCategory} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nama Kategori
              </Label>
              <Input
                id="name"
                defaultValue={editingCategory?.name || ''}
                className="col-span-3"
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit">{editingCategory ? 'Simpan Perubahan' : 'Tambah Kategori'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Category Confirmation Dialog */}
      <Dialog open={isCategoryConfirmDeleteDialogOpen} onOpenChange={setIsCategoryConfirmDeleteDialogOpen}>
        <DialogContent aria-labelledby="confirm-delete-category-title">
          <DialogHeader>
            <DialogTitle id="confirm-delete-category-title">Adakah anda pasti?</DialogTitle>
            <DialogDescription>
              Tindakan ini tidak boleh diundur. Ini akan memadam kategori secara kekal.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelDeleteCategory}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleConfirmDeleteCategory}>
              Padam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ProductCategoryManagementPage;