const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userrouter = require("./routes/authRoute");
const cookieParser = require('cookie-parser')
const { errorMiddleware } = require("./middlewares/Error.js");
require('dotenv').config(); // Load environment variables
const app = express();
const port = process.env.PORT || 8000;

// Middleware
// Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Defining Routes
app.use('/api',userrouter)

// Using Error Middleware
app.use(errorMiddleware);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
      console.log("Connected to Database");
    });
  })
  .catch((error) => {
    console.error(error);
  });
