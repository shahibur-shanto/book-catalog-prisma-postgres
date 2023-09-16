import { Book, Prisma, PrismaClient } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { BookSearchAbleFields } from './book.constants';
import { IBookFilterRequest } from './book.interface';

const prisma = new PrismaClient();

const insertIntoDB = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};

const getAllBook = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  let { totalPage } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditons = [];

  if (searchTerm) {
    andConditons.push({
      OR: BookSearchAbleFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditons.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditons: Prisma.BookWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};

  const result = await prisma.book.findMany({
    where: whereConditons,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : { publicationDate: 'asc' },
    skip,
    take: limit,

    include: {
      category: true,
    },
  });
  const total = await prisma.book.count();
  totalPage = Math.ceil(total / limit);
  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};
export const BookService = {
  insertIntoDB,
  getAllBook,
};
