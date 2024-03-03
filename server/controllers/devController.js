const Dev = require('../models/dev');

const page1 = async (req, res) => {
    const { country, experience, bio } = req.body;
    Dev.skills, Dev.prefs, Dev.portfolio, Dev.gitlink = null
    const newUser = new Dev({
        country,
        experience,
        bio
        });
        await newUser.save();

     
        res.status(201).json({ success: true, message: 'User registered successfully.',newUser });
}

const page2 = async (req, res) => {
    const { skills, prefs} = req.body;
    const {id} = req.params;
    try {
        const updatedDev = await Dev.findOneAndUpdate(
            { _id: id }, 
            { skills, prefs },
            { new: true } 
        );

        if (!updatedDev) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(updatedDev);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const page3 = async (req, res) => {
    const { portfolio, gitLink} = req.body;
    const {id} = req.params;
    try {
        const updatedDev = await Dev.findOneAndUpdate(
            { _id: id }, 
            { portfolio, gitLink }, 
            { new: true } 
        );

        if (!updatedDev) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(updatedDev);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

module.exports = {page1, page2, page3};