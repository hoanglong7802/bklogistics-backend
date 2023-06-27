const express = require('express');

exports.getNotification = async (socket) => {
    try {      
        const message = "OK";
        socket.emit("message", message);   
    }
    catch (err) {
        res.status(500).json({ error: "Unable to get notification"});
    }
}



