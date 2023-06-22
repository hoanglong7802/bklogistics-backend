const express = require('express');

exports.getNotification = async (req, res) => {
    try {
        
        const message = "OK";

        req.app.io.emit('message', message);

        res.json({message: message});

          
    }
    catch (err) {
        res.status(500).json({ error: "Unable to get notification"});
    }
}
