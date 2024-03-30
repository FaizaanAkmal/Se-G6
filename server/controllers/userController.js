const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Registering a New User
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, userType } = req.body;

    const emptyFields = [];

    // Check if any required field is missing
    if (!firstName) {
      emptyFields.push("firstName");
    }
    if (!lastName) {
      emptyFields.push("lastName");
    }
    if (!email) {
      emptyFields.push("email");
    }
    if (!password) {
      emptyFields.push("password");
    }
    if (!userType) {
      emptyFields.push("userType");
    }

    if (emptyFields.length > 0) {
      let errorMessage =
        emptyFields.length === 1
          ? `${emptyFields[0]} is required.`
          : `${emptyFields.join(", ")} are required.`;
      return res
        .status(400)
        .json({ success: false, field: "general", message: errorMessage });
    }

    // Check if first name contains only letters and is not empty
    if (!/^[a-zA-Z]+$/.test(firstName.trim())) {
      return res.status(400).json({
        success: false,
        field: "firstName",
        message: "First name must contain only letters.",
      });
    }

    // Check if last name contains only letters and is not empty
    if (!/^[a-zA-Z]+$/.test(lastName.trim())) {
      return res.status(400).json({
        success: false,
        field: "lastname",
        message: "Last name must contain only letters.",
      });
    }

    // Regular expression for password validation
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    // Validate password
    if (!passwordRegex.test(password)) {
      let errorMessage = "Password must ";
      if (password.length < 8) {
        errorMessage += "be at least 8 characters long ";
      }
      if (!/(?=.*[a-z])/.test(password)) {
        errorMessage += "contain at least one lowercase letter ";
      }
      if (!/(?=.*[A-Z])/.test(password)) {
        errorMessage += "contain at least one uppercase letter ";
      }
      if (!/(?=.*\d)/.test(password)) {
        errorMessage += "contain at least one number ";
      }
      if (!/(?=.*[@$!%*#?&])/.test(password)) {
        errorMessage += "contain at least one special character ";
      }
      return res.status(400).json({
        success: false,
        field: "password",
        message: errorMessage.trim(),
      });
    }

    // Check if email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        field: "email",
        message: "Invalid email address.",
      });
    }

    //Hashing and Bycrypting the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Check exsiting user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        field: "email",
        message: "Email address is already registered.",
      });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userType,
    });
    await newUser.save();

    console.log("response: ", res);

    res
      .status(201)
      .json({ success: true, message: "User registered successfully." });
  } catch (error) {
    console.log("Here");
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid email or password." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = { registerUser, loginUser };
