const courseStudentService = require('./course.student.service');

const getCourses = async (req, res) => {
  const courses = await courseStudentService.getCourses();
  return res.status(200).json(courses);
};

const getCourseByTitle = async (req, res) => {
  const course = await courseStudentService.getCourseByTitle(
    req.params.courseId
  );
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }
  return res.status(200).json(course);
};

const getCourseWithProgress = async (req, res) => {
  const course = await courseStudentService.getCourseWithProgress(
    req.user,
    req.params.courseTitle
  );
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }
  return res.status(200).json(course);
};

const toggleLectureCompletion = async (req, res) => {
  const { courseId, lectureId } = req.params;
  const content = await courseStudentService.toggleLectureCompletion(
    req.user,
    courseId,
    lectureId
  );
  res.status(200).json(content);
};

const isSubscribed = async (req, res) => {
  const { courseId } = req.params;
  const isSubscribed = await courseStudentService.isSubscribed(
    req.user,
    courseId
  );
  res.status(200).json(isSubscribed);
};

const attendFreeCourse = async (req, res) => {
  await courseStudentService.attendFreeCourse(req.user, req.params.courseId);

  res.status(200).json({ message: 'Course subscribed successfully' });
};

const getStudentCourses = async (req, res) => {
  const studentCourses = await courseStudentService.getStudentCourses(req.user);
  res.status(200).json(studentCourses);
};

module.exports = {
  getCourseByTitle,
  getCourseWithProgress,
  getCourses,
  toggleLectureCompletion,
  attendFreeCourse,
  isSubscribed,
  getStudentCourses,
};
