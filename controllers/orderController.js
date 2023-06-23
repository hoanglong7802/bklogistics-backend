const Order = require('../models/orderModel');

// Create a new order
exports.createOrder = async (req, res, next) => {
  try {
    const {product_id, created_date, is_paid, deposit_amount, customer_address, status} = req.body;

    // Check caller's role (implement your role checking logic here)

    const order = new Order({
      product_id, 
      created_date, 
      is_paid, 
      deposit_amount, 
      customer_address, 
      status,
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

// Manage order (cancel or confirm)
exports.manageOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;


    const allowedStatus = [0, 1, 2, 3, 4, 5];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

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


// Get orders by suppliers, manufacturers, or address
exports.getOrders = async (req, res, next) => {
  try {
    const { product_id, created_date, is_paid, deposit_amount, customer_address, status } = req.query;

    const query = {};

    if (product_id) {
      query.product_id = product_id;
    }

    if (created_date) {
      query.created_date = created_date;
    }

    if (is_paid) {
      query.is_paid = is_paid;
    }

    if (deposit_amount) {
      query.deposit_amount = deposit_amount;
    }

    if (customer_address) {
      query.customer_address = customer_address;
    }

    if (status) {
      query.status = status;
    }
    console.log(query);
    const orders = await Order.find(query).exec();

    req.io.emit("message_order", "Order get completed");
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
