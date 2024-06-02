const { Student, Admin } = require('../../models');

const logout = (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0),
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });

  // Clear cache-control headers
  res.set('Cache-Control', 'no-store, max-age=0');

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

  if (role === 'superadmin') {
    user = await Admin.findById(id);
    res.status(200).json({
      id: user._id,
      role: 'superadmin',
    });
  }
};

module.exports = {
  logout,
  getCurrentUser,
};
