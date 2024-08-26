// server.js

// Importing the modules 
const express = require("express");
const path = require("path");
const app = express();
const booksRoute = require("./route/books.route");

app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

//Adding port
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`This page is listening on this Port ${PORT}...`);
});

app.use("/books", booksRoute);
