import { PrismaClient, User } from '@prisma/client';
import { IGenericResponse } from '../../../interfaces/common';

const prisma = new PrismaClient();

const insertIntoDB = async (data: User): Promise<Partial<User>> => {
  const result = await prisma.user.create({
    data,
    select: {
      password: false,
      id: true,
      name: true,
      email: true,
      contactNo: true,
      role: true,
      address: true,
      profileImg: true,
    },
  });
  return result;
};

const getAllUser = async (): Promise<
  IGenericResponse<Omit<User, 'password'>[]>
> => {
  const result = await prisma.user.findMany({
    select: {
      password: false,
      id: true,
      name: true,
      email: true,
      contactNo: true,
      role: true,
      address: true,
      profileImg: true,
    },
  });

  const total = await prisma.user.count();

  return {
    meta: {
      total: total,
      page: 1,
      limit: 10,
    },
    data: result,
  };
};

const getUserById = async (id: string): Promise<Partial<User | null>> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      password: false,
      id: true,
      name: true,
      email: true,
      contactNo: true,
      role: true,
      address: true,
      profileImg: true,
    },
  });
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<User>
): Promise<User> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

const userProfile = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const UserService = {
  insertIntoDB,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  userProfile,
};
