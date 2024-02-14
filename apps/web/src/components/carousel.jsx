import { useEffect, useState } from 'react';
import { api } from '../helper/api';

export function CarouselCustomArrows() {
  const [properties, setProperties] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const fetch_data = async () => {
    try {
      const response = await api.get(`/property`);
      setProperties(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch_data();
  }, []);

  useEffect(() => {
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
      <div className="rounded-xl overflow-hidden">
        {properties?.map((property, index) => (
          <img
            key={property.id}
            src={property.picture}
            alt={`image ${property.id}`}
            className={`h-96 w-full object-cover ${
              index === activeIndex ? 'block' : 'hidden'
            }`}
            onError={handleImageError}
          />
        ))}
      </div>
    </div>
  );
}
