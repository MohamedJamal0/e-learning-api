const mongoose = require('mongoose');

const Chapter = require('./Chapter.model');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'New Course',
    },
    subtitle: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    coverImage: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: 0,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { strict: false }
);

courseSchema.pre('deleteOne', async function (next) {
  await Chapter.deleteMany({ course: this._id });
  next();
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
