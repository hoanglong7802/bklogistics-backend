const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routers/userRouter');
const orderRouter = require('./routers/orderRouter');
const productRouter = require('./routers/productRouter');

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
app.use('/api/routers', productRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});


// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
