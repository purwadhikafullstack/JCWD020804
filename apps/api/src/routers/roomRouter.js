import { Router } from 'express';
import {
  addRoom,
  deleteRoom,
  editRoom,
  getAllRoomByProperty,
} from '../controllers/roomController';
import { verifyToken } from '../middleware/auth';
import { multerUpload } from '../middleware/multer';

const roomRouter = Router();

roomRouter.get('/', verifyToken, getAllRoomByProperty);
roomRouter.post(
  '/add-room/:id',
  verifyToken,
  multerUpload().single('picture'),
  addRoom,
);
roomRouter.patch(
  '/edit-room/:id',
  verifyToken,
  multerUpload().single('picture'),
  editRoom,
);
roomRouter.delete('/delete-room/:id', verifyToken, deleteRoom);
export { roomRouter };
