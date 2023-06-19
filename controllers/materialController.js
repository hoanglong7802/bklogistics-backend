const Material = require('../models/materialModel');

// Create a new material
exports.createMaterial = async (req, res, next) => {
  try {
    const { name} = req.body;

    const material = new Material({
      name,
      unit,
    });

    const createdMaterial = await material.save();

    res.status(201).json(createdMaterial);
  } catch (error) {
    next(error);
  }
};

// Get all materials
exports.getAllMaterials = async (req, res, next) => {
  try {
    const materials = await Material.find().exec();

    res.json(materials);
  } catch (error) {
    next(error);
  }
};

exports.getMaterials = async (req, res, next) => {
  try {
    let query = { ...req.query };

    delete query._id;

    if (Object.keys(query).length == 0) {
      query = {}
    }

    const materials = await Material.find(query).exec();

    res.json(materials);
  } catch (error) {
    next(error);
  }
};

// Get a specific material
exports.getMaterialById = async (req, res, next) => {
  try {
    const materialId = req.params.id;
    const material = await Material.findById(materialId);

    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }

    res.json(material);
  } catch (error) {
    next(error);
  }
};

// Update a material
exports.updateMaterial = async (req, res, next) => {
  try {
    const materialId = req.params.id;
    const { name} = req.body;

    const updatedMaterial = await Material.findByIdAndUpdate(
      materialId,
      { name},
      { new: true }
    );

    if (!updatedMaterial) {
      return res.status(404).json({ error: 'Material not found' });
    }

    res.json(updatedMaterial);
  } catch (error) {
    next(error);
  }
};

// Delete a material
exports.deleteMaterial = async (req, res, next) => {
  try {
    const materialId = req.params.id;

    const deletedMaterial = await Material.findByIdAndDelete(materialId);

    if (!deletedMaterial) {
      return res.status(404).json({ error: 'Material not found' });
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
