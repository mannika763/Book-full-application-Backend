const bcrypt = require("bcryptjs");
const newUserForBookApp = require("../models/user.models.js");
const generateTokenAndSetCookie = require("../utils/generateToken.js");

const signup = async (req, res) => {
	try {
	  const { fullName, username, password, confirmPassword, gender } = req.body;
	//   console.log("signup", fullName, username, password, confirmPassword, gender);
  
	  if (password !== confirmPassword) {
		return res.status(400).json({ error: "Passwords don't match" });
	  }
  
	  const existingUser = await newUserForBookApp.findOne({ username });
  
	  if (existingUser) {
		return res.status(400).json({ error: "Username already exists" });
	  }
  
	  // Hash Password
	  const salt = await bcrypt.genSalt(10);
	  const hashedPassword = await bcrypt.hash(password, salt);
  
	  // Profile picture URL based on gender
	  const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
	  const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
  
	  // Create new user using the model newUserForBookApp
	  const newUser = new newUserForBookApp({
		fullName,
		username,
		password: hashedPassword,
		gender,
		profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
	  });
  
	  await newUser.save(); // Save the new user to the database
  
	  // Generate JWT token and set it in a cookie
	  generateTokenAndSetCookie(newUser._id, res);
  
	  res.status(201).json({
		_id: newUser._id,
		fullName: newUser.fullName,
		username: newUser.username,
		profilePic: newUser.profilePic,
	  });
	} catch (error) {
	  console.log("Error in signup controller", error.message);
	  res.status(500).json({ error: "Internal Server Error" });
	}
  };

 const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await newUserForBookApp.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

 const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const submitbookform = (req, res) => {
    // Handle the form submission
    const { bookName, subject, category, images, tags } = req.body;

    // Process the form data (e.g., save to the database)
    console.log({ bookName, subject, category, images, tags });

    res.status(200).json({ message: 'Form submitted successfully' });
};


module.exports = {
	signup,
	login,
	logout,
	submitbookform,
  };