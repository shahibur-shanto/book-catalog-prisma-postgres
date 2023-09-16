import { Book } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { BookFilterAbleFileds } from './book.constants';
import { BookService } from './book.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.insertIntoDB(req.body);
  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Created Successfully',
    data: result,
  });
  return result;
});

const getAllBook = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BookFilterAbleFileds);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await BookService.getAllBook(filters, options);

  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Book Fetch Successfully',
    meta: result.meta,
    data: result.data,
  });
  return result;
});

export const BookController = {
  insertIntoDB,
  getAllBook,
};
