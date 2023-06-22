const express = require('express');
const OrderStakeholder = require('../models/orderStakeholderModel');


exports.createOrderStakeholder = async (req, res, next) => {
    try {
        const {
            address, 
            role,
            supplier_material,
            manufacturer_product,
            order_id
        } = req.body;

        const orderStakeholder = new OrderStakeholder({
            address, 
            role,
            supplier_material,
            manufacturer_product,
            order_id
        });

        const createdOrderStakeholder = await OrderStakeholder.save();

        if (!createdOrderStakeholder) {
            return res.status(400).json({error: "Unable to create order-stakeholder"})
        }

        res.json(createdOrderStakeholder);
    }
    catch (error) {
        next(error);
    }
}

exports.getOrderStakeholder = async (req, res, next) => {
    try {
        const {
            address, 
            role,
            supplier_material,
            manufacturer_product,
            order_id
        } = req.body;

        const query = {};

        if (address) {
            query.address = address;
        }

        if (role) {
            query.role = role;
        }

        if (supplier_material) {
            query.supplier_material = supplier_material;
        }

        if (manufacturer_product) {
            query.manufacturer_product = manufacturer_product;
        }

        const orderStakeholders = await OrderStakeholder.find(query);

        res.json(orderStakeholders);
    }
    catch (error) {
        next(error);
    }
}

exports.getOrderStakeholderById = async (req, res, next) => {
    try {
        const id = req.params.id;
        
        const orderStakeholder = await OrderStakeholder.findById(id);

        res.json(orderStakeholder);
    }
    catch (error) {
        next(error);
    }
}

exports.updateOrderStakeholder = async (req, res, next) => {
    try {

        const id = req.params.id;

        const {
            address, 
            role,
            supplier_material,
            manufacturer_product,
            order_id
        } = req.body;

        const updatedOrderStakeholder = await OrderStakeholder.findByIdAndUpdate(
            id,
            {
                address, 
                role,
                supplier_material,
                manufacturer_product,
                order_id
            },
            {new: true}
        );

        if (!updatedOrderStakeholder) {
            return res.status(404).json({error: "Order-Stakeholder not found"});
        }

        res.json(updatedOrderStakeholder);
    }
    catch (error) {
        next(error);
    }
}

exports.deleteOrderStakeholder = async (req, res, next) => {
    try {
        const id = req.params.id;
        
        const deletedOrderStakeholder = await OrderStakeholder.findByIdAndDelete(id);

        if (!deletedOrderStakeholder) {
            return res.status(404).json({ error: "Order-Stakeholder not found" });
          }

        res.json(deletedOrderStakeholder);
    }
    catch (error) {
        next(error);
    }
}
