const faker = require('faker');
const Material = require('./models/materialModel');
const Product = require('./models/productModel');
const Shipment = require('./models/shipmentModel');
const Profile = require('./models/profileModel');
const Order = require('./models/orderModel');

// Function to generate fake orders
const generateFakeOrders = async (count) => {
    const orders = [];
  
    for (let i = 0; i < count; i++) {
      const productId = faker.random.number();
      const supplierAddress = faker.address.streetAddress();
      const manufacturerAddress = faker.address.streetAddress();
      const status = faker.random.arrayElement(['PENDING', 'SUPPLIED', 'DELIVERING', 'SUCCESS', 'FAILED', 'CANCELLED']);
  
      const order = new Order({
        productId,
        supplierAddress,
        manufacturerAddress,
        status
      });
  
      orders.push(order);
    }
  
    await Order.insertMany(orders);
    console.log(`${count} fake orders created.`);
  };
  

// Function to generate fake materials
const generateFakeMaterials = async (count) => {
  const materials = [];

  for (let i = 0; i < count; i++) {
    const name = faker.commerce.productName();
    const unit = faker.random.arrayElement(['kg', 'm', 'cái']);

    const material = new Material({
      name,
      unit
    });

    materials.push(material);
  }

  await Material.insertMany(materials);
  console.log(`${count} fake materials created.`);
};

// Function to generate fake products
const generateFakeProducts = async (count) => {
  const products = [];

  for (let i = 0; i < count; i++) {
    const name = faker.commerce.productName();
    const price = faker.commerce.price();
    const unit = faker.random.arrayElement(['kg', 'm'])

    const product = new Product({
      name,
      price
    });

    products.push(product);
  }

  await Product.insertMany(products);
  console.log(`${count} fake products created.`);
};

// Function to generate fake shipments
const generateFakeShipments = async (count) => {
  const shipments = [];

  for (let i = 0; i < count; i++) {
    const orderId = faker.random.number();
    const sender = faker.address.streetAddress();
    const carrier = faker.address.streetAddress();
    const receiver = faker.address.streetAddress();
    const pickupDate = faker.date.future();
    const deliveryDate = faker.date.future();
    const status = faker.random.arrayElement(['NOT_STARTED', 'IN_PROGRESS', 'DELIVERED']);

    const shipment = new Shipment({
      orderId,
      sender,
      carrier,
      receiver,
      pickupDate,
      deliveryDate,
      status
    });

    shipments.push(shipment);
  }

  await Shipment.insertMany(shipments);
  console.log(`${count} fake shipments created.`);
};

// Function to generate fake profiles
const generateFakeProfiles = async (count) => {
  const profiles = [];

  for (let i = 0; i < count; i++) {
    const address = faker.address.streetAddress();
    const name = faker.name.findName();
    const isMember = faker.random.boolean();
    const mail = faker.internet.email();
    const registerDate = faker.date.past();
    const materialSupply = [faker.random.number(), faker.random.number()];
    const productManufacture = [faker.random.number(), faker.random.number()];

    const profile = new Profile({
      address,
      name,
      isMember,
      mail,
      registerDate,
      materialSupply,
      productManufacture
    });

    profiles.push(profile);
  }

  await Profile.insertMany(profiles);
  console.log(`${count} fake profiles created.`);
};

// Usage: Generate fake data for each model
generateFakeMaterials(10);
generateFakeProducts(10);
generateFakeShipments(10);
generateFakeProfiles(10);
generateFakeOrders(10);
