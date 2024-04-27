const { Lecture, Chapter, Course } = require('../models');
const courseStudentService = require('../course/student/course.student.service');
const { NotFoundError } = require('../errors');

const getLectures = async (courseId) => {
  const course = await Course.findById(courseId);

  if (!course) throw new NotFoundError('Course not found');

  const lectures = await Lecture.find({ course: course._id })
    .select(' title videoUrl order article isPublished isFree chapter')
    .sort({
      order: 1,
    });

  return lectures;
};

const createLecture = async (lecture) => {
  const { courseId, chapterId } = lecture;

  const chapter = await Chapter.findById(chapterId);

  if (!chapter) return NotFoundError('Chapter not found');

  const createdLecture = await Lecture.create({
    title: lecture.title,
    chapter: chapterId,
    course: courseId,
    order: chapter.lectures.length + 1,
  });

  chapter.lectures.push(createdLecture);

  await chapter.save();

  const { course, duration, createdAt, ...others } = createdLecture._doc;
  return { ...others };
};

const updateLecture = async (id, lecture) => {
  const updatedLecture = await Lecture.findByIdAndUpdate(id, lecture, {
    new: true,
  });

  if (!updatedLecture) throw new NotFoundError('Lecture not found');

  const { course, duration, createdAt, ...others } = updatedLecture._doc;

  return { ...others };
};

const deleteLecture = async (id) => {
  const deletedLecture = await Lecture.findById(id);

  const chapter = await Chapter.findById(deletedLecture.chapter);

  await Lecture.updateMany(
    {
      chapter: chapter._id,
      order: { $gt: deletedLecture.order },
    },
    { $inc: { order: -1 } }
  );

  chapter.lectures = chapter.lectures.filter(
    (lecture) => lecture?.toString() !== id
  );

  await Lecture.findOneAndDelete({ _id: id });
  await chapter.save();
};

const getLectureContent = async (user, id) => {
  const lecture = await Lecture.findById(id).select(
    'id title isFree videoUrl course'
  );

  if (!lecture) throw new NotFoundError('Lecture not found');

  const isAttended = await courseStudentService.attendedCourse(
    user,
    lecture.course._id.toString()
  );

  if (lecture.isFree || isAttended) {
    const { id, title, videoUrl } = lecture._doc;
    return { _id: id, title, videoUrl };
  }

  return {};
};

const updateLectureOrder = async (id, newOrder) => {
  const lecture = await Lecture.findById(id);

  if (!lecture) throw new NotFoundError('Lecture not found');

  const { order: currentOrder, chapter } = lecture;

  if (currentOrder > newOrder) {
    await Lecture.updateMany(
      {
        chapter,
        order: { $gte: newOrder, $lt: currentOrder },
      },
      { $inc: { order: 1 } }
    );
  }

  if (currentOrder < newOrder) {
    await Lecture.updateMany(
      {
        chapter,
        order: { $gt: currentOrder, $lte: newOrder },
      },
      { $inc: { order: -1 } }
    );
  }

  lecture.order = newOrder;
  await lecture.save();
};

const publishLecture = async (id) => {
  const lecture = await Lecture.findById(id);

  if (!lecture) throw new NotFoundError("Lecture doesn't exist");

  lecture.isPublished = !lecture.isPublished;
  await lecture.save();
};

module.exports = {
  createLecture,
  getLectures,
  updateLecture,
  deleteLecture,
  updateLectureOrder,
  publishLecture,
  getLectureContent,
};
