import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Package, Car, Home, Smartphone, Shirt, Briefcase, Utensils, BookOpen } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  icon: string; // Name of the Lucide icon
  link: string;
}

const iconMap: { [key: string]: React.ElementType } = {
  Package, Car, Home, Smartphone, Shirt, Briefcase, Utensils, BookOpen
};

const CategoryCard: React.FC<CategoryCardProps> = ({ name, icon, link }) => {
  const IconComponent = iconMap[icon] || Package; // Default to Package icon

  return (
    <Link to={link} className="block">
      <Card className="flex flex-col items-center justify-center p-4 text-center hover:bg-accent transition-colors duration-200 h-full">
        <IconComponent className="h-8 w-8 text-primary mb-2" />
        <p className="text-sm font-medium">{name}</p>
      </Card>
    </Link>
  );
};

export default CategoryCard;