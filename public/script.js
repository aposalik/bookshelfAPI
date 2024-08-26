// public/script.js

document.addEventListener('DOMContentLoaded', () => {
    const booksContainer = document.getElementById('books-container');
    const addBookForm = document.getElementById('add-book-form');

    // Fetch and display books
    function fetchBooks() {
        fetch('/books')
            .then(response => response.json())
            .then(books => {
                booksContainer.innerHTML = ''; // Clear previous content
                books.forEach(book => {
                    const bookElement = document.createElement('div');
                    bookElement.className = 'book-item';
                    bookElement.innerHTML = `
                        <strong>${book.title}</strong> (${book.year})
                        <button onclick="deleteBook(${book.id})">Delete</button>
                    `;
                    booksContainer.appendChild(bookElement);
                });
            });
    }

    // Handle form submission to add a new book
    addBookForm.addEventListener('submit', event => {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const year = document.getElementById('year').value;

        fetch('/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, year: parseInt(year) })
        })
        .then(response => response.json())
        .then(newBook => {
            fetchBooks(); // Refresh the list after adding a new book
            addBookForm.reset();
        })
        .catch(error => console.error('Error adding book:', error));
    });

    // Delete a book
    window.deleteBook = function (id) {
        fetch(`/books/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                fetchBooks(); // Refresh the list after deleting a book
            } else {
                console.error('Error deleting book');
            }
        })
        .catch(error => console.error('Error:', error));
    };

    // Initial fetch of books when the page loads
    fetchBooks();
});
