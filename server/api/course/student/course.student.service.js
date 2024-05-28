const { Course, StudentCourse, Lecture, Student } = require('../../../models');
const { NotFoundError } = require('../../../errors');
const { default: mongoose } = require('mongoose');

const getCourses = async () => {
  const courses = await Course.find({ isPublished: true }).select(
    'id title subtitle coverImage price isFree level numberOfLectures'
  );

  return courses;
};

const getCourseByTitle = async (title) => {
  const course = await Course.findOne({ title })
    .select('id title subtitle description coverImage price level isFree')
    .populate({
      path: 'chapters',
      match: { isPublished: true },
      options: { sort: { order: 1 } },
      populate: {
        path: 'lectures',
        select: 'id title isFree duration',
        match: { isPublished: true },
        options: { sort: { order: 1 } },
      },
    });

  if (!course) throw new NotFoundError('Course not found');
  // if (!course.isPublished) throw new NotFoundError('Course is not available');

  return course;
};

const getCourseWithProgress = async (user, courseTitle) => {
  const course = await Course.findOne({ title: courseTitle })
    .select('id title')
    .populate({
      path: 'chapters',
      match: { isPublished: true },
      select: 'id title',
      options: { sort: { order: 1 } },
      populate: {
        path: 'lectures',
        select: 'id title isFree',
        match: { isPublished: true },
        options: { sort: { order: 1 } },
      },
    })
    .lean();

  if (!course) throw new NotFoundError('Course not found');

  const studentCourse = await StudentCourse.findOne({
    student: user?.id,
    course: course._id,
  }).select('completedLectures');

  const completedLectures = studentCourse
    ? studentCourse.completedLectures.map((lecture) => lecture.toString())
    : [];

  const isAttended = await attendedCourse(user, course._id.toString());

  course.chapters.forEach((chapter) => {
    chapter.lectures.forEach((lecture) => {
      lecture.isCompleted = completedLectures.includes(lecture._id.toString());
      lecture.isFree = lecture.isFree || isAttended;
    });
  });

  return course;
};

const isSubscribed = async (user, courseId) => {
  const course = await Course.findById(courseId);

  console.log('course: ', courseId);
  if (!course) throw new NotFoundError('Course not found');

  const isAttended = await attendedCourse(user, course._id.toString());

  return { isSubscribed: isAttended };
};

const attendedCourse = async (user, courseId) => {
  if (!user) return false;
  const isAttended = await StudentCourse.findOne({
    student: user?.id,
    course: courseId,
  });

  return Boolean(isAttended);
};

const attendFreeCourse = async (user, courseId) => {
  const course = await Course.findOne({ _id: courseId, isFree: true });

  if (!course) throw new NotFoundError('Course not found');

  const student = await Student.findById(user?.id);

  if (!student) throw new NotFoundError('Student not found');

  await StudentCourse.create({
    student: user?.id,
    course: course._id,
    completedLectures: [],
  });
};

const attendCourse = async (user, courseId) => {
  const course = await Course.findOne({ id: courseId });

  if (!course) throw new NotFoundError('Course not found');

  const student = await Student.findById(user?.id);

  if (!student) throw new NotFoundError('Student not found');

  await StudentCourse.create({
    student: user?.id,
    course: course._id,
    completedLectures: [],
  });
};

const toggleLectureCompletion = async (user, courseId, lectureId) => {
  const courseStudent = await StudentCourse.findOne({
    student: user?.id,
    course: courseId,
  }).select('completedLectures');

  if (!courseStudent)
    return { message: 'user is not subscribed to this course' };

  const isCompleted = courseStudent.completedLectures.find(
    (lecture) => lecture.toString() === lectureId
  );

  if (isCompleted)
    courseStudent.completedLectures = courseStudent.completedLectures.filter(
      (lecture) => lecture.toString() !== lectureId
    );

  if (!isCompleted) courseStudent.completedLectures.push(lectureId);

  const numberOfCourseLectures = await Lecture.countDocuments({
    course: courseId,
    isPublished: true,
  });

  const numberOfCompletedLectures = courseStudent.completedLectures.length;

  courseStudent.completionPercentage = Math.round(
    (numberOfCompletedLectures / numberOfCourseLectures) * 100
  );

  await courseStudent.save();

  return { message: 'updated successfully' };
};

const getStudentCourses = async (user) => {
  const courses = await StudentCourse.aggregate([
    { $match: { student: new mongoose.Types.ObjectId(user.id) } },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'courseDetails',
      },
    },
    {
      $unwind: '$courseDetails',
    },
    {
      $lookup: {
        from: 'lectures',
        let: { courseId: '$course' },
        pipeline: [
          { $match: { $expr: { $eq: ['$course', '$$courseId'] } } },
          { $sort: { order: 1 } },
          { $limit: 1 },
        ],
        as: 'firstLecture',
      },
    },
    {
      $project: {
        id: '$course',
        title: '$courseDetails.title',
        firstLectureId: { $arrayElemAt: ['$firstLecture._id', 0] },
        completionPercentage: '$completionPercentage',
        coverImage: '$courseDetails.coverImage',
      },
    },
  ]);

  return courses;
};

module.exports = {
  getCourses,
  getCourseByTitle,
  getCourseWithProgress,
  attendCourse,
  attendedCourse,
  attendFreeCourse,
  toggleLectureCompletion,
  isSubscribed,
  getStudentCourses,
};
