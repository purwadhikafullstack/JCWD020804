import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
} from '@material-tailwind/react';
import { BellIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';
import { ProfileMenu } from './profileMenu';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

export function Navbarpage({ searchQuery, setSearchQuery }) {
  const user = useSelector((state) => state.user.value);
  console.log(user);
  const id = user.id;
  const profilPicture = user.picture;
  const [userStatus, setUserStatus] = useState('User');

  const checkUser = () => {
    if (user.isTenant) {
      setUserStatus('Tenant');
    } else {
      setUserStatus('User');
    }
  };

  useEffect(() => {
    checkUser();
  }, [user.isTenant]);

  // Fungsi untuk menangani perubahan pada input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Navbar variant="gradient" color="white" className="max-w-full">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white w-full">
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

        <div className="search-container">
          <Input
            type="search"
            color="yellow"
            className="pr-10"
            containerProps={{
              className: 'min-w-[250px] md:min-w-[750px]',
            }}
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search properties..."
          />
          <Button color="yellow">Search</Button>
        </div>

        <div className="flex gap-4 items-center mt-4 md:mt-0">
          {!id ? (
            <>
              <Link to={'/login'}>
                <Button className="bg-yellow-500 text-black">Log In</Button>
              </Link>
              <Link to={'/register'}>
                <Button className="bg-yellow-500 text-black">Register</Button>
              </Link>
            </>
          ) : (
            <>
              <ProfileMenu
                variant="circular"
                size="sm"
                alt="Profile"
                className="border border-gray-900 p-0.5"
                src={`http://localhost:8000/api/${profilPicture}`}
              />
              <Typography
                as="a"
                href="#"
                variant="h6"
                className="cursor-pointer py-1.5 text-black"
              >
                {user.username}
                <div>
                  {' '}
                  as
                  <span
                    className={`text-xs ml-3 ${
                      user.isTenant ? 'text-yellow-700' : ''
                    }`}
                  >
                    {userStatus}
                  </span>
                </div>
              </Typography>
            </>
          )}
        </div>
      </div>
    </Navbar>
  );
}
