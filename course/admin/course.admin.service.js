const { Course, CoursePurchase, StudentCourse } = require('../../models');
const { BadRequestError, NotFoundError } = require('../../errors');

const getCourses = async () => {
  const courses = await Course.aggregate([
    {
      $lookup: {
        from: 'studentcourses',
        localField: '_id',
        foreignField: 'course',
        as: 'students',
      },
    },
    {
      $project: {
        courseId: '$_id',
        title: 1,
        numberOfStudents: { $size: '$students' },
        isPublished: 1,
        price: 1,
      },
    },
    {
      $sort: {
        numberOfStudents: -1,
      },
    },
  ]);

  return courses;
};

const getCourse = async (id) => {
  const course = await Course.findById(id)
    .select(
      'title subtitle price isPublished description coverImage level isFree'
    )
    .lean();

  delete course._id;
  if (!course) throw new NotFoundError('Course not found');

  return course;
};

const createCourse = async () => {
  const course = await Course.create({});
  return course;
};

const updateCourse = async (id, course) => {
  const updatedCourse = await Course.findByIdAndUpdate(id, course, {
    new: true,
  });

  if (!updatedCourse) throw new NotFoundError('Course not found');

  return updatedCourse;
};

const deleteCourse = async (id) => {
  const isPurchased = await StudentCourse.findOne({
    course: id,
  });

  if (isPurchased)
    throw new BadRequestError('Course is purchased u cant delete');

  await Course.deleteOne({ _id: id });
};

const togglePublishCourse = async (id) => {
  const course = await Course.findByIdAndUpdate(id, { isPublished: true });

  if (!course) throw new NotFoundError('Course not found');

  const isPurchased = await StudentCourse.findOne({
    course: id,
  });

  if (isPurchased)
    throw new BadRequestError('Course is purchased u cant unpublish');

  course.isPublished = !course.isPublished;

  await course.save();

  return {
    isPublished: course.isPublished,
  };
};

const isCoursePublished = async (id) => {
  const course = await Course.findById(id);

  if (!course) throw new NotFoundError('Course not found');
  return {
    isPublished: course.isPublished,
  };
};

const getAllPurchases = async () => {
  const purchases = await CoursePurchase.find()
    .populate('course', 'title')
    .populate('student', 'firstName lastName')
    .sort({ createdAt: -1 });
  return purchases;
};

const getLastJoinedStudents = async () => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const aggregationPipeline = [
    {
      $match: {
        createdAt: { $gte: sixMonthsAgo },
      },
    },
    {
      $group: {
        _id: { $month: '$createdAt' },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ];

  const joinedByMonth = await StudentCourse.aggregate(aggregationPipeline);

  const dataForChart = joinedByMonth.map((item) => ({
    month: item._id,
    count: item.count,
  }));

  return dataForChart;
};

const getAnalytics = async () => {
  const numberOfCoursesQuery = Course.countDocuments();
  const numberOfPurchasesQuery = CoursePurchase.countDocuments();
  const numberOfStudentsQuery = StudentCourse.countDocuments();
  const totalIncomeQuery = CoursePurchase.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: '$netAmount' },
      },
    },
  ]);

  const [numberOfCourses, numberOfPurchases, numberOfStudents, totalIncome] =
    await Promise.all([
      numberOfCoursesQuery,
      numberOfPurchasesQuery,
      numberOfStudentsQuery,
      totalIncomeQuery,
    ]);

  return {
    numberOfCourses,
    numberOfPurchases,
    numberOfStudents,
    totalIncome: totalIncome[0]?.total || 0,
  };
};

module.exports = {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  togglePublishCourse,
  isCoursePublished,
  getAllPurchases,
  getLastJoinedStudents,
  getAnalytics,
};
