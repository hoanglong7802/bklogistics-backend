const Shipment = require('../models/shipmentModel');

// Create a new shipment
exports.createShipment = async (req, res, next) => {
  try {
    const { orderId, sender, carrier, receiver, pickup_date, delivery_date , status } = req.body;

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
    req.io.emit("message_created_shipment", "Shipment is successfully created!");
    res.status(201).json(createdShipment);
  } catch (error) {
    next(error);
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
      return res.status(404).json({ error: 'Shipment not found' });
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
    const { orderId, sender, carrier, receiver, pickup_date, delivery_date , status} = req.body;

    if (status !== await Order.findById(orderId).status) {
      req.io.emit("message_changed_status_shipment", "Status of shipment changed!");
    } 

    const updatedShipment = await Shipment.findByIdAndUpdate(
      shipmentId,
      {  orderId, sender, carrier, receiver, pickup_date, delivery_date , status },
      { new: true }
    );

    if (!updatedShipment) {
      return res.status(404).json({ error: 'Shipment not found' });
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
      return res.status(404).json({ error: 'Shipment not found' });
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
