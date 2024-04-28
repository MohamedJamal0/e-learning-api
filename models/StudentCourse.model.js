const mongoose = require('mongoose');

const studentCourseSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
    completedLectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecture',
      },
    ],
    completionPercentage: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const StudentCourse = mongoose.model('StudentCourse', studentCourseSchema);

module.exports = StudentCourse;
