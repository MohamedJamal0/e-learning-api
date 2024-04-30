const express = require('express');
const router = express.Router();

const chapterController = require('./chapter.controller');

const { isAdmin, isSuperAdmin, cookieJwtAuth } = require('../middleware/auth');

const validator = require('../middleware/validator');
const { chapterValidator } = require('../validations');

router.get('/', cookieJwtAuth, isAdmin, chapterController.getChapters);

router.post(
  '/',
  validator(chapterValidator.createChapterSchema),
  cookieJwtAuth,
  isAdmin,
  chapterController.createChapter
);

router.patch(
  '/:id',
  validator(chapterValidator.updateChapterSchema),
  cookieJwtAuth,
  isAdmin,
  chapterController.updateChapter
);

router.patch(
  '/:id/publish',
  cookieJwtAuth,
  isAdmin,
  chapterController.publishChapter
);

router.delete(
  '/:id',
  cookieJwtAuth,
  isSuperAdmin,
  chapterController.deleteChapter
);

router.patch(
  '/:id/update_order',
  validator(chapterValidator.updateChapterOrderSchema),
  cookieJwtAuth,
  isAdmin,
  chapterController.updateChapterOrder
);

module.exports = router;
