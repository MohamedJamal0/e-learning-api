const { Course, CoursePurchase } = require('../../models');
const { NotFoundError } = require('../../errors');
const courseStudentService = require('../course/student/course.student.service');
const paypalService = require('./paypal.service');

const createOrder = async (courseId) => {
  const course = await Course.findById(courseId);

  if (!course) throw new NotFoundError('Course not found');

  const { jsonResponse, httpStatusCode } = await paypalService.createOrder(
    course
  );

  return { jsonResponse, httpStatusCode };
};

const captureOrder = async ({ user, orderID, courseId }) => {
  const { jsonResponse, httpStatusCode } = await paypalService.captureOrder(
    orderID
  );

  const { gross_amount, paypal_fee, net_amount } =
    jsonResponse.purchase_units[0].payments.captures[0]
      .seller_receivable_breakdown;

  await courseStudentService.attendCourse(req.user, req.body.courseId);

  await CoursePurchase.create({
    student: user.id,
    course: courseId,
    grossAmount: gross_amount.value,
    fee: paypal_fee.value,
    netAmount: net_amount.value,
    transactionId: jsonResponse.id,
  });

  return { jsonResponse, httpStatusCode };
};

module.exports = {
  createOrder,
  captureOrder,
};
