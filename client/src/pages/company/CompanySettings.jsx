import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Global constants
import {
    jobTypeOptions,
    environmentOptions,
    experienceOptions,
    skillOptions,
    languageOptions,
    technologyOptions,
  } from "../../globalConstants.js";
  
// Custom components
import CompanyNavbar from "../../components/CompanyNavbar.jsx";
import Footer from "../../components/Footer";

// UI imports
import {
Grid,
Box,
Typography,
Button,
FormControl,
FormLabel,
Input,
Stack,
Select,
Option,
Textarea,
Autocomplete,
Alert,
} from "@mui/joy";

// Routes Import
import { apiRoutes, clientRoutes } from "../../routes.js";

export default function CompanyProfileSetup() {
    // state received
  const {userId} = useLocation();
  console.log("USER ID:", {userId})

    const getData = async(e)=>{
        //e.preventDefault()
        try {
            // Send a GET request to the server
            console.log("Getting data")
            const response = await axios.get(apiRoutes.company.getProfile, {params:{userId:userId}});
    
            console.log("Response:", response.data);
    
            } catch (error) {
            console.error("Error getting data:", error);
            // Handle error state or display error message
            }
    }
    getData()
    // Form fields state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [country, setCountry] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [companyOverview, setCompanyOverview] = useState("");
  const [companyWorkCulture, setCompanyWorkCulture] = useState("");
  const [companyBenefits, setCompanyBenefits] = useState("");

  // navigation
  const navigate = useNavigate();

  // Error handling state
  const [error, setError] = useState(null);

  // handle form field changes
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleemailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };
  const handleWebsiteChange = (e) => {
    setWebsite(e.target.value);
  };
  const handleTypeChange = (e) => {
    setCompanyType(e.target.value);
  };
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };
  const handleIndustryChange = (e) => {
    setIndustry(e.target.value);
  };
  const handleSizeChange = (e) => {
    setCompanySize(e.target.value);
  };
  const handleOverviewChange = (e) => {
    setCompanyOverview(e.target.value);
  };
  const handleWorkCultureChange = (e) => {
    setCompanyWorkCulture(e.target.value);
  };
  const handleBenefitsChange = (e) => {
    setCompanyBenefits(e.target.value);
  };

  return (
    <>
      <CompanyNavbar currentPage="settings" />
      <Grid
        container
        sx={{
          flexGrow: 1,
          minHeight: "90vh",
          justifyContent: "center",
        }}
      >
        <Grid
          //item
          xs={12}
          md={6}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            level="h1"
            sx={{ mb: 2, textAlign: "center", width: "100%" }}
          >
            Settings
          </Typography>
          <Typography level="body-lg" sx={{ textAlign: "center", mb: 4, width: "100%" }}>
            Edit Your Account Information Here
          </Typography>
          <Box sx={{ width: "75%" }}>
          <form >
              <Stack gap={4}>
                <FormControl>
                    <FormLabel>First Name</FormLabel>
                    <Input
                    type="text"
                    name="fname"
                    //placeholder="Enter company name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                    type="text"
                    name="lname"
                    //placeholder="Enter company name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                    type="text"
                    name="email"
                    //placeholder="Enter company name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
            </Stack>
          </form>
          </Box>
        </Grid>
        </Grid>
    <Footer />
    </>)

}