import { LayoutTemplate } from 'lucide-react';

export interface AdSpot {
  id: string;
  name: string;
  location: 'Atas Halaman' | 'Bawah Halaman' | 'Pop-up' | 'Sisi Kanan' | 'Sisi Kiri';
  rate: string; // e.g., "RM 100/hari", "RM 500/minggu"
  status: 'Aktif' | 'Tidak Aktif';
  contentType: 'image' | 'html'; // Type of ad content
  imageUrl?: string; // For image ads
  targetUrl?: string; // For image ads
  adCode?: string; // For HTML/script ads
}

export const initialAdSpots: AdSpot[] = [
  { id: 'ad1', name: 'Banner Utama Atas', location: 'Atas Halaman', rate: 'RM 150/hari', status: 'Aktif', contentType: 'image', imageUrl: '/placeholder.svg', targetUrl: 'https://example.com/promo1' },
  { id: 'ad2', name: 'Banner Bawah Kaki', location: 'Bawah Halaman', rate: 'RM 80/hari', status: 'Aktif', contentType: 'image', imageUrl: '/placeholder.svg', targetUrl: 'https://example.com/promo2' },
  { id: 'ad3', name: 'Pop-up Promosi', location: 'Pop-up', rate: 'RM 200/hari', status: 'Tidak Aktif', contentType: 'html', adCode: '<div class="p-4 bg-yellow-100 text-yellow-800 rounded-lg">Iklan Pop-up Eksklusif!</div>' },
  { id: 'ad4', name: 'Iklan Sisi Kanan', location: 'Sisi Kanan', rate: 'RM 120/hari', status: 'Aktif', contentType: 'image', imageUrl: '/placeholder.svg', targetUrl: 'https://example.com/promo4' },
];

// Template for new ad spot when contentType is changed in dialog
export const newAdSpotTemplate: AdSpot = {
  id: '', // Will be generated
  name: '',
  location: 'Atas Halaman',
  rate: '',
  status: 'Aktif',
  contentType: 'image', // Default to image for new ads
  imageUrl: '',
  targetUrl: '',
  adCode: '',
};