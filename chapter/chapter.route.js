const express = require('express');
const router = express.Router();

const chapterController = require('./chapter.controller');

const validator = require('../middleware/validator');
const { chapterValidator } = require('../validations');

router.get('/', chapterController.getChapters);

router.post(
  '',

  validator(chapterValidator.createChapterSchema),
  chapterController.createChapter
);

router.patch(
  '/:id',
  validator(chapterValidator.updateChapterSchema),
  chapterController.updateChapter
);

router.patch('/:id/publish', chapterController.publishChapter);

router.delete('/:id', chapterController.deleteChapter);

router.patch(
  '/:id/update_order',
  validator(chapterValidator.updateChapterOrderSchema),
  chapterController.updateChapterOrder
);

module.exports = router;
