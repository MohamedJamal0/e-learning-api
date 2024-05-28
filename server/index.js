require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');

const cookieParser = require('cookie-parser');

const cors = require('cors');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

// passport
const passport = require('passport');
require('./lib/passport')(passport);

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// extra packages
app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// passport middleware
app.use(passport.initialize());
app.use(cookieParser());

// routes

const courseAdminRoute = require('./api/course/admin/course.admin.route');
const chapterRoute = require('./api/chapter/chapter.route');
const lectureRoute = require('./api/lecture/lecture.route');
const authRoute = require('./api/auth/auth.route');
const courseStudentRoute = require('./api/course/student/course.student.route');
const orderRoute = require('./api/order/order.route');

app.use('/api/v1/admin/courses', courseAdminRoute);
app.use('/api/v1/admin/chapters', chapterRoute);
app.use('/api/v1/admin/lectures', lectureRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/courses', courseStudentRoute);
app.use('/api/v1/orders', orderRoute);

// errors
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(process.env.PORT, () =>
      console.log(`Server is listening on port 3000`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
