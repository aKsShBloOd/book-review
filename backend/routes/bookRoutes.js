import express from 'express';
import { getBooks, getBookById, createBook, updateBook, deleteBook } from '../controllers/bookCntrls.js';


const router = express.Router();

router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.post('/books/create', createBook);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

export default router;