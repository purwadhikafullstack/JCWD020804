import React, { useState } from 'react';
import logo from '../assets/masnstay.jpg';
import { Typography } from '@material-tailwind/react';

export function SimpleFooter() {
  const [footerHeight, setFooterHeight] = useState('20px');
  const [isFooterHidden, setIsFooterHidden] = useState(false);

  const handleFooterHeightChange = (newHeight) => {
    setFooterHeight(newHeight);
    setIsFooterHidden(newHeight === '0px' || newHeight === '10px');
  };

  return (
    <footer
      className={`flex flex-col items-center justify-center gap-y-6 border-t border-blue-gray-50 py-6 text-center md:flex-row md:justify-between ${
        isFooterHidden ? 'hidden' : ''
      }`}
      style={{ paddingTop: footerHeight, paddingBottom: footerHeight }}
    >
      <div className="flex flex-col items-center gap-y-2 md:text-left">
        <Typography color="blue-gray" className="font-normal">
          &copy; 2023 Masnstay
        </Typography>
        <div className="flex items-center gap-x-2">
          <img
            src={logo}
            alt="Logo"
            className="h-16 w-16 mr-2"
          />
          <Typography color="blue-gray" className="text-sm">
            Masnstay
          </Typography>
        </div>
      </div>
  
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-4 md:flex-row md:justify-center">
        <li className="md:w-1/2"> 
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            About Us
          </Typography>
          <Typography>MasnStay is a hotel booking application.</Typography>
        </li>
  
        <li className="md:w-1/2"> 
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            Contact Us
          </Typography>
          <Typography>
            Jl. Asia Afrika No.133-137, Kebon Pisang, Sumurbandung, Bandung City,
            West Java
          </Typography>
          <Typography>082219308866</Typography>
          <Typography>masn40208@gmail.com</Typography>
        </li>
      </ul>
  
      <div className="flex gap-4 md:justify-end">
        <button
          onClick={() => handleFooterHeightChange('0px')}
          className="px-4 py-2 text-sm font-medium text-black bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-300"
        >
          Closed
        </button>
      </div>
    </footer>
  );

}