const express = require('express');
const router = express.Router();

const courseAdminController = require('./course.admin.controller');

const validator = require('../../middleware/validator');
const courseValidator = require('../../validations/course.validator');

router.get('/purchases', courseAdminController.getAllPurchases);

router.get('/analytics', courseAdminController.getAnalytics);

router.get('/last-joined', courseAdminController.getLastJoinedStudents);

router.get('/', courseAdminController.getCourses);
router.get('/:id', courseAdminController.getCourse);

router.post('/', courseAdminController.createCourse);

router.patch(
  '/:id',
  validator(courseValidator.updateCourseSchema),
  courseAdminController.updateCourse
);

router.delete('/:id', courseAdminController.deleteCourse);

router.patch('/:id/publish', courseAdminController.togglePublishCourse);

router.get('/:id/is-published', courseAdminController.isCoursePublished);

module.exports = router;
