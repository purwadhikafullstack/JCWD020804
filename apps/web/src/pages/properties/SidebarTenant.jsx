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
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  HomeIcon,
  PowerIcon,
} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

export const SidebarTenant = () => {
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Welcome to tenant
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/Date">Dashboard</Link>
        </ListItem>
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
          <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Transactions
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Report
        </ListItem>
        
      </List>
    </Card>
  );
};
