const express = require('express');

exports.getNotification = async (req, res) => {
    try {
        const books = [
            { title: 'Book 1', author: 'Author 1' },
            { title: 'Book 2', author: 'Author 2' },
            { title: 'Book 3', author: 'Author 3' },
          ];
        
          const booksJson = JSON.stringify(books, null, 2);

          res.setHeader('Content-Type', 'application/json');

          res.send(booksJson);

          req.io.emit('bookListUpdated', books);
    }
    catch (err) {
        res.status(500).json({ error: "Unable to get notification"});
    }
}
