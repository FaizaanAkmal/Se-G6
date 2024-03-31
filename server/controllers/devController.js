const Dev = require("../models/dev");

// TODO
const devRegister = async (req, res) => {
  const {
    userId,
    country,
    experience,
    bio,
    skills,
    languages,
    technologies,
    interestedJobType,
    environmentPreference,
    portfolioLink,
    githubLink,
  } = req.body;

  try {
    // Convert experience to a number
    const experienceValue = parseInt(experience);

    // Validate that portfolioLink and githubLink are provided
    if (!portfolioLink || !githubLink) {
      return res.status(400).json({ success: false, message: "Portfolio link and Github link are required." });
    }

    const newUser = new Dev({
      userId,
      country,
      experience: experienceValue,
      bio,
      skills,
      languages,
      technologies,
      interestedJobType,
      environmentPreference,
      portfolio: portfolioLink,
      gitLink: githubLink,
    });
    
    await newUser.save();
  
    res.status(201).json({ success: true, message: "User registered successfully.", newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Error registering user." });
  }
};

// TODO
const devEdit = async (req, res) => {
  const {
    country,
    experience,
    bio,
    skills,
    languages,
    technologies,
    interestedJobType,
    environmentPreference,
    portfolioLink,
    githubLink,
  } = req.body;

  const { id } = req.params;
  try {
    const updatedDev = await Dev.findOneAndUpdate(
      { _id: id },
      {
        country,
        experience,
        bio,
        skills,
        languages,
        technologies,
        interestedJobType,
        environmentPreference,
        portfolioLink,
        githubLink,
      },
      { new: true }
    );

    if (!updatedDev) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedDev);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { devRegister, devEdit };
