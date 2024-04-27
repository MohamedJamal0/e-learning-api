const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Student = require('../student/student.model');
const Admin = require('../admin/admin.model');

module.exports = (passport) => {
  passport.use(
    'student-local',
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const student = await Student.findOne({ email });

          if (!student) {
            return done(null, false, {
              message: 'Incorrect Email or Password',
            });
          }

          const passMatch = await bcrypt.compare(password, student.password);

          if (passMatch) {
            const { password, ...others } = student._doc;
            return done(null, others);
          } else {
            return done(null, false, {
              message: 'Incorrect Email or Password',
            });
          }
        } catch (err) {
          return done(null, false, { message: 'Incorrect Email or Password' });
        }
      }
    )
  );

  passport.use(
    'admin-local',
    new LocalStrategy(
      { usernameField: 'username' },
      async (username, password, done) => {
        try {
          const admin = await Admin.findOne({ username });

          if (!admin) {
            return done(null, false, {
              message: 'Incorrect Username or Password',
            });
          }

          const passMatch = await bcrypt.compare(password, admin.password);

          console.log(passMatch);

          if (passMatch) {
            const { password, ...others } = admin._doc;
            return done(null, others);
          } else {
            return done(null, false, {
              message: 'Incorrect Username or Password',
            });
          }
        } catch (err) {
          return done(null, false, { message: 'Incorrect Email or Password' });
        }
      }
    )
  );

  passport.serializeUser(({ id }, done) => {
    done(null, {
      id: id,
    });
  });

  passport.deserializeUser(async ({ id }, done) => {
    try {
      const student = await Student.findById(id);

      if (student) {
        delete student.password;
        return done(null, student);
      }

      const admin = await Admin.findById(id);

      if (admin) {
        delete admin.password;
        return done(null, admin);
      }

      if (!student && !admin) {
        return done(null, false);
      }

      return done(null, false, { message: 'user not found' });
    } catch (err) {
      done(err);
    }
  });
};
