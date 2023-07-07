const { ethers } = require("ethers");
const Shipment = require("../models/shipmentModel");
const addressController = require("../contract/addresses/address");
const { ShippingContractABI } = require("../contract/abis/ShippingContractABI");
// Create a new shipment
exports.createShipment = async (req, res, next) => {
  try {
    const {
      orderId,
      sender,
      carrier,
      receiver,
      pickup_date,
      delivery_date,
      status,
    } = req.body;

    const shipment = new Shipment({
      orderId,
      sender,
      carrier,
      receiver,
      pickup_date,
      delivery_date,
      status,
    });

    const createdShipment = await shipment.save();
    req.io.emit(
      "message_created_shipment",
      "Shipment is successfully created!"
    );
    res.status(201).json(createdShipment);
  } catch (error) {
    next(error);
  }
};

exports.createNewShipment = async (req, res) => {
  try {
    const { orderId, sender, carrier, receiver, chainId } = req.body;
    await Shipment.create({
      orderId,
      sender,
      carrier,
      receiver,
      chainId,
    });
    // req.io.emit("shipment_create_success", "1");
    res.status(201).json({
      orderId,
      sender,
      carrier,
      receiver,
      chainId,
    });
  } catch (error) {
    console.error(error);
  }
};

// Get all shipments
exports.getAllShipments = async (req, res, next) => {
  try {
    const shipments = await Shipment.find();

    res.json(shipments);
  } catch (error) {
    next(error);
  }
};

exports.getShipments = async (req, res, next) => {
  try {
    const query = { ...req.query };
    delete query._id;

    const shipments = await Shipment.find(query);

    res.json(shipments);
  } catch (error) {
    next(error);
  }
};

// Get a specific shipment
exports.getShipmentById = async (req, res, next) => {
  try {
    const shipmentId = req.params.id;
    const shipment = await Shipment.findById(shipmentId);

    if (!shipment) {
      return res.status(404).json({ error: "Shipment not found" });
    }

    res.json(shipment);
  } catch (error) {
    next(error);
  }
};

// Update a shipment
exports.updateShipment = async (req, res, next) => {
  try {
    const shipmentId = req.params.id;
    const {
      orderId,
      sender,
      carrier,
      receiver,
      pickup_date,
      delivery_date,
      status,
    } = req.body;

    if (status !== (await Order.findById(orderId).status)) {
      req.io.emit(
        "message_changed_status_shipment",
        "Status of shipment changed!"
      );
    }

    const updatedShipment = await Shipment.findByIdAndUpdate(
      shipmentId,
      {
        orderId,
        sender,
        carrier,
        receiver,
        pickup_date,
        delivery_date,
        status,
      },
      { new: true }
    );

    if (!updatedShipment) {
      return res.status(404).json({ error: "Shipment not found" });
    }

    res.json(updatedShipment);
  } catch (error) {
    next(error);
  }
};

// Delete a shipment
exports.deleteShipment = async (req, res, next) => {
  try {
    const shipmentId = req.params.id;

    const deletedShipment = await Shipment.findByIdAndDelete(shipmentId);

    if (!deletedShipment) {
      return res.status(404).json({ error: "Shipment not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

exports.getShipmentOnChain = async (req, res) => {
  const chainId = Number(req.params.chainId);
  const addresses = addressController.getNetworkAddress(chainId);
  let shipmentCounter;
  let shipments = [];
  try {
    const provider = new ethers.AlchemyProvider(
      chainId,
      `${process.env.GOERLI_PRIVATE_KEY}`
    );
    const signer = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);

    const shipmentContract = new ethers.Contract(
      addresses.SHIPMENT_CONTRACT_ADDRESS,
      ShippingContractABI,
      signer
    );
    shipmentCounter = Number(await shipmentContract.shipmentCounter());
    for (var i = 1; i <= shipmentCounter; i++) {}
  } catch (err) {
    return res.status(400).json({
      message: "Failed",
      path: "/onchain/material",
      timestamp: Date.now(),
      error: err,
    });
  }
};

exports.getShipmentOnChainByAddress = async (req, res) => {
  const chainId = Number(req.params.chainId);
  const address = String(req.params.address);
  try {
    const shipments = await Shipment.find().where({chainId: chainId});
    const response = shipments.filter((shipment) => {
      return (
        shipment.carrier === address ||
        shipment.receiver === address ||
        shipment.sender === address
      );
    });
    return res.status(200).json({
      message: "Successful",
      path: `/${chainId}/${address}`,
      timestamp: Date.now(),
      data: response,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed",
      path: `/${chainId}/${address}`,
      timestamp: Date.now(),
      error: err,
    });
  }
};
