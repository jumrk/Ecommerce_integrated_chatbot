const express = require('express');
const router = express.Router();
const shippingConfigController = require('../controller/shipping/ShippingMethodController');

router.get('/', shippingConfigController.getShippingConfig);
router.post('/', shippingConfigController.createShippingConfig);
router.put('/', shippingConfigController.updateShippingConfig);
router.delete('/', shippingConfigController.deleteShippingConfig);

module.exports = router;