import { LayoutTemplate } from 'lucide-react';

export interface AdSpot {
  id: string;
  name: string;
  companyName: string; // New field
  location: 'Atas Halaman' | 'Bawah Halaman' | 'Pop-up' | 'Sisi Kanan' | 'Sisi Kiri';
  rate: string; // e.g., "RM 100/hari", "RM 500/minggu"
  status: 'Aktif' | 'Tidak Aktif';
  contentType: 'image' | 'html'; // Type of ad content
  imageUrl?: string; // For image ads
  targetUrl?: string; // For image ads
  adCode?: string; // For HTML/script ads
  startDate: string; // New field (YYYY-MM-DD)
  endDate: string; // New field (YYYY-MM-DD)
}

export const initialAdSpots: AdSpot[] = [
  { id: 'ad1', name: 'Banner Utama Atas', companyName: 'Syarikat A', location: 'Atas Halaman', rate: 'RM 150/hari', status: 'Aktif', contentType: 'image', imageUrl: '/placeholder.svg', targetUrl: 'https://example.com/promo1', startDate: '2024-01-01', endDate: '2024-12-31' },
  { id: 'ad2', name: 'Banner Bawah Kaki', companyName: 'Syarikat B', location: 'Bawah Halaman', rate: 'RM 80/hari', status: 'Aktif', contentType: 'image', imageUrl: '/placeholder.svg', targetUrl: 'https://example.com/promo2', startDate: '2024-07-01', endDate: '2024-08-31' },
  { id: 'ad3', name: 'Pop-up Promosi', companyName: 'Syarikat C', location: 'Pop-up', rate: 'RM 200/hari', status: 'Tidak Aktif', contentType: 'html', adCode: '<div class="p-4 bg-yellow-100 text-yellow-800 rounded-lg">Iklan Pop-up Eksklusif!</div>', startDate: '2024-05-01', endDate: '2024-06-30' },
  { id: 'ad4', name: 'Iklan Sisi Kanan', companyName: 'Syarikat D', location: 'Sisi Kanan', rate: 'RM 120/hari', status: 'Aktif', contentType: 'image', imageUrl: '/placeholder.svg', targetUrl: 'https://example.com/promo4', startDate: '2024-07-15', endDate: '2024-09-15' },
  { id: 'ad5', name: 'Iklan Lama', companyName: 'Syarikat E', location: 'Atas Halaman', rate: 'RM 100/hari', status: 'Aktif', contentType: 'image', imageUrl: '/placeholder.svg', targetUrl: 'https://example.com/old-promo', startDate: '2023-01-01', endDate: '2023-12-31' }, // Example of an expired ad
];

// Template for new ad spot when contentType is changed in dialog
export const newAdSpotTemplate: AdSpot = {
  id: '', // Will be generated
  name: '',
  companyName: '', // Default for new ad
  location: 'Atas Halaman',
  rate: '',
  status: 'Aktif',
  contentType: 'image', // Default to image for new ads
  imageUrl: '',
  targetUrl: '',
  adCode: '',
  startDate: new Date().toISOString().split('T')[0], // Default to today
  endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0], // Default to one year from now
};