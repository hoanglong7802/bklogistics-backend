const express = require("express");
const notificationController = require("../controllers.notificationController");

const router = express.Router();

router.get("/", notificationController.getNotification);

module.exports = router;