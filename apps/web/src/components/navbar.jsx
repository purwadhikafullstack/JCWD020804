import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
} from '@material-tailwind/react';
import { ProfileMenu } from './profileMenu';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

export function Navbarpage({ searchQuery, setSearchQuery }) {
  const user = useSelector((state) => state.user.value);

  const id = user.id;
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Navbar variant="gradient" color="white" className="max-w-full">
      <div className="flex items-center justify-between gap-4 text-white w-full">
        <div className="flex items-center gap-4">
          <img
            src="../src/assets/masnstay.jpg"
            alt="Logo"
            className="h-16 w-16 mr-2 "
          />
          <Link to="/">
            <Typography
              variant="h6"
              className="cursor-pointer py-1.5 text-black"
            >
              MasnStay
            </Typography>
          </Link>
        </div>

        <div className="search-container">
          <Input
            type="search"
            color="yellow"
            className="pr-10"
            containerProps={{
              className: 'min-w-[750px]',
            }}
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search properties..."
          />
          <Button color="yellow">Search</Button>
        </div>

        <div className="flex gap-4 items-center">
          

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
              />
              <Typography
                as="a"
                href="#"
                variant="h6"
                className="cursor-pointer py-1.5 text-black"
              >
                <span
                  className={`text-xs ml-1 ${
                    user.isTenant ? 'text-yellow-700' : ''
                  }`}
                >
                  {user.name}
                </span>
              </Typography>
            </>
          )}
        </div>
      </div>
    </Navbar>
  );
}
