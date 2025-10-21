import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-background py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
        <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} gerobox.my. Hak Cipta Terpelihara.
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium">
          <Link to="/contact" className="text-muted-foreground hover:text-primary">
            Hubungi Kami
          </Link>
          <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary">
            Polisi Privasi
          </Link>
          <Link to="/terms-of-service" className="text-muted-foreground hover:text-primary">
            Terma Perkhidmatan
          </Link>
        </nav>
        <div className="flex space-x-4">
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
            <Facebook className="h-5 w-5" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
            <Twitter className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;