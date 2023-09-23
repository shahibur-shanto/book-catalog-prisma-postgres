import { Order, PrismaClient } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import { IOrder } from './order.interface';

const prisma = new PrismaClient();
const createOrder = async (data: IOrder): Promise<Order> => {
  const result = await prisma.order.create({
    data,
  });
  return result;
};

const getAllOrder = async (data: JwtPayload) => {
  const { role, id } = data;

  if (role === 'admin') {
    const result = await prisma.order.findMany({});
    return result;
  } else if (role === 'customer') {
    const result = await prisma.order.findMany({
      where: {
        userId: id,
      },
    });
    return result;
  }
};

export const OrderService = {
  createOrder,
  getAllOrder,
};
