const express = require('express');
const router = express.Router();
const validator = require('../middleware/validator');
const { authValidator } = require('../validations');

const {
  studentLogin,
  studentSignup,
  googleCallback,
} = require('./auth.student.controller');

const { adminLogin, createAdmin } = require('./auth.admin.controller');

const { logout, getCurrentUser } = require('./auth.controller');

const { cookieJwtAuth, isSuperAdmin } = require('../middleware/auth');

const passport = require('passport');

router.post(
  '/signup',
  validator(authValidator.studentSignupSchema),
  studentSignup
);

router.post(
  '/login',
  validator(authValidator.studentLoginSchema),
  studentLogin
);

router.post(
  '/admin/login',
  validator(authValidator.adminLoginSchema),
  adminLogin
);

router.post(
  '/admin/create',
  validator(authValidator.createAdminSchema),
  cookieJwtAuth,
  isSuperAdmin,
  createAdmin
);

router.get(
  '/login/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/googleRedirect',
  passport.authenticate('google', {
    session: false,
  }),
  googleCallback
);

router.get('/logout', logout);

router.get('/current', cookieJwtAuth, getCurrentUser);

module.exports = router;
