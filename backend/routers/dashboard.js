const express = require("express");
const Router = express.Router();
const { getAdminStats,getRecentOrders } = require("../controller/dashboard/dashboardController");
Router.get('/getAdminStats', getAdminStats)
Router.get('/getRecentOrders',getRecentOrders)
module.exports = Router