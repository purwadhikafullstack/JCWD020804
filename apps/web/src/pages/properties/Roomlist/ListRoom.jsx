import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setData } from '../../../redux/propertySlice';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Typography, IconButton, Avatar } from '@material-tailwind/react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useNavigate, useParams } from 'react-router-dom';
import { Select, Option } from '@material-tailwind/react';
import { api } from '../../../helper/api';
import { SidebarTenant } from '../SidebarTenant';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ListRoomTenant = () => {
  const token = localStorage.getItem('token');
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState('');

  const fetch_data = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await api.get(`/room/`, config);

      setProperties(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (roomId) => {
    try {
      await api.delete(`/room/delete-room/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const notif = () => {
        toast.success('Your rooms has been deleted.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          onClose: () => {
            setTimeout(() => {
              window.location.reload();
            }, 5000);
          },
        });
      };

      notif();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectChange = (value) => {
    setSelectedProperty(value);
  };

  useEffect(() => {
    fetch_data();
  }, [selectedProperty]);

  return (
    <div className="flex">
      <SidebarTenant />
      <div className="felx flex-col">
        <div className="p-5">
          <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
            <div className="w-72">
              <Select label="Your Property" onChange={handleSelectChange}>
                {properties.map((property) => (
                  <Option key={property.id} value={property}>
                    {property.name}
                  </Option>
                ))}
              </Select>
            </div>
            <button
              class="flex select-none items-center gap-3 rounded-lg bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                stroke-width="2"
                class="w-4 h-4"
              >
                <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
              </svg>
              <Link to={`/add-room/${selectedProperty.id}`}>Add room</Link>
            </button>
          </div>

          <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Picture Room
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Name Room
                    </Typography>
                  </th>

                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Description
                    </Typography>
                  </th>

                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Price
                    </Typography>
                  </th>

                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Made at
                    </Typography>
                  </th>

                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Edit your Room
                    </Typography>
                  </th>

                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Delete Your Room
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedProperty.Rooms?.map((room) => (
                  <tr key={room.id}>
                    <td className={` bg-blue-gray-50/50`}>
                      <div className="flex items-center gap-3">
                        <Avatar src={room?.picture} alt={'picture room'} size="sm" />
                      </div>
                    </td>
                    <td className={` bg-blue-gray-50/50`}>
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {room.name}
                        </Typography>
                      </div>
                    </td>
                    <td className={` bg-blue-gray-50/50`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {room.description}
                      </Typography>
                    </td>
                    <td className={` bg-blue-gray-50/50`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {room.price}
                      </Typography>
                    </td>
                    <td className={` bg-blue-gray-50/50`}>
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {room.createdAt}
                      </Typography>
                    </td>
                    <td className={` bg-blue-gray-50/50`}>
                      <Link to={`/edit-rooms/${room.id}`}>
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Link>
                    </td>
                    <td className={` bg-blue-gray-50/50`}>
                      <IconButton variant="text">
                        <TrashIcon
                          className="h-4 w-4"
                          onClick={() => handleDelete(room.id)}
                        />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </div>
  );
};
