import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from './Header';
import Footer from './Footer';

interface NavItem {
  label: string;
  href: string;
  icon?: React.ElementType; // Lucide icon component
}

interface DashboardLayoutProps {
  title: string;
  navItems: NavItem[];
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ title, navItems, children }) => {
  const isMobile = useIsMobile();

  const SidebarContent = (
    <nav className="flex flex-col gap-2 p-4">
      {navItems.map((item) => (
        <Button key={item.href} variant="ghost" className="justify-start" asChild>
          <Link to={item.href} className="flex items-center gap-2">
            {item.icon && <item.icon className="h-4 w-4" />}
            {item.label}
          </Link>
        </Button>
      ))}
    </nav>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="fixed top-16 left-4 z-40 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 pt-16">
              {SidebarContent}
            </SheetContent>
          </Sheet>
        ) : (
          <aside className="w-64 border-r bg-sidebar text-sidebar-foreground p-4 pt-8 hidden md:block">
            <h2 className="text-xl font-semibold mb-4">{title} Menu</h2>
            {SidebarContent}
          </aside>
        )}
        <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;