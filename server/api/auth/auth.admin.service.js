const { Admin } = require('../../models');
const { BadRequestError } = require('../../errors');

const loginAdmin = async ({ username, password }) => {
  const admin = await Admin.findOne({ username });

  if (!admin) throw new NotFoundError('Admin not found');

  const passMatch = await bcrypt.compare(password, admin.password);

  if (!passMatch) throw new BadRequestError('Invalid username or password');

  return admin;
};

const createAdmin = async ({ username, password }) => {
  const admin = await Admin.findOne({ username });

  if (admin) throw new BadRequestError('Username already exist');

  const hashPassword = await bcrypt.hash(password, 12);

  const newAdmin = await Admin.create({
    ...req.body,
    password: hashPassword,
    role: 'admin',
  });

  return newAdmin;
};

module.exports = {
  loginAdmin,
  createAdmin,
};
