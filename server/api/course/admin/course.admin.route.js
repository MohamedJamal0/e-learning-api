const express = require('express');
const router = express.Router();

const courseAdminController = require('./course.admin.controller');

const {
  cookieJwtAuth,
  isAdmin,
  isSuperAdmin,
} = require('../../../middleware/auth');

const validator = require('../../../middleware/validator');
const courseAdminValidation = require('./course.admin.validation');

router.get(
  '/purchases',
  cookieJwtAuth,
  isAdmin,
  courseAdminController.getAllPurchases
);

router.get(
  '/analytics',
  cookieJwtAuth,
  isAdmin,
  courseAdminController.getAnalytics
);

router.get(
  '/last-joined',
  cookieJwtAuth,
  isAdmin,
  courseAdminController.getLastJoinedStudents
);

router.get('/', cookieJwtAuth, isAdmin, courseAdminController.getCourses);
router.get('/:id', cookieJwtAuth, isAdmin, courseAdminController.getCourse);

router.post('/', cookieJwtAuth, isAdmin, courseAdminController.createCourse);

router.patch(
  '/:id',
  cookieJwtAuth,
  isAdmin,
  validator(courseAdminValidation.updateCourseSchema),
  courseAdminController.updateCourse
);

router.delete(
  '/:id',
  cookieJwtAuth,
  isSuperAdmin,
  courseAdminController.deleteCourse
);

router.patch(
  '/:id/publish',
  cookieJwtAuth,
  isSuperAdmin,
  courseAdminController.togglePublishCourse
);

router.get(
  '/:id/is-published',
  cookieJwtAuth,
  isAdmin,
  courseAdminController.isCoursePublished
);

module.exports = router;
