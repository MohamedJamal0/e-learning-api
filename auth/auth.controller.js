const { BadRequestError } = require('../errors');
const { Student, Admin } = require('../models');

const { generateToken } = require('../jwt');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
  const { email, password } = req.body;

  const isEmailExist = await Student.findOne({ email });

  if (isEmailExist)
    return res.status(400).json({ error: 'Email already exist' });

  const hashPassword = await bcrypt.hash(password, 12);

  const student = await Student.create({
    ...req.body,
    password: hashPassword,
  });

  const token = generateToken({
    id: student._id,
    role: 'student',
  });

  res.cookie('token', token, {
    httpOnly: true,
  });

  res.status(201).json({
    id: student._id,
    fullName: `${student.firstName} ${student.lastName}`,
    role: 'student',
  });
};

const studentLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const student = await Student.findOne({ email });

  if (!student) throw new BadRequestError('Invalid email or password');

  const passMatch = bcrypt.compare(password, student.password);

  if (!passMatch) throw new BadRequestError('Invalid email or password');

  const token = generateToken({
    id: student._id,
    role: 'student',
  });

  res.cookie('token', token, {
    httpOnly: true,
  });

  res.status(200).json({
    id: student._id,
    fullName: student.firstName + ' ' + student.lastName,
  });
};

const adminLogin = async (req, res, next) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (!admin) throw new BadRequestError('Invalid username or password');

  const passMatch = bcrypt.compare(password, admin.password);

  if (!passMatch) throw new BadRequestError('Invalid username or password');

  const token = generateToken({
    id: admin._id,
    role: 'admin',
  });

  res.cookie('token', token, {
    httpOnly: true,
  });

  res.status(200).json({
    id: admin._id,
    role: 'admin',
  });
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ success: true });
};

const getCurrentUser = async (req, res, next) => {
  const { id, role } = req.user;

  let user;

  if (role === 'student') {
    user = await Student.findById(id);
    res.status(200).json({
      id: user._id,
      fullName: `${user.firstName} ${user.lastName}`,
      role: 'student',
      courses: user.courses,
    });
  }

  if (role === 'admin') {
    user = await Admin.findById(id);
    res.status(200).json({
      id: user._id,
      role: 'admin',
    });
  }
};

module.exports = {
  signup,
  studentLogin,
  adminLogin,
  logout,
  getCurrentUser,
};
