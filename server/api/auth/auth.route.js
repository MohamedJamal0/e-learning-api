const express = require('express');
const router = express.Router();
const validator = require('../../middleware/validator');
const authValidation = require('./auth.validation');

const {
  studentLogin,
  studentSignup,
  googleCallback,
} = require('./auth.student.controller');

const { adminLogin, createAdmin } = require('./auth.admin.controller');

const { logout, getCurrentUser } = require('./auth.controller');

const { cookieJwtAuth, isSuperAdmin } = require('../../middleware/auth');

const passport = require('passport');

router.post(
  '/signup',
  validator(authValidation.studentSignupSchema),
  studentSignup
);

router.post(
  '/login',
  validator(authValidation.studentLoginSchema),
  studentLogin
);

router.post(
  '/admin/login',
  validator(authValidation.adminLoginSchema),
  adminLogin
);

router.post(
  '/admin/create',
  validator(authValidation.createAdminSchema),
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
