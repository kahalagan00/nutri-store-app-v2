const mongoose = require('mongoose');
const dotenv = require('dotenv');

// JMARDEBUG: Does this basically just handle error checking for the overall server.js?
// Catch all possible uncaught exceptions anywhere in the codebase
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shuting down...');
  console.log(err.name);
  console.log(err.message);
  // console.log(err); // Shows stack trace.
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then((conn) => {
  // console.log('conn', conn.connections);
  console.log('DB connected successfully 👍');
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...}`);
});

// JMARDEBUG: What does this do?
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLER REJECTION! 💥 Shuting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// JMARDEBUG: What does this do?
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('🛑 Process terminated');
  });
});
