const Product = require('../models/productModel');
const mongoose = require('mongoose');

// Create a new product
exports.createProduct = async (req, res, next) => {
  try {
    const { name, required_material, description } = req.body;

    const product = new Product({
      name,
      required_material,
      description,
    });

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.send(error);
    next(error);
  }
};

// Get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().exec();

    res.json(products);
  } catch (error) {
    next(error);
  }
};

// Get a specific product
exports.getProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid product ID'});
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};


exports.getProducts = async (req, res, next) => {
  try {
    const { name, required_material, description } = req.query;
    let query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (required_material) {
      query.material = { $in: [material] };
    }

    if (description) {
      query.description = { $regex: description, $options: 'i' };
    }

    const products = await Product.find(query).exec();

    res.json(products);
  } catch (error) {
    next(error);
  }
};


// Update a product
exports.updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const { name, required_material, description } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, required_material, description },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// Delete a product
exports.deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
