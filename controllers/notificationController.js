const express = require('express');

exports.getNotification = async (socket) => {
    try {      
        const message = "OK";
        await socket.emit("message", message); 
        res.json({notification: "Success"});     
    }
    catch (err) {
        res.status(500).json({ error: "Unable to get notification"});
    }
}
