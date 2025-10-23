export interface CarouselItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
}

export const initialCarouselItems: CarouselItem[] = [
  {
    id: '1',
    title: 'Jual Beli Mudah, Cepat & Percuma!',
    description: 'Temui barangan terpakai dan baharu di gerobox.my.',
    imageUrl: '/placeholder.svg',
    buttonText: 'Mula Menjual',
    buttonLink: '/register',
  },
  {
    id: '2',
    title: 'Diskaun Menarik Menanti Anda!',
    description: 'Jangan lepaskan tawaran istimewa dari penjual kami.',
    imageUrl: '/placeholder.svg',
    buttonText: 'Lihat Promosi',
    buttonLink: '/promotions',
  },
  {
    id: '3',
    title: 'Sertai Komuniti Kami!',
    description: 'Berhubung dengan pembeli dan penjual lain.',
    imageUrl: '/placeholder.svg',
    buttonText: 'Terokai Komuniti',
    buttonLink: '/community',
  },
];