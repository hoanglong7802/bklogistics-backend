require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const swaggerConfig = require("./swagger");

const notificationController = require("./controllers/notificationController");

const profileRouter = require("./routers/profileRouter");
const orderRouter = require("./routers/orderRouter");
const productRouter = require("./routers/productRouter");
const materialRouter = require("./routers/materialRouter");
const shipmentRouter = require("./routers/shipmentRouter");
const notificationRouter = require("./routers/notificationRouter");
const orderStakeholderRouter = require("./routers/orderStakeholderRouter");
const requiredMaterialRouter = require("./routers/requiredMaterialRouter");
const requestRouter = require("./routers/requestRouter");
const _authRouter = require("./_auth/_auth.router");
const updateRouter = require("./routers/updateRouter");
const {
	updateProductOnChain,
	updateMaterialOnChain,
} = require("./controllers/updateController");
var cron = require("node-cron");
// Create Express app
const app = express();
const server = http.createServer(app);
var cors = require("cors");
const io = new Server(server);

// Parser
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use((req, res, next) => {
	req.io = io;
	next();
});

app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

cron.schedule("0 0 */3 * * *", async () => {
	console.log("Updating onchain data...");
	await updateProductOnChain();
	await updateMaterialOnChain();
	await updateOrderOnchain();
});

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

// Parse JSON bodies
app.use(express.json());
app.use(cors());

io.on("connection", (socket) => {
	console.log("A client connected");
	// Handle disconnect event
	socket.on("hi", (data) => {
		console.log("Data received from client:", data);

		// Emit a response event back to the client
		socket.emit("responseEvent", "Server says hello!");
	});
	notificationController.getNotification(socket);
	socket.on("disconnect", () => {
		console.log("A client disconnected");
	});
});

// Mount router for '/api' routes
app.use("/api/profiles", profileRouter);
app.use("/api/orders", orderRouter);
app.use("/api/products", productRouter);
app.use("/api/materials", materialRouter);
app.use("/api/shipments", shipmentRouter);
app.use("/api/notis", notificationRouter);
app.use("/api/order-stakeholder", orderStakeholderRouter);
app.use("/api/required-material", requiredMaterialRouter);
app.use("/api/request", requestRouter);
app.use("/api/auth", _authRouter);
app.use("/api/update", updateRouter);
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

//This endpoint is for testing push notification

app.get("/orders", (req, res) => {
	res.sendFile(__dirname + "/order_client.html");
});

// Error handling middleware
app.use(async (err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ error: "Internal Server Error" });
});

swaggerConfig(app);

io.on("connection", (socket) => {
	console.log("A client connected");
	// Handle disconnect event
	socket.on("hi", (data) => {
		console.log("Data received from client:", data);

		// Emit a response event back to the client
		socket.emit("responseEvent", "Server says hello!");
	});
	socket.on("disconnect", () => {
		console.log("A client disconnected");
	});
});

// Start the server
PORT = 3001;
server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
