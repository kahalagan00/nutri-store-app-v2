import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

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

// const DB = process.env.DATABASE.replace(
//   '<db_password>',
//   process.env.DATABASE_PASSWORD
// );

const database: any = process.env.DATABASE?.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD as string
);
if (!database) {
  throw new Error('DATABASE environment variable does not exist');
}

// mongoose.connect(DB).then((conn) => {
//   // console.log('conn', conn.connections);
//   console.log('DB connected successfully 👍');
// });
mongoose
  .connect(database)
  .then(() => console.log('Database connected successfully 👍'))
  .catch((err) => console.error('Database connection error:', err));

const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const server = app.listen(port, () => {
  console.log(`Application running on port ${port}...`);
});

// JMARDEBUG: What does this do? : Handles error handling for Promise errors that were not catched
process.on('unhandledRejection', (err: any) => {
  console.log('Unhandled Rejection Detected! 💥 Shuting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// JMARDEBUG: What does this do? : Processes the SIGTERM signal which is a signal used for program termination
// process.on('SIGTERM', () => {
//   console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
//   server.close(() => {
//     console.log('🛑 Process terminated');
//   });
// });
