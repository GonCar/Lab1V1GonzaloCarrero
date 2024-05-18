const express = require('express');
const app = express();
const PORT = 8080;

const { db, getBooks, getBookByName } = require("./database");

//Routes
app.get("/", (req, res)=> {
    res.send("Welcome to the store!");
});

app.get('/books', (req, res) => {
    getBooks((err, books) => {
        if (err) {
            res.status(500).json({ error: 'Error retrieving books' });
        } else {
            res.json(books);
        }
    });
});

// Route to get a book by its name
app.get('/books/:name', (req, res) => {
    const name = req.params.name;
    getBookByName(name, (err, book) => {
        if (err) {
            res.status(500).json({ error: 'Error retrieving book' });
        } else if (!book) {
            res.status(404).json({ error: 'Book not found' });
        } else {
            res.json(book);
        }
    });
});

//PORT
app.listen(PORT, () => {
    console.log("Server active on port: " + PORT);
})