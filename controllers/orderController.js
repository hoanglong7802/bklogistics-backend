const Order = require("../models/orderModel");
const { ProductContractABI } = require("../contract/abis/ProducContractABI");
const { SupplyChainABI } = require("../contract/abis/SupplyChainABI");
const addressController = require("../contract/addresses/address");
const { ethers } = require("ethers");
// Create a new order
exports.createOrder = async (req, res, next) => {
  try {
    const {
      product_id,
      created_date,
      is_paid,
      deposit_amount,
      customer_address,
      status,
    } = req.body;

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

    req.io.emit("message_created_order", "Order is created successfully!");
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
      return res.status(404).json({ error: "Order not found" });
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
    //['PENDING', 'SUPPLIED', 'DELIVERING', 'SUCCESS', 'FAILED', 'CANCELLED']
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    if (status === 1) {
      req.io.emit("message_confirmed_order", "Order confirmed!");
    }
    if (status !== (await Order.findById(orderId).status)) {
      req.io.emit("message_changed_status_order", "Status of order changed!");
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

// Get orders by suppliers, manufacturers, or address
exports.getOrders = async (req, res, next) => {
  try {
    const {
      product_id,
      created_date,
      is_paid,
      deposit_amount,
      customer_address,
      status,
    } = req.query;

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
    const { suppliers, manufacturers, address, status } = req.body;

    if (status !== await Order.findById(orderId).status) {
      req.io.emit("message_changed_status_order", "Status of order changed!");
    } 

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { suppliers, manufacturers, address, status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
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
      return res.status(404).json({ error: "Order not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

exports.getAllOrdersOnChainByAddress = async (req, res) => {
  const chainId = Number(req.params.chainId);
  const address = String(req.params.address);
  const addresses = addressController.getNetworkAddress(chainId);
  let materialCounter;
  let orders = [];
  let suppliers;
  let manufacturers;
  // try {
  const provider = new ethers.AlchemyProvider(
    chainId,
    `${process.env.GOERLI_PRIVATE_KEY}`
  );
  const signer = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);

  const supplyChainContract = new ethers.Contract(
    addresses.SUPPLY_CHAIN_CONTRACT_ADDRESS,
    SupplyChainABI,
    signer
  );

  orderCounter = Number(await supplyChainContract.orderCounter());

  for (var i = 1; i <= orderCounter; i++) {
    suppliers = [];
    manufacturers = [];
    const response = await supplyChainContract.viewOrder(i);
    if (Number(response[0]) == 0) continue;
    response[3].map((i) => suppliers.push(String(i)));
    response[4].map((i) => manufacturers.push(String(i)));
    let order = {
      order_id: Number(response[0]),
      product_id: Number(response[1]),
      created_date: new Date(Number(response[5]) * 1000),
      status: Number(response[6]),
      is_paid: Number(response[7]),
      deposit_amount: ethers.formatEther(Number(response[8])),
      customer_address: response[2],
      chainId: Number(req.params.chainId),
      suppliers_address: suppliers,
      manufacturers_address: manufacturers,
    };
    // console.log(order);
    orders.push(order);
  }
  console.log(orders);
  // await Order.deleteMany({});
  const response = orders.filter((order) => {
    // const newOrder = new Order(order);
    return (
      order.customer_address === address ||
      order.manufacturers_address.indexOf(address) !== -1 ||
      order.suppliers_address.indexOf(address) !== -1
    );
    // await newOrder.save();
  });
  // const response = await Order.find({ chainId: chainId }).or([
  //   { customer_address: address },
  //   { suppliers_address: address },
  //   { manufacturers_address: address },
  // ]);
  return res.status(200).json({
    message: "Successful",
    path: `/${chainId}/${address}`,
    timestamp: Date.now(),
    data: response,
  });
  // } catch (err) {
  //   return res.status(500).json({
  //     message: "Failed",
  //     path: `/${chainId}/${address}`,
  //     timestamp: Date.now(),
  //     error: err,
  //   });
  // }
};
