import React, { useState } from 'react';
import { Navbarpage } from '../../components/navbar';
import { CarouselCustomArrows } from '../../components/carousel';
import { SimpleFooter } from '../../components/footer';
import { PropertyCard } from '../../components/card';
import { Button } from '@material-tailwind/react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-white">
      <div className="w-full mx-auto">
        <div className="w-[90%] mx-auto py-[20px]">
          <Navbarpage searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        <div className="w-[90%] h-[500px] mx-auto py-[20px]">
          <CarouselCustomArrows />
        </div>
        <div className="w-[90%] mx-auto py-[20px] flex gap-4">
          <Button
            size="sm"
            className="bg-yellow-500 text-black"
            onClick={() => handleCategoryChange('Hotel')}
          >
            Hotel
          </Button>
          <Button
            size="sm"
            className="bg-yellow-500 text-black"
            onClick={() => handleCategoryChange('Apartment')}
          >
            Apartment
          </Button>
          <Button
            size="sm"
            className="bg-yellow-500 text-black"
            onClick={() => handleCategoryChange('Villa')}
          >
            Villa
          </Button>
          <Button
            size="sm"
            className="bg-yellow-500 text-black"
            onClick={() => handleCategoryChange('')}
          >
            All
          </Button>
        </div>
        <div className="w-[90%] mx-auto py-[20px]">
          <PropertyCard searchQuery={searchQuery} selectedCategory={selectedCategory} />
        </div>
        <div className="w-[90%] mx-auto py-[20px]">
          <SimpleFooter />
        </div>
      </div>
    </div>
  );
}