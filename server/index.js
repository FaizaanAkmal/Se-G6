const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const testRouter = require("./routes/testRoute");  // For testing only
const userRouter = require("./routes/authRoute");
const companyRouter = require("./routes/companyRoute");
const devRouter = require("./routes/devRoute");
const jobRouter = require("./routes/jobRoute");
const aiRouter = require("./routes/aiRoute.js");
const cookieParser = require("cookie-parser");
const { errorMiddleware } = require("./middlewares/Error.js");
require("dotenv").config(); // Load environment variables
const app = express();
const port = process.env.PORT || 8000;

// CORS Configuration
const corsConfig = {
  origin: process.env.FRONTEND_URL, // e.g. https://your-frontend.onrender.com
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());


// Defining Routes

// Health Check Route
app.get('/', (req, res) => {
  res.send('API is running');
});

//User Registering Route
app.use("/user", userRouter);

// Handling Company Routes
app.use("/company", companyRouter);

// Handling Developer Routes
app.use("/dev", devRouter);

// Handling Job Routes
app.use("/job", jobRouter);

// Handling Test Routes
app.use("/test", testRouter);

// AI features
app.use("/ai", aiRouter)


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