import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

router.post('/orders/create-order', OrderController.createOrder);

export const OrderRoutes = router;
