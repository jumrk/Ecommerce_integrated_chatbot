const express = require("express");
const Router = express.Router();
const { handleChat } = require('../controller/chatbot/chatbotController.js');

Router.post('/', handleChat)

module.exports = Router