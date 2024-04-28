const express = require('express');
const router = express.Router();
const validator = require('../middleware/validator');
const { authValidator } = require('../validations');

const authController = require('./auth.controller');
const { cookieJwtAuth } = require('../middleware/auth');

const passport = require('passport');

router.post(
  '/signup',
  validator(authValidator.studentSignupSchema),
  authController.signup
);

router.post(
  '/login',
  validator(authValidator.studentLoginSchema),
  authController.studentLogin
);

router.post(
  '/admin/login',
  validator(authValidator.adminLoginSchema),
  authController.adminLogin
);

router.get('/logout', authController.logout);
router.get('/current', cookieJwtAuth, authController.getCurrentUser);

router.get(
  '/login/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/googleRedirect',
  passport.authenticate('google', {
    session: false,
  }),
  authController.googleCallback
);

module.exports = router;
