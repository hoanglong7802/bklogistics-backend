const express = require("express");
const requestController = require("../controllers/requestController");
const router = express.Router();

router.post("/", requestController.post);
router.get("/", requestController.get);
router.put("/update/:id", requestController.updateStatus);

module.exports = router;
