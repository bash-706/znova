const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const serviceRouter = require('./routes/serviceRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const orderRouter = require('./routes/orderRoutes');
const chatRouter = require('./routes/chatRoutes');
const messageRouter = require('./routes/messageRoutes');
const postRouter = require('./routes/postRoutes');
const commentRouter = require('./routes/commentRoutes');
const postCategoryRouter = require('./routes/postCategoryRoutes');
const serviceCategoryRouter = require('./routes/serviceCategoryRoutes');

const Email = require('./utils/email');

const app = express();

// Global Middlewares
// Serving Static Files
app.use(express.static(path.join(__dirname, 'uploads')));

// Setting security HTTP Headers
app.use(helmet());

// Development Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Making our api available

const allowedOrigin = 'http://localhost:5173';

const corsOptions = {
  origin: allowedOrigin,
  credentials: true,
};

app.use(cors(corsOptions));

// Limiting requests from the same IP
const limiter = rateLimit({
  max: 5000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body Parser => Reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));

// Cookie Parser => Reading data from the cookie and sending it in every request
app.use(cookieParser());

// Data sanitization against SQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS attack

// Preventing parameter pollution
app.use(
  hpp({
    whitelist: ['ratingsAverage', 'ratingsQuantity', 'price', 'duration'],
  }),
);

// Mounting routes
app.use('/api/v1/services', serviceRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/chats', chatRouter);
app.use('/api/v1/messages', messageRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/post-categories', postCategoryRouter);
app.use('/api/v1/service-categories', serviceCategoryRouter);

app.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    await new Email().sendContactEmail(name, email, subject, message);
    res
      .status(200)
      .json({ status: 'success', message: 'Email sent successfully!' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while sending the email' });
  }
});

// Handling unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

// Using global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
