import express from 'express';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post('/categories/create-category', CategoryController.insertIntoDB);
router.get('/categories', CategoryController.getAllCategory);
router.get('/categories/:id', CategoryController.getSingleCategory);

export const CategoryRoutes = router;
