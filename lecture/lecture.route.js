const express = require('express');
const router = express.Router();

const lectureController = require('./lecture.controller');

const validator = require('../middleware/validator');
const { lectureValidator } = require('../validations');

const {
  isAdmin,
  cookieJwtAuth,
  isSuperAdmin,
  cookieJwtGetUser,
} = require('../middleware/auth');

router.get('/', cookieJwtAuth, isAdmin, lectureController.getLectures);

router.post(
  '/',
  validator(lectureValidator.createLectureSchema),
  cookieJwtAuth,
  isAdmin,
  lectureController.createLecture
);

router.patch(
  '/:id',
  validator(lectureValidator.updateLectureSchema),
  cookieJwtAuth,
  isAdmin,
  lectureController.updateLecture
);

router.delete(
  '/:id',
  cookieJwtAuth,
  isSuperAdmin,
  lectureController.deleteLecture
);

router.patch(
  '/:id/update_order',
  validator(lectureValidator.updateLectureOrderSchema),
  cookieJwtAuth,
  isAdmin,
  lectureController.updateLectureOrder
);

router.patch(
  '/:id/publish',
  cookieJwtAuth,
  isAdmin,
  lectureController.publishLecture
);

router.get(
  '/:id/content',
  cookieJwtGetUser,
  lectureController.getLectureContent
);

module.exports = router;
