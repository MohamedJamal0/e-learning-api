require('dotenv').config();

require('express-async-errors');

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');

const connectDB = require('./db/connect');

const cors = require('cors');

const passport = require('passport');

require('./config/passport')(passport);

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(passport.initialize());
app.use(cookieParser());

// routes

const courseAdminRoute = require('./course/admin/course.admin.route');
const chapterRoute = require('./chapter/chapter.route');
const lectureRoute = require('./lecture/lecture.route');
const authRoute = require('./auth/auth.route');
const courseStudentRoute = require('./course/student/course.student.route');
const orderRoute = require('./order/order.route');

app.use('/v1/admin/courses', courseAdminRoute);
app.use('/v1/admin/chapters', chapterRoute);
app.use('/v1/admin/lectures', lectureRoute);
app.use('/v1/auth', authRoute);
app.use('/v1/courses', courseStudentRoute);
app.use('/v1/orders', orderRoute);

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
