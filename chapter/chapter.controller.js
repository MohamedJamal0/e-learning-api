const chapterService = require('./chapter.service');

const getChapters = async (req, res) => {
  const chapters = await chapterService.getChapters(req.query.courseId);
  return res.status(200).json(chapters);
};

const createChapter = async (req, res) => {
  const chapter = await chapterService.createChapter(req.body);
  return res.status(201).json(chapter);
};

const updateChapter = async (req, res) => {
  const chapter = await chapterService.updateChapter(req.params.id, req.body);
  return res.status(200).json(chapter);
};

const publishChapter = async (req, res) => {
  const result = await chapterService.publishChapter(req.params.id);
  res.status(200).json(result);
};

const deleteChapter = async (req, res) => {
  await chapterService.deleteChapter(req.params.id);
  return res.status(200).json({
    message: 'Chapter deleted successfully',
  });
};

const updateChapterOrder = async (req, res) => {
  const result = await chapterService.updateChapterOrder(
    req.params.id,
    req.body.order
  );

  return res.status(200).json(result);
};

module.exports = {
  getChapters,
  createChapter,
  updateChapter,
  deleteChapter,
  publishChapter,
  updateChapterOrder,
};
