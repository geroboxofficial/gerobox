import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  location: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, imageUrl, location }) => {
  return (
    <Card className="w-full max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${id}`}>
        <img
          src={imageUrl}
          alt={name}
          className="h-48 w-full object-cover"
        />
      </Link>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold truncate">
          <Link to={`/product/${id}`} className="hover:underline">
            {name}
          </Link>
        </h3>
        <p className="text-primary font-bold mt-1">{price}</p>
        <p className="text-sm text-muted-foreground mt-1">{location}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Heart className="h-4 w-4" />
          Suka
        </Button>
        <Button size="sm" asChild>
          <Link to={`/product/${id}`}>Lihat</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;