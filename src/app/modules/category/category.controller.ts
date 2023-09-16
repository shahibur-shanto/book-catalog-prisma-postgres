import { Category } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

const insertIntoDB = catchAsync(
  async (req: Request, res: Response): Promise<Category> => {
    const result = await CategoryService.insertIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category Created Successfully',
      data: result,
    });
    return result;
  }
);

const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategory();
  sendResponse<Category[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Category fetch Successfully',
    meta: result.meta,
    data: result.data,
  });
  return result;
});

const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getSingleCategory(req.params.id);
  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Category Fetch Successfully',
    data: result,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.updateCategory(req.params.id, req.body);
  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Updated Successfully',
    data: result,
  });
  return result;
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.deleteCategory(req.params.id);
  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category Deleted Successfully',
    data: result,
  });
  return result;
});

export const CategoryController = {
  insertIntoDB,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
