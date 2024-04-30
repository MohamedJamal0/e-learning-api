const { BadRequestError } = require('../errors');
const { Admin } = require('../models');

const { generateToken, attachTokenToCookies } = require('../jwt');
const bcrypt = require('bcrypt');

const adminLogin = async (req, res, next) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (!admin) throw new BadRequestError('Invalid username or password');

  const passMatch = await bcrypt.compare(password, admin.password);

  if (!passMatch) throw new BadRequestError('Invalid username or password');

  const token = generateToken({
    id: admin._id,
    role: admin.role,
  });

  attachTokenToCookies(res, token);

  res.status(200).json({
    id: admin._id,
    role: admin.role,
  });
};

const createAdmin = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (admin) throw new BadRequestError('Username already exist');

  const hashPassword = await bcrypt.hash(password, 12);

  const newAdmin = await Admin.create({
    ...req.body,
    password: hashPassword,
    role: 'admin',
  });

  res.status(201).json({
    id: newAdmin._id,
    role: 'admin',
  });
};

module.exports = {
  adminLogin,
  createAdmin,
};
