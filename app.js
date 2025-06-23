const express = require('express');
const app = express();
const userRouter = require('./routes/user.routes');
const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

const connectToDB = require('./config/db');

// Connect to the database after loading the environment variables
connectToDB();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse incoming form data
app.use(express.urlencoded({ extended: true }));  // For form data parsing
app.use(express.json());  // For parsing JSON data if needed

// Use the user router for all routes under /user
app.use('/user', userRouter);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
