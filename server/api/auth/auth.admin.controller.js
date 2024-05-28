const { generateToken, attachTokenToCookies } = require('../../lib/jwt');

const authAdminService = require('./auth.admin.service');

const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  const admin = authAdminService.loginAdmin({ username, password });

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

  const newAdmin = await authAdminService.createAdmin({ username, password });

  res.status(201).json({
    id: newAdmin._id,
    role: 'admin',
  });
};

module.exports = {
  adminLogin,
  createAdmin,
};
