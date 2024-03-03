const Company = require('../models/company');

const companyRegister = async (req, res) => {
    // console.log("Data Received:",req.body)
    const { cname, website, companyType, country } = req.body;

    // Create a new company
    const newCompany = new Company({
        name: cname,
        website: website,
        type: companyType,
        country: country,
        industry: null,
        size: null,
        overview: null,
        workCulture: null,
        benefits: null
    });

    try {
        // Save the new company to the database
        const savedCompany = await newCompany.save();

        // Send a success message along with the ObjectId of the created company
        res.json({ message: "Success", companyId: savedCompany._id });
    } catch (error) {
        console.error("Error creating company:", error);
        res.status(500).json({ message: "Error creating company" });
    }
};

// const page1 = async (req, res) => {
//     const { name, website, type, country } = req.body;
//     const existingName = await Company.findOne({ name });
//     if (existingName) {
//     return res.status(400).json({ success: false, message: 'Company name is already registered.' });
//     }
//     const existingWebsite = await Company.findOne({ website });
//     if (existingWebsite) {
//     return res.status(400).json({ success: false, message: 'Website is already registered.' });
//     }
//     Company.industry, Company.size, Company.overview, Company.workCulture, Company.benefits = null
//     const newUser = new Company({
//         name,
//         website,
//         type,
//         country
//         });
//         await newUser.save();

     
//         res.status(201).json({ success: true, message: 'User registered successfully.',newUser });
// }

const page2 = async (req, res) => {
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
}

const page3 = async (req, res) => {
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
}

module.exports = {companyRegister, page2, page3};
