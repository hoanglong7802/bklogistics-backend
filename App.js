const express = require('express');
const mongoose = require('mongoose');
const http = require("http");
const socketIO = require('socket.io');
const swaggerConfig = require('./swagger');

const profileRouter = require('./routers/profileRouter');
const orderRouter = require('./routers/orderRouter');
const productRouter = require('./routers/productRouter');
const materialRouter = require('./routers/materialRouter');
const shipmentRouter = require('./routers/shipmentRouter');
const notificationRouter = require('./routers/notificationRouter');

// Create Express app
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Connect to MongoDB
mongoose.connect('mongodb+srv://phamlong:12112002@cluster1.pphau.mongodb.net/logistics?retryWrites=true&w=majority', { 
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
app.use('/api/profiles', profileRouter);
app.use('/api/orders', orderRouter);
app.use('/api/products', productRouter);
app.use('/api/materials', materialRouter);
app.use('/api/shipments', shipmentRouter);
app.use('/api/notis', notificationRouter);

// Error handling middleware
app.use(async (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

swaggerConfig(app);

io.on('connection', (socket) => {
  console.log('A client connected');

  // Handle disconnect event
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
