const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      default: '',
    },
    duration: {
      type: Number,
    },
    article: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
    },
    chapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chapter',
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { strict: false }
);

const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;
