import { Router } from 'express';
import {
  getAllProperty,
  getPropertyById,
  getReviewProperty,
  addLocation,
  addProperty,
  deleteProperty,
  editProperty,
  getAllPropertyTenant,
} from '../controllers/propertyController';
import { verifyToken } from '../middleware/auth';
const { multerUpload } = require('../middleware/multer');

const propertyRouter = Router();

// GET
propertyRouter.get('/', getAllProperty);
propertyRouter.get('/ratings', verifyToken, getReviewProperty);
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

propertyRouter.delete('/delete-property/:id', verifyToken, deleteProperty)
propertyRouter.patch(
  '/edit-properties/:id',
  verifyToken,
  multerUpload().single('picture'),
  editProperty,
);


export { propertyRouter };
