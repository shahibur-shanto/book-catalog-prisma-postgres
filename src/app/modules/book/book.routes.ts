import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookController } from './book.controller';

const router = express.Router();

router.post(
  '/books/create-book',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  BookController.insertIntoDB
);
router.get('/books', BookController.getAllBook);
router.get('/books/:id', BookController.getSingleBook);
router.patch(
  '/books/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  BookController.updateBook
);
router.delete(
  '/books/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  BookController.deleteBook
);
router.get('/books/:id/category', BookController.bookByCategoryId);

export const BookRoutes = router;
