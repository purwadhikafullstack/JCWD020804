import axios from 'axios';
import { Carousel } from '@material-tailwind/react';
import { useEffect, useState } from 'react';

export function CarouselCustomArrows() {
  const [properties, setProperties] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const fetch_data = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/property/`);
      console.log(response.data, 'inidata');
      setProperties(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch_data();
  }, []);

  useEffect(() => {
    console.log('Properties:', properties);
    console.log('Active Index:', activeIndex);
  
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % properties.length);
    }, 2000);
  
    return () => clearInterval(interval);
  }, [properties]);

  const handleImageError = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % properties.length);
  };

  return (
    <div>
      <Carousel
        index={activeIndex}
        auto={false} 
        interval={1000} 
        className="rounded-xl overflow-hidden"
      >
        {properties.map((property, index) => (
          <img
            key={property.id}
            src={`http://localhost:8000/${property.picture}`}
            alt={`image ${property.id}`}
            className={`h-96 w-full object-cover ${
              index === activeIndex ? 'block' : 'hidden'
            }`}
            onError={handleImageError}
          />
        ))}
      </Carousel>
    </div>
  );
}
