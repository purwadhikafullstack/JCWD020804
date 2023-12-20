import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
} from '@material-tailwind/react';
import { BellIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';
import { ProfileMenu } from './profile';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { useEffect } from "react";

export function Navbarpage() {
  const user = useSelector((state)=> state.user.value) 
  console.log(user);
  const id = user.id;
  const checkUser = () => {
    if (user) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    checkUser();
  });
  return (
    <Navbar variant="gradient" color="white" className="max-w-full">
      <div className=" flex items-center justify-between gap-4 text-white w-full">
        <div className="flex items-center gap-4">
          <img
            src="../src/assets/masnstay.jpg"
            alt="Logo"
            className="h-16 w-16 mr-2 "
          />
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="cursor-pointer py-1.5 text-black"
          >
            MasnStay
          </Typography>
        </div>

        <div className="flex gap-4 items-center">
          <IconButton
            variant="text"
            color="yellow"
            className="bg-yellow-500 text-black"
          >
            <Cog6ToothIcon className="h-4 w-4" />
          </IconButton>
          <IconButton
            variant="text"
            color="yellow"
            className="bg-yellow-500 text-black"
          >
            <BellIcon className="h-4 w-4" />
          </IconButton>
          <div className="relative flex items-center">
            <Input
              type="search"
              color="yellow"
              label="Type here..."
              className="pr-10"
              containerProps={{
                className: 'min-w-[288px]',
              }}
            />
            <Button
              size="sm"
              color="yellow"
              className="absolute right-0 top-0 mt-1 rounded"
            >
              Search
            </Button>
          </div>
          
          {!id?(
            <>
           
          <Link to={'/login'}>
            <Button className="bg-yellow-500 text-black">Log In</Button>
          </Link>
          <Link to={'/register'}>
            <Button className="bg-yellow-500 text-black">Register</Button>
          </Link>
          </>
          ):(
          <>
          <ProfileMenu 
            variant="circular"
            size="sm"
            alt="Profile"
            className="border border-gray-900 p-0.5"
            src="https://png.pngtree.com/png-clipart/20220421/ourmid/pngtree-joget-jamet-kuproy-vector-png-image_4551642.png"
          />
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="cursor-pointer py-1.5 text-black"
          >
            {user.username}
          </Typography>
          </>
          )}
          
        </div>
      </div>
    </Navbar>
  );
}
