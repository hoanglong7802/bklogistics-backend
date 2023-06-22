require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const socketIO = require("socket.io");
const swaggerConfig = require("./swagger");

const profileRouter = require("./routers/profileRouter");
const orderRouter = require("./routers/orderRouter");
const productRouter = require("./routers/productRouter");
const materialRouter = require("./routers/materialRouter");
const shipmentRouter = require("./routers/shipmentRouter");
const notificationRouter = require("./routers/notificationRouter");
const requestRouter = require("./routers/requestRouter");
const _authRouter = require("./_auth/_auth.router");

// Create Express app
const app = express();
const server = http.createServer(app);
var cors = require("cors");
const io = socketIO(server);

// Parser
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

app.get("/", (req, res) => {
	res.send("Welcome to the API");
});

// Parse JSON bodies
app.use(express.json());

// Mount router for '/api' routes
app.use("/api/profiles", profileRouter);
app.use("/api/orders", orderRouter);
app.use("/api/products", productRouter);
app.use("/api/materials", materialRouter);
app.use("/api/shipments", shipmentRouter);
app.use("/api/notis", notificationRouter);
app.use("/api/request", requestRouter);
app.use("/api/auth", _authRouter);

// Error handling middleware
app.use(async (err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: "Internal Server Error" });
});

swaggerConfig(app);

io.on("connection", (socket) => {
	console.log("A client connected");

  // Handle disconnect event
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

// Start the server
PORT = 3001;
server.listen(PORT, () => {
	console.log("Server is running on http://localhost:3000");
});
