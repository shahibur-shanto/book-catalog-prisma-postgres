import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post(
  '/categories/create-category',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  CategoryController.insertIntoDB
);
router.get('/categories', CategoryController.getAllCategory);
router.get('/categories/:id', CategoryController.getSingleCategory);
router.patch(
  '/categories/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  CategoryController.updateCategory
);
router.delete(
  '/categories/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteCategory
);

export const CategoryRoutes = router;
