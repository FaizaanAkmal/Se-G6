const Dev = require("../models/dev");

// TODO
const devRegister = async (req, res) => {
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
  Dev.skills, Dev.prefs, Dev.portfolio, (Dev.gitlink = null);
  const newUser = new Dev({
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
  });
  await newUser.save();

  res
    .status(201)
    .json({ success: true, message: "User registered successfully.", newUser });
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
