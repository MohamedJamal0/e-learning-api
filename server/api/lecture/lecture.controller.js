const lectureService = require('./lecture.service');

const getLectures = async (req, res) => {
  const lectures = await lectureService.getLectures(req.query.courseId);
  return res.status(200).json(lectures);
};

const createLecture = async (req, res) => {
  const lecture = await lectureService.createLecture(req.body);
  return res.status(201).json(lecture);
};

const updateLecture = async (req, res) => {
  const lecture = await lectureService.updateLecture(req.params.id, req.body);
  return res.status(200).json(lecture);
};

const publishLecture = async (req, res) => {
  await lectureService.publishLecture(req.params.id);
  return res
    .status(200)
    .json({ message: ' update Lecture published successfully' });
};

const deleteLecture = async (req, res) => {
  await lectureService.deleteLecture(req.params.id);
  return res.status(200).json({ message: 'lecture deleted successfully' });
};

const updateLectureOrder = async (req, res) => {
  await lectureService.updateLectureOrder(req.params.id, req.body.order);

  res.status(200).json({
    message: 'Lecture order updated successfully',
  });
};

const getLectureContent = async (req, res) => {
  const content = await lectureService.getLectureContent(
    req.user,
    req.params.id
  );

  res.status(200).json(content);
};

module.exports = {
  createLecture,
  updateLecture,
  deleteLecture,
  getLectures,
  updateLectureOrder,
  publishLecture,
  getLectureContent,
};
