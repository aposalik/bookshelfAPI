const express = require("express");
const booksRoute = express.Router();

//array of books
const books = [
    {id:0,title:"Atomic Habit",year:2022},
    {id:1,title:"Poor dad rech dad",year:2021},
    {id:2,title:"You can win",year:2020},
];

//Get response
booksRoute.get("/",(req,res)=>{
    res.json(books);
});

booksRoute.get("/:booksID",(req,res)=>{
    const booksID = Number(req.params.booksID);
    const book = books.find(f => f.id === booksID);

    if(book){res.json(book)}else
    {res.status(404).send("The page couln't Find 404 error")};
});

//POST function
booksRoute.post("/",(req,res)=>{
    if(!req.body.title){return res.status(400).json({error: "Missing Book name"})};
    const newBooks = {
        id: books.length,
        title: req.body.title,
        year: req.body.year
    };
    books.push(newBooks);
    res.json(newBooks);
})

// DELETE function 
booksRoute.delete("/:booksID", (req, res)=>{
    const booksID = Number(req.params.booksID);
    const bookIndex = books.findIndex(f => f.id === booksID);

    if(bookIndex !== -1){
        const deletBook = books.splice(bookIndex,1)
        res.json({message: "Book deleted succesfuly", book: deletBook[0]});
    }else{res.status(404).send("We couln't find the book")}
});



module.exports = booksRoute;