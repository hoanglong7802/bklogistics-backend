const Order = require('../models/orderModel');

// Create a new order
exports.createOrder = async (req, res, next) => {
  try {
    const { productId, suppliers, manufacturers, address, status } = req.body;

    // Check caller's role (implement your role checking logic here)

    const order = new Order({
      suppliers,
      manufacturers,
      address,
      status
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

// Get all orders
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().exec();

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// Get order details by ID
exports.getOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

// Get orders by suppliers, manufacturers, or address
exports.getOrders = async (req, res, next) => {
  try {
    const { suppliers, manufacturers, address } = req.query;

    const query = {};

    if (suppliers) {
      query.suppliers = suppliers;
    }

    if (manufacturers) {
      query.manufacturers = manufacturers;
    }

    if (address) {
      query.address = address;
    }

    const orders = await Order.find(query);

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// Get orders by date
exports.getOrdersByDate = async (req, res, next) => {
  try {
    const startDate = new Date(req.query.startDate);
    const endDate = new Date(req.query.endDate);
    const orders = await Order.find({ createdDate: { $gte: startDate, $lte: endDate } });

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// Get orders by status
exports.getOrdersByStatus = async (req, res, next) => {
  try {
    const status = req.query.status;
    const orders = await Order.find({ status });

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// Update an order
exports.updateOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const {suppliers, manufacturers, address, status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {suppliers, manufacturers, address, status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

// Delete an order
exports.deleteOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
