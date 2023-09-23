import { Order, PrismaClient } from '@prisma/client';
import { IOrder } from './order.interface';

const prisma = new PrismaClient();
const createOrder = async (data: IOrder): Promise<Order> => {
  const result = await prisma.order.create({
    data,
  });
  return result;
};

export const OrderService = {
  createOrder,
};
