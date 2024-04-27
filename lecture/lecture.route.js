const express = require('express');
const router = express.Router();

const lectureController = require('./lecture.controller');

const validator = require('../middleware/validator');
const { lectureValidator } = require('../validations');

const auth = require('../middleware/auth');

router.get('/', lectureController.getLectures);

router.post(
  '/',
  validator(lectureValidator.createLectureSchema),
  lectureController.createLecture
);

router.patch(
  '/:id',
  validator(lectureValidator.updateLectureSchema),
  lectureController.updateLecture
);

router.delete('/:id', lectureController.deleteLecture);

router.patch(
  '/:id/update_order',
  validator(lectureValidator.updateLectureOrderSchema),
  lectureController.updateLectureOrder
);

router.patch('/:id/publish', lectureController.publishLecture);

router.get(
  '/:id/content',
  auth.cookieJwtGetUser,
  lectureController.getLectureContent
);

module.exports = router;
