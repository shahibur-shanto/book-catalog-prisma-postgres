import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.post('/books/create-book', BookController.insertIntoDB);
router.get('/books', BookController.getAllBook);
router.get('/books/:id/category', BookController.bookByCategoryId);

export const BookRoutes = router;
