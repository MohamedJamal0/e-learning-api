const { BadRequestError } = require('../errors');
const { Student, Admin } = require('../models');

const { generateToken, attachTokenToCookies } = require('../jwt');
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

  attachTokenToCookies(res, token);

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

  attachTokenToCookies(res, token);

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

  attachTokenToCookies(res, token);

  res.status(200).json({
    id: admin._id,
    role: 'admin',
  });
};

const logout = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'none',
    secure: true,
  });
  res.status(200).json({ message: 'Logged out successfully' });
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

const googleCallback = async (req, res) => {
  const user = {
    firstName: req.user.displayName,
    lastName: req.user.name.familyName,
    email: req.user.emails[0].value,
  };
  const student = await Student.findOne({ email: user.email });
  let token;

  if (!student) {
    const newStudent = await Student.create(user);
    token = generateToken({
      id: newStudent._id,
      role: 'student',
    });
  } else {
    token = generateToken({
      id: student._id,
      role: 'student',
    });
  }

  attachTokenToCookies(res, token);

  res.redirect('https://e-learning-dun-nine.vercel.app/');
};

module.exports = {
  signup,
  studentLogin,
  adminLogin,
  logout,
  getCurrentUser,
  googleCallback,
};
