import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import UserProfile from "./pages/UserProfile";
import AdminDashboard from "./pages/AdminDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PromotionsPage from "./pages/PromotionsPage";
import CommunityPage from "./pages/CommunityPage";
import ChatPage from "./pages/ChatPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Super Admin Pages
import SystemSettingsPage from "./pages/superadmin/SystemSettingsPage";
import UserAdminManagementPage from "./pages/superadmin/UserAdminManagementPage";
import ProductCategoryManagementPage from "./pages/superadmin/ProductCategoryManagementPage";
import LocationManagementPage from "./pages/superadmin/LocationManagementPage";
import ProductIconManagementPage from "./pages/superadmin/ProductIconManagementPage";
import PremiumUserManagementPage from "./pages/superadmin/PremiumUserManagementPage";

// Super Admin System Settings Sub-Pages
import GeneralSettingsPage from "./pages/superadmin/settings/GeneralSettingsPage";
import CommunicationSettingsPage from "./pages/superadmin/settings/CommunicationSettingsPage";
import FinancialSettingsPage from "./pages/superadmin/settings/FinancialSettingsPage";
import ContentManagementPage from "./pages/superadmin/settings/ContentManagementPage";
import SeoSettingsPage from "./pages/superadmin/settings/SeoSettingsPage";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/promotions" element={<PromotionsPage />} />
            <Route path="/community" element={<CommunityPage />} />

            {/* Protected Routes */}
            <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
            <Route path="/seller-dashboard" element={<ProtectedRoute><SellerDashboard /></ProtectedRoute>} />

            {/* Admin Dashboard Routes */}
            <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin-dashboard/users" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} /> {/* Placeholder */}
            <Route path="/admin-dashboard/ad-verification" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} /> {/* Placeholder */}
            <Route path="/admin-dashboard/support-chat" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} /> {/* Placeholder */}
            <Route path="/admin-dashboard/promotions-taglines" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} /> {/* Placeholder */}

            {/* Super Admin Dashboard Routes */}
            <Route path="/super-admin-dashboard" element={<ProtectedRoute><SuperAdminDashboard /></ProtectedRoute>} />
            <Route path="/super-admin-dashboard/settings" element={<ProtectedRoute><SystemSettingsPage /></ProtectedRoute>} />
            <Route path="/super-admin-dashboard/settings/general" element={<ProtectedRoute><GeneralSettingsPage /></ProtectedRoute>} />
            <Route path="/super-admin-dashboard/settings/communication" element={<ProtectedRoute><CommunicationSettingsPage /></ProtectedRoute>} />
            <Route path="/super-admin-dashboard/settings/financial" element={<ProtectedRoute><FinancialSettingsPage /></ProtectedRoute>} />
            <Route path="/super-admin-dashboard/settings/content" element={<ProtectedRoute><ContentManagementPage /></ProtectedRoute>} />
            <Route path="/super-admin-dashboard/settings/seo" element={<ProtectedRoute><SeoSettingsPage /></ProtectedRoute>} />
            <Route path="/super-admin-dashboard/users" element={<ProtectedRoute><UserAdminManagementPage /></ProtectedRoute>} />
            <Route path="/super-admin-dashboard/products-categories" element={<ProtectedRoute><ProductCategoryManagementPage /></ProtectedRoute>} />
            <Route path="/super-admin-dashboard/locations" element={<ProtectedRoute><LocationManagementPage /></ProtectedRoute>} />
            <Route path="/super-admin-dashboard/product-icons" element={<ProtectedRoute><ProductIconManagementPage /></ProtectedRoute>} />
            <Route path="/super-admin-dashboard/premium-users" element={<ProtectedRoute><PremiumUserManagementPage /></ProtectedRoute>} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;