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

module.exports = companyRegister;