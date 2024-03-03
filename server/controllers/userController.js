const bcrypt = require('bcrypt');
const User = require('../models/User');
const JobPost = require('../models/jobpost');
const jwt = require('jsonwebtoken');

// Registering a New User
const registerUser = async (req, res) => {
    try {
        
        const { firstName, lastName, email, password, userType } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email address is already registered.' });
        }

      
        const hashedPassword = await bcrypt.hash(password, 10);

       
        const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword, 
        userType
        });
        await newUser.save();

     
        res.status(201).json({ success: true, message: 'User registered successfully.' });
    } 
    catch (error) {
       
        console.log("Here")
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};
  
// Login User
const loginUser = async (req, res) => {
    try {
       
        const { email, password } = req.body;

      
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }

        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }

       
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      
        res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
        res.status(200).json({ success: true });
       
    } 
    catch (error) {
       
        console.error('Error logging in user:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

//creating a new job post
const jobpost = async (req, res) => {
    try {
        const { title, description, tags } = req.body;
          const jobPost = await JobPost.create({
            title,
            description,
            tags
          });
      
          res.json({ status: 'ok', id: jobPost._id });
        } catch (err) {
          console.error(err);
          res.status(500).json({ status: 'error', error: 'Something went wrong' });
        }
};

module.exports = { registerUser,loginUser, jobpost}; 