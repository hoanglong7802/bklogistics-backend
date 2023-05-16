const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routers/userRouter');
const orderRouter = require('./routers/orderRouter');

// Create Express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});
const db = mongoose.connection;

app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// Parse JSON bodies
app.use(express.json());

// Mount router for '/api' routes
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
