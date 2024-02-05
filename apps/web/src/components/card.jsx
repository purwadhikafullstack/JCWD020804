import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatMataUang } from '../helper/formatFunction';

export function PropertyCard({ selectedCategory, searchQuery }) {
  const checklogin = localStorage.getItem('token');
  const [properties, setProperties] = useState([]);
  console.log('checklogin', typeof checklogin);
  const navigate = useNavigate();

  const handleReserve = (id) => {
    if (checklogin) {
      navigate(`/detail/${id}`);
    } else {
      navigate('/login');
      toast.error(`Log in first, please 🙏.`);
    }
  };
  const fetch_data = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/property/`, {
        params: {
          category: selectedCategory,
          query: searchQuery,
        },
      });
      console.log(response.data, 'inidata');
      setProperties(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch_data();
  }, [selectedCategory, searchQuery]);

  const getLowestRoomPrice = (property) => {
    const lowestPrice = property.Rooms?.reduce(
      (min, room) => (room.price < min ? room.price : min),
      Infinity,
    );
    return lowestPrice !== Infinity ? lowestPrice : 'N/A';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {properties.map((property) => (
        <Card key={property.id} className="w-full max-w-[26rem] shadow-lg">
          <CardHeader floated={false} color="blue-gray">
            <img
              src={`http://localhost:8000/${property.picture}`}
              alt="ui/ux review check"
              className="object-cover w-full h-48 rounded-t-lg"
            />
            <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />
            <IconButton
              size="sm"
              color="red"
              variant="text"
              className="absolute top-4 right-4 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </IconButton>
          </CardHeader>
          <CardBody>
            <div className="mb-3">
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-medium"
              >
                {property.name}
              </Typography>
              <Typography color="gray">
                {property.Location?.city} {property.Location?.province}
              </Typography>
            </div>
            <div className="flex items-center gap-3">
              <Typography color="gray">
                {property.description} DESKRIPSI
              </Typography>
            </div>

            <Typography color="gray">
              {formatMataUang(getLowestRoomPrice(property), 'IDR')}
            </Typography>
          </CardBody>

          <CardFooter className="pt-3">
            <Button
              size="lg"
              fullWidth={true}
              className="bg-yellow-500 text-black"
              onClick={() => handleReserve(property.id)}
            >
              Reserve
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
