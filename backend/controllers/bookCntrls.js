import { db } from '../config/db.js';

export const getBooks = async (req, res) => {
    try {
        const books = await db`SELECT * FROM books ORDER BY id DESC`;
        console.log(books.length + ' Books fetched successfully:');

        if (!Array.isArray(books) || books.length === 0) {
            return res.status(404).json({ message: 'No books found' });
        }

        res.status(200).json({ success: true, data: books });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await db`SELECT * FROM books WHERE id = ${id}`;
        console.log(`Book with ID ${id} fetched successfully:`, book);

        if (!Array.isArray(book) || book.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ success: true, data: book[0] });
    } catch (error) {
        console.error(`Error fetching book with ID ${id}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createBook = async (req, res) => {
    const { title, author, description, isbn, review, rating } = req.body;
    try {
        const newBook = await db`
            INSERT INTO books (title, author, description, isbn, review, rating) 
            VALUES (${title}, ${author}, ${description}, ${isbn}, ${review}, ${rating}) 
            RETURNING *`;

        console.log('Book created successfully:', newBook[0]);
        res.status(201).json({ success: true, data: newBook[0] });
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, description, isbn, review, rating } = req.body;

    const fields = [];
    const values = [];
    let index = 1;

    if (title !== undefined) {
        fields.push(`title = $${index++}`);
        values.push(title.trim());
    }
    if (author !== undefined) {
        fields.push(`author = $${index++}`);
        values.push(author.trim());
    }
    if (description !== undefined) {
        fields.push(`description = $${index++}`);
        values.push(description.trim());
    }
    if (isbn !== undefined) {
        fields.push(`isbn = $${index++}`);
        values.push(isbn.trim());
    }
    if (review !== undefined) {
        fields.push(`review = $${index++}`);
        values.push(review.trim());
    }
    if (rating !== undefined) {
        fields.push(`rating = $${index++}`);
        values.push(rating);
    }

    if (fields.length === 0) {
        return res.status(400).json({ message: 'No fields provided to update' });
    }

    // Add the id as the last value
    values.push(id);
    const idPlaceholder = `$${index}`; // Last placeholder for id

    const query = `
        UPDATE books
        SET ${fields.join(', ')}
        WHERE id = ${idPlaceholder}
        RETURNING *`;

    try {
        const updated = await db.query(query, values);

        if (!updated.length) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ success: true, data: updated[0] });
        //console.log(`Book with ID ${id} updated successfully:`, updated[0]);

    } catch (error) {
        console.error(`Error updating book with ID ${id}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await db`DELETE FROM books WHERE id = ${id} RETURNING *`;
        console.log(`Book with ID ${id} deleted successfully:`, deletedBook[0]);

        if (!Array.isArray(deletedBook) || deletedBook.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ success: true, message: 'Book Deleted Successfully' });
    } catch (error) {
        console.error(`Error deleting book with ID ${id}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
