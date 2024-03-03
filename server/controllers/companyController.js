const Company = require('../models/company');

const page1 = async (req, res) => {
    //res.json({mssg:"Success"})
    const { name, website, type, country } = req.body;
    const existingName = await Company.findOne({ name });
    if (existingName) {
    return res.status(400).json({ success: false, message: 'Company name is already registered.' });
    }
    const existingWebsite = await Company.findOne({ website });
    if (existingWebsite) {
    return res.status(400).json({ success: false, message: 'Website is already registered.' });
    }
    Company.industry, Company.size, Company.overview, Company.workCulture, Company.benefits = null
    const newUser = new Company({
        name,
        website,
        type,
        country
        });
        await newUser.save();

     
        res.status(201).json({ success: true, message: 'User registered successfully.',newUser });
}

const page2 = async (req, res) => {
    //res.json({mssg:"Success"})
    const { industry, size} = req.body;
    const {id} = req.params;
    try {
        const updatedCompany = await Company.findOneAndUpdate(
            { _id: id }, // Filter: Find the company by its ID
            { industry, size }, // Update: Set the new industry and size
            { new: true } // Options: Return the updated document
        );

        // If the company doesn't exist, return 404
        if (!updatedCompany) {
            return res.status(404).json({ error: "Company not found" });
        }

        res.status(200).json(updatedCompany);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
        //res.status(201).json({ success: true, message: 'User registered successfully.' });
}

const page3 = async (req, res) => {
    //res.json({mssg:"Success"})
    const { overview, workCulture, benefits} = req.body;
    const {id} = req.params;
    try {
        const updatedCompany = await Company.findOneAndUpdate(
            { _id: id }, // Filter: Find the company by its ID
            { overview, workCulture, benefits }, // Update: Set the new industry and size
            { new: true } // Options: Return the updated document
        );

        // If the company doesn't exist, return 404
        if (!updatedCompany) {
            return res.status(404).json({ error: "Company not found" });
        }

        res.status(200).json(updatedCompany);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
        //res.status(201).json({ success: true, message: 'User registered successfully.' });
}

module.exports = {page1, page2, page3};