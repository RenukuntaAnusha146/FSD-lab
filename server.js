const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
    {
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho",
        price: 299
    },
    {
        id: 2,
        title: "Wings of Fire",
        author: "A.P.J. Abdul Kalam",
        price: 250
    }
];

// GET all books
app.get("/books", (req, res) => {
    res.json(books);
});

// GET book by ID
app.get("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
});

// POST a new book
app.post("/books", (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price
    };

    books.push(newBook);

    res.status(201).json(newBook);
});

// PUT update a book
app.put("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    book.title = req.body.title;
    book.author = req.body.author;
    book.price = req.body.price;

    res.json(book);
});

// DELETE a book
app.delete("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    const deletedBook = books.splice(index, 1);

    res.json({
        message: "Book deleted successfully",
        book: deletedBook[0]
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});