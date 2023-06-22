const express = require('express');
const RequiredMaterial = require('../models/requiredMaterialModel');

exports.createRequiredMaterial = async (req, res, next) => {
    try {
        const {
            material_id,
            product_id,
            quantity,
            unit,
        } = req.body;

        const requiredMaterial = new RequiredMaterial({
            material_id,
            product_id,
            quantity,
            unit,
        });

        const createdRequiredMaterial = await RequiredMaterial.save();

        if (!createdRequiredMaterial) {
            return res.status(400).json({error: "Unable to create required material"})
        }

        res.json(createdRequiredMaterial);
    }
    catch (error) {
        next(error);
    }
}

exports.getRequiredMaterial = async (req, res, next) => {
    try {
        const {
            material_id,
            product_id,
            quantity,
            unit,
        } = req.body;

        const query = {};

        if (material_id) {
            query.material_id = material_id;
        }

        if (product_id) {
            query.product_id = product_id;
        }

        if (unit) {
            query.unit = unit;
        }

        const requiredMaterials = await RequiredMaterial.find(query);

        res.json(requiredMaterials);
    }
    catch (error) {
        next(error);
    }
}

exports.getRequiredMaterialById = async (req, res, next) => {
    try {
        const id = req.params.id;
        
        const requiredMaterial = await RequiredMaterial.findById(id);

        res.json(requiredMaterial);
    }
    catch (error) {
        next(error);
    }
}

exports.updateRequiredMaterial = async (req, res, next) => {
    try {

        const id = req.params.id;

        const {
            material_id,
            product_id,
            quantity,
            unit,
        } = req.body;

        const updatedRequiredMaterial = await RequiredMaterial.findByIdAndUpdate(
            id,
            {
                material_id,
                product_id,
                quantity,
                unit,
            },
            {new: true}
        );

        if (!updatedRequiredMaterial) {
            return res.status(404).json({error: "Required material not found"});
        }

        res.json(updatedRequiredMaterial);
    }
    catch (error) {
        next(error);
    }
}

exports.deleteRequiredMaterial = async (req, res, next) => {
    try {
        const id = req.params.id;
        
        const deletedRequiredMaterial = await RequiredMaterial.findByIdAndDelete(id);

        if (!deletedRequiredMaterial) {
            return res.status(404).json({ error: 'Required material not found' });
        }

        res.json(deletedRequiredMaterial);
    }
    catch (error) {
        next(error);
    }
}
