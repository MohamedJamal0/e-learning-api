const { BadRequestError } = require('../../errors');
const { Student } = require('../../models');

const { generateToken, attachTokenToCookies } = require('../../lib/jwt');
const bcrypt = require('bcrypt');

const studentSignup = async (req, res) => {
  const { email } = req.body;

  const isEmailExist = await Student.findOne({ email });

  if (isEmailExist)
    return res.status(400).json({ error: 'Email already exist' });

  const student = await Student.create({
    ...req.body,
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

  const passMatch = await bcrypt.compare(password, student.password);

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

  res.redirect(process.env.CLIENT_URL);
};

module.exports = {
  studentSignup,
  studentLogin,
  googleCallback,
};
