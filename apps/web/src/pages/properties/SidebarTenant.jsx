import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from '@material-tailwind/react';
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  HomeIcon,
  StarIcon,
  PowerIcon,
} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

export const SidebarTenant = () => {
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
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
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Welcome to tenant
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <HomeIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/list-property">Properties</Link>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <HomeIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/list-room">Rooms</Link>
        </ListItem>

        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/tenant/dashboard">Transactions </Link>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/tenant/sales-report">Report</Link>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <StarIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/tenant/ratings">Review</Link>
        </ListItem>
      </List>
    </Card>
  );
};
