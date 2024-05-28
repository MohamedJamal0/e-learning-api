const { BadRequestError } = require('../../errors');
const { Student } = require('../../models');

const bcrypt = require('bcrypt');

const studentSignup = async (studentData) => {
  const { email } = studentData;

  const isEmailExist = await Student.findOne({ email });

  if (isEmailExist) throw new BadRequestError('Email already exists');

  const student = await Student.create(studentData);

  return student;
};

const studentLogin = async ({ email, password }) => {
  const student = await Student.findOne({ email });

  if (!student) throw new BadRequestError('Invalid email or password');

  const passMatch = await bcrypt.compare(password, student.password);

  if (!passMatch) throw new BadRequestError('Invalid email or password');

  return student;
};

const googleCallback = async (user) => {
  const { firstName, lastName, email } = user;

  let student = await Student.findOne({ email });

  if (!student) {
    student = await Student.create({ firstName, lastName, email });
  }

  return student;
};

module.exports = {
  studentSignup,
  studentLogin,
  googleCallback,
};
