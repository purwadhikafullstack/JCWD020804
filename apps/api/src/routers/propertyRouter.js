import { Router } from 'express';
import {
  addLocation,
  addProperty,
  editProperty,
  getAllProperty,
  getAllPropertyTenant,
  getPropertyById,
} from '../controllers/propertyController';
import { verifyToken } from '../middleware/auth';

const propertyRouter = Router();
const { multerUpload } = require('../middleware/multer');

// GET
propertyRouter.get('/', verifyToken, getAllProperty);
propertyRouter.get('/tenant', verifyToken, getAllPropertyTenant);
propertyRouter.get('/:id', getPropertyById);
//POST
propertyRouter.post(
  '/add-properties',
  verifyToken,
  multerUpload().single('picture'),
  addProperty,
);
propertyRouter.post('/add-location', verifyToken, addLocation);
//PATCH
propertyRouter.patch(
  '/edit-properties/:id',
  verifyToken,
  multerUpload().single('picture'),
  editProperty,
);

export { propertyRouter };
