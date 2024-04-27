const orderService = require('./order.service');

const createOrder = async (req, res, next) => {
  const { jsonResponse, httpStatusCode } = await orderService.createOrder(
    req.body.courseId
  );
  res.status(httpStatusCode).json(jsonResponse);
};

const captureOrder = async (req, res, next) => {
  const { jsonResponse, httpStatusCode } = await orderService.captureOrder({
    user: req.user,
    orderId: req.params,
    courseId: req.body.courseId,
  });

  res.status(httpStatusCode).json(jsonResponse);
};

module.exports = {
  createOrder,
  captureOrder,
};
