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
import { formatMataUang } from '../helper/formatFunction';
import { averageRating } from '../helper/getRating';
import { api } from '../helper/api';

export function PropertyCard({ selectedCategory, searchQuery }) {
  const checklogin = localStorage.getItem('token');
  const [properties, setProperties] = useState([]);

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
      const response = await api.get(`/property`, {
        params: {
          category: selectedCategory,
          query: searchQuery,
        },
      });
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
    return lowestPrice !== Infinity ? lowestPrice : '0';
  };

  function truncateDescription(description, maxLength) {
    if (description && description.split(' ').length > maxLength) {
      return `${description.split(' ').slice(0, maxLength).join(' ')}...`;
    }
    return description;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {properties?.map((property) => (
        <Card
          key={property.id}
          className="w-full max-w-[26rem] shadow-lg flex flex-col"
        >
          <CardHeader floated={false} color="blue-gray">
            <img
              src={property.picture}
              alt="property picture"
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
          <CardBody className="flex-grow flex flex-col">
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
              {property?.Reviews && property.Reviews.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-mt-0.5 h-5 w-5 text-yellow-700"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <Typography color="blue-gray" className="font-normal">
                    {averageRating(property?.Reviews)}
                  </Typography>
                </div>
              )}
            </div>
            <div className="flex-grow flex flex-col items-start gap-3">
              <Typography color="gray" className="flex-grow">
                {truncateDescription(property.description, 20)}
              </Typography>
              <Typography color="gray">
                {formatMataUang(getLowestRoomPrice(property), 'IDR')}
              </Typography>
            </div>
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
