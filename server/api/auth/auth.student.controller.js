const { generateToken, attachTokenToCookies } = require('../../lib/jwt');

const authStudentService = require('./auth.student.service');

const studentSignup = async (req, res) => {
  const student = await authStudentService.studentSignup(req.body);

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

const studentLogin = async (req, res) => {
  const student = await authStudentService.studentLogin(req.body);

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

  const student = await authStudentService.googleCallback(user);

  let token = generateToken({
    id: student._id,
    role: 'student',
  });

  attachTokenToCookies(res, token);

  res.redirect(process.env.CLIENT_URL);
};

module.exports = {
  studentSignup,
  studentLogin,
  googleCallback,
};
