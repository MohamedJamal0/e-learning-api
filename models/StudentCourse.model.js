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
  },
  { timestamps: true }
);

const StudentCourse = mongoose.model('StudentCourse', studentCourseSchema);

module.exports = StudentCourse;
