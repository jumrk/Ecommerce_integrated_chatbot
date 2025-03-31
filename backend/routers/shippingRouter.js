const express = require("express");
const { createShipping, getAllShippings, getShippingById, updateShipping, deleteShipping } = require("../controller/shipping/ShippingMethodController");

const router = express.Router();

router.post("/create-shipping", createShipping);
router.get("/", getAllShippings);
router.get("/:id", getShippingById);
router.put("/update-shipping/:id", updateShipping);
router.delete("/delete-shipping/:id", deleteShipping);

module.exports = router;
