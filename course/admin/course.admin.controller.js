const courseAdminService = require('./course.admin.service');

const getCourses = async (req, res) => {
  const courses = await courseAdminService.getCourses();
  res.status(200).json(courses);
};

const getCourse = async (req, res) => {
  const course = await courseAdminService.getCourse(req.params.id);
  res.status(200).json(course);
};

const createCourse = async (req, res) => {
  const course = await courseAdminService.createCourse();
  res.status(201).json({ courseId: course._id });
};

const updateCourse = async (req, res) => {
  const course = await courseAdminService.updateCourse(req.params.id, req.body);
  res.json(course);
};

const deleteCourse = async (req, res) => {
  await courseAdminService.deleteCourse(req.params.id);
  res.json({ message: 'Course deleted successfully' });
};

const togglePublishCourse = async (req, res) => {
  const result = await courseAdminService.togglePublishCourse(req.params.id);
  res.json(result);
};
const isCoursePublished = async (req, res) => {
  const result = await courseAdminService.isCoursePublished(req.params.id);
  res.status(200).json(result);
};

const getAllPurchases = async (req, res) => {
  const purchases = await courseAdminService.getAllPurchases();

  res.status(200).json(purchases);
};

const getLastJoinedStudents = async (req, res) => {
  const lastJoined = await courseAdminService.getLastJoinedStudents();
  res.status(200).json(lastJoined);
};

const getAnalytics = async (req, res) => {
  const analytics = await courseAdminService.getAnalytics();
  res.status(200).json(analytics);
};

module.exports = {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  togglePublishCourse,
  getAllPurchases,
  getLastJoinedStudents,
  getAnalytics,
  isCoursePublished,
};
