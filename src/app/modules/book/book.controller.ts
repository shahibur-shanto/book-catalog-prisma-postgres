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

const bookByCategoryId = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await BookService.bookByCategoryId(req.params.id, options);
  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books with associated category data fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getSingleBook(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book fetched successfully',
    data: result,
  });
});

const updateBook = catchAsync(async(req:Request,res:Response)=>{
  const result = await BookService.updateBook(req.params.id,req.body);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Book Update Successfully",
    data:result 
  })
  return result;
})


const deleteBook = catchAsync(async(req:Request,res:Response)=>{
  const result = await BookService.deleteBook(req.params.id);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Book Deleted Successfully",
    data:result
  })
  return result;
})

export const BookController = {
  insertIntoDB,
  getAllBook,
  bookByCategoryId,
  getSingleBook,
  updateBook,
  deleteBook
};
