import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.post('/books/create-book', BookController.insertIntoDB);
router.get('/books', BookController.getAllBook);

export const BookRoutes = router;
 