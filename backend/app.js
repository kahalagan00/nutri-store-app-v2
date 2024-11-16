const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const productRouter = require('./routes/productRoutes');

// Start express app
const app = express();

app.enable('trust proxy'); // JMARDEBUG: What does this do? : Allows requests from proxy servers that are being used

// <------------------------------------------------------------------------------------------>
// Middlewares -->

app.use(cors()); // JMARDEBUG: What does this do? : Makes the resources in the server accesible to other domains
app.options('*', cors());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // JMARDEBUG: What does this do? : Morgan logs HTTP request details
}

// JMARDEBUG: What does this do? Does it limit the amount of requests in the "/api" route? : Limits the number of requests a user can make to the API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// JMARDEBUG: What do these do? Des it limit the amount of data that can be inside the "req.body"?
// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(
  express.urlencoded({
    extended: true,
    limit: '10kb',
  })
);
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use(compression()); // JMARDEUBG: Does this compress the overall code or just the app.js?

// <------------------------------------------------------------------------------------------>

// Routes -->
app.use('/api/v1/products', productRouter);

// JMARDEBUG: What does this do overall?
// Handling unhandled routes (NEEDS TO BE AT THE BOTTOM, ORDER MATTERS!)
app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;

  // next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  next(new Error("Can't find given url on this server! 🛑"));
});

module.exports = app;
