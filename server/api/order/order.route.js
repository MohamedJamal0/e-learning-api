const express = require('express');
const route = express.Router();
const auth = require('../../middleware/auth');

const orderController = require('./order.controller');

route.post('/', auth.cookieJwtAuth, orderController.createOrder);

route.post(
  '/:orderID/capture',
  auth.cookieJwtAuth,
  orderController.captureOrder
);

module.exports = route;
