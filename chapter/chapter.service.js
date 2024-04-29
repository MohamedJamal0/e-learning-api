const { Chapter, Course } = require('../models');
const { NotFoundError } = require('../errors');

const getChapters = async (courseId) => {
  const course = await Course.findById(courseId);

  if (!course) throw new NotFoundError('Course not found');

  const chapters = await Chapter.find({ course: courseId })
    .select('id title isPublished order')
    .sort({ order: 1 });

  return chapters;
};

const createChapter = async (chapter) => {
  const course = await Course.findById(chapter.courseId);

  if (!course) throw new NotFoundError("Course doesn't exist");

  const createdChapter = await Chapter.create({
    title: chapter.title,
    order: course.chapters.length + 1,
    course: course._id,
  });

  course.chapters.push(createdChapter);

  await course.save();

  createdChapter.lectures = [];

  const { _id, title, order, isPublished } = createdChapter._doc;

  return { _id, title, order, isPublished };
};

const updateChapter = async (id, chapter) => {
  const updatedChapter = await Chapter.findByIdAndUpdate(id, chapter, {
    new: true,
  });

  if (!updatedChapter) throw new NotFoundError("Chapter doesn't exist");

  const { _id, title, order, isPublished } = updatedChapter._doc;

  return { _id, title, order, isPublished };
};

const deleteChapter = async (chapterId) => {
  const session = await Chapter.startSession();

  const chapter = await Chapter.findById(chapterId);

  if (!chapter) throw new NotFoundError("Chapter doesn't exist");

  await session.withTransaction(async () => {
    await Chapter.updateMany(
      {
        course: chapter.course,
        order: { $gt: chapter.order },
      },
      { $inc: { order: -1 } }
    )
      .session(session)
      .exec();

    await Course.updateOne(
      { _id: chapter.course },
      { $pull: { chapters: chapter._id } }
    )
      .session(session)
      .exec();

    await Chapter.deleteOne({ _id: chapterId }).session(session).exec();
  });

  session.endSession();
};

const updateChapterOrder = async (chapterId, newOrder) => {
  const chapter = await Chapter.findById(chapterId);

  if (!chapter) throw NotFoundError("Chapter doesn't exist");

  const { order: currentOrder, course } = chapter;

  if (currentOrder > newOrder) {
    await Chapter.updateMany(
      { course, order: { $gte: newOrder, $lt: currentOrder } },
      { $inc: { order: 1 } }
    );
  }
  if (currentOrder < newOrder) {
    await Chapter.updateMany(
      { course, order: { $gt: currentOrder, $lte: newOrder } },
      { $inc: { order: -1 } }
    );
  }

  chapter.order = newOrder;

  await chapter.save();

  return { order: chapter.order };
};

const publishChapter = async (id) => {
  const chapter = await Chapter.findById(id);

  if (!chapter) throw NotFoundError("Chapter doesn't exist");
  chapter.isPublished = !chapter.isPublished;

  await chapter.save();

  return { isPublished: chapter.isPublished };
};

module.exports = {
  getChapters,
  createChapter,
  updateChapter,
  deleteChapter,
  publishChapter,
  updateChapterOrder,
};
