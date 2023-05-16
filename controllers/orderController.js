const Order = require('../models/orderModel');

// Create a new order
exports.createOrder = async (req, res, next) => {
  try {
    const { productId, supplierAddress, manufacturerAddress } = req.body;

    // Check caller's role (implement your role checking logic here)

    const order = new Order({
      productId,
      supplierAddress,
      manufacturerAddress,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

// Get order details
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

// Manage order (cancel or confirm)
exports.manageOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    // Check caller's role and validate the confirm action (implement your role and validation logic here)

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};


// Update an order
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the order' });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndRemove(req.params.id);
    if (order) {
      res.status(200).json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the order' });
  }
};
``
