const mongoose = require('mongoose');

const Lecture = require('./Lecture.model');

const chapterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
    isPublished: {
      type: Boolean,
      default: false,
    },

    lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' }],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { strict: false }
);

chapterSchema.pre('deleteOne', async function (next) {
  await Lecture.deleteMany({ course: this._id });

  next();
});

const Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;
