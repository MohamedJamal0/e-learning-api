const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const studentCourseController = require('./course.student.controller');

router.get(
  '/student-courses',
  auth.cookieJwtAuth,
  studentCourseController.getStudentCourses
);

router.get('/:courseId', studentCourseController.getCourseByTitle);

router.get(
  '/:courseTitle/learning',
  auth.cookieJwtGetUser,
  studentCourseController.getCourseWithProgress
);

router.get('/', studentCourseController.getCourses);

router.post(
  '/:courseId/lectures/:lectureId/complete',
  auth.cookieJwtGetUser,
  studentCourseController.toggleLectureCompletion
);

router.post(
  '/:courseId/attend-free',
  auth.cookieJwtGetUser,
  studentCourseController.attendFreeCourse
);

router.get(
  '/:courseId/is-subscribed',
  auth.cookieJwtGetUser,
  studentCourseController.isSubscribed
);

module.exports = router;
