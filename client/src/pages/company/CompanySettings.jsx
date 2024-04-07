import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Global constants
import {
    companySizes,
    companyTypes,
    industryTypes,
    countryNames,
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

export default function CompanySettings() {
    // state received
  const {userId} = useLocation();
  console.log("USER ID:", {userId})
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

    useEffect(() => {
        const getData = async () => {
          try {
            //TODO: Get Using Actual User Id 
            const response1 = await axios.get("/company/getProfile/6612546160a9b8b84d723328"); //Using Sample User Id
            const response2 = await axios.get("/user/getUser/66123f51544cddd3181997cf");
    
            setCompanyName(response1.data.name);
            setWebsite(response1.data.website);
            setCompanyType(response1.data.type);
            setCountry(response1.data.country);
            setIndustry(response1.data.industry);
            setCompanySize(response1.data.size);
            setCompanyOverview(response1.data.overview);
            setCompanyWorkCulture(response1.data.workCulture);
            setCompanyBenefits(response1.data.benefits);
            setFirstName(response2.data.firstName);
            setLastName(response2.data.lastName);
            setEmail(response2.data.email);
          } catch (error) {
            console.error("Error getting data:", error);
            // Handle error state or display error message
          }
        };
    
        getData();
      }, []);
  // navigation
  const navigate = useNavigate();
  // Error handling state
  const [error, setError] = useState(null);
  // State to control the visibility of form sections
  const [currentStep, setCurrentStep] = useState(1);
  // Navigate to the next form section
  const handleNext = () => {
    if (!firstName || !lastName || !email) {
        setError("Please fill in all the required fields");
        return;
      }
    setError(null);
    setCurrentStep(currentStep + 1);
  }
    // Navigate to the previous form section
  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
  // Function to handle cancel
  const handleCancel = () => {
    // Navigate to the dashboard without sending any patch requests
    navigate(clientRoutes.companyDashboard, { userId: userId });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // create a new FormData object with the state data
    const requestData1 = {
        firstName,
        lastName,
        email
      };
  
      console.log("Request data before sending:", requestData1);
  
      try {
        const response = await axios.patch("/user/editUser/66123f51544cddd3181997cf", requestData1);
  
        console.log(response.data);
      } catch (error) {
        console.error("Error Submitting Form", error);
      }

    // create a new FormData object with the state data
    const requestData2 = {
      companyName,
      website,
      companyType,
      country,
      industry,
      companySize,
      companyOverview,
      companyWorkCulture,
      companyBenefits,
    };

    console.log("Request data before sending:", requestData2);

    try {
      const response = await axios.patch("/company/profileEdit/6612546160a9b8b84d723328", requestData2);

      console.log(response.data);
      navigate(clientRoutes.companyDashboard, { userId: userId });
    } catch (error) {
      console.error("Error Submitting Form", error);
    }
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
          <Box sx={{ width: "75%" }}>
          <form onSubmit={handleSubmit}>
              <Stack gap={4}>
              {currentStep === 1 && (
                <>
                <Typography level="body-lg" sx={{ textAlign: "center", mb: 4, width: "100%" }}>
                Edit Your Account Information Here
                </Typography>
                <FormControl required>
                    <FormLabel>First Name</FormLabel>
                    <Input
                    type="text"
                    name="fname"
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    />
                </FormControl>
                <FormControl required>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                    type="text"
                    name="lname"
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    />
                </FormControl>
                <FormControl required>
                    <FormLabel>Email</FormLabel>
                    <Input
                    type="text"
                    name="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                {currentStep < 3 && (
                      <Button
                        onClick={handleNext}
                        sx={{
                          backgroundColor: "#F9F5FF",
                          color: "#6941C6",
                          "&:hover": {
                            backgroundColor: "#e3dcf7",
                          },
                        }}
                      >
                        Next
                      </Button>
                    )}
                </>)}
                {currentStep === 2 && (
                  <>
                  <Typography level="body-lg" sx={{ textAlign: "center", mb: 4, width: "100%" }}>
                    Edit Your Profile Information Here
                  </Typography>
                  <FormControl required>
                      <FormLabel>Company Name</FormLabel>
                      <Input
                        type="text"
                        name="cname"
                        placeholder="Enter company name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </FormControl>
                    <FormControl required>
                      <FormLabel>Website</FormLabel>
                      <Input
                        type="url"
                        name="website"
                        placeholder="https://example.com"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </FormControl>
                    <FormControl required>
                      <FormLabel>Company Type</FormLabel>
                      <Select
                        name="companyType"
                        placeholder="Select company type"
                        onChange={(e, value) => {
                          setCompanyType(value);
                        }}
                        value={companyType}
                      >
                        {companyTypes.map((type) => (
                          <Option key={type} value={type}>
                            {type}
                          </Option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl required>
                      <FormLabel>Location</FormLabel>
                      <Autocomplete
                        options={countryNames}
                        placeholder="Select country"
                        onChange={(e, value) => setCountry(value)}
                        value={country}
                      />
                    </FormControl>
                    <FormControl required>
                      <FormLabel>
                        Company Industry
                      </FormLabel>
                      <Select
                        name="industry"
                        placeholder="Select industry"
                        onChange={(e, value) => setIndustry(value)}
                        value={industry}
                      >
                        {industryTypes.map((industry) => (
                          <Option key={industry} value={industry}>
                            {industry}
                          </Option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl required>
                      <FormLabel>Company Size</FormLabel>
                      <Select
                        name="companySize"
                        placeholder="Select company size (no. of employees)"
                        onChange={(e, value) => setCompanySize(value)}
                        value={companySize}
                      >
                        {companySizes.map((size) => (
                          <Option key={size} value={size}>
                            {size}
                          </Option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl required>
                      <FormLabel>
                        Company Overview
                      </FormLabel>
                      <Textarea
                        name="companyOverview"
                        onChange={(e) => {
                          setCompanyOverview(e.target.value);
                        }}
                        minRows={3}
                        maxRows={6}
                        value={companyOverview}
                      />
                    </FormControl>
                    <FormControl required>
                      <FormLabel>
                        Company Work Culture
                      </FormLabel>
                      <Textarea
                        name="companyWorkCulture"
                        onChange={(e) => {
                          setCompanyWorkCulture(e.target.value);
                        }}
                        minRows={3}
                        maxRows={6}
                        value={companyWorkCulture}
                      />
                    </FormControl>
                    <FormControl required>
                      <FormLabel>
                        Company Benefits
                      </FormLabel>
                      <Textarea
                        name="companyBenefits"
                        onChange={(e) => {
                          setCompanyBenefits(e.target.value);
                        }}
                        minRows={3}
                        maxRows={6}
                        value={companyBenefits}
                      />
                    </FormControl>
                    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                      <Grid item xs={4}>
                        <Button
                          fullWidth
                          onClick={handleBack}
                          sx={{
                            backgroundColor: "#FFFFFF",
                            color: "#344054",
                            border: "1px solid #D0D5DD",
                            "&:hover": {
                              backgroundColor: "#fafafa",
                              borderColor: "#bfc4ca",
                            },
                          }}
                        >
                          Back
                        </Button>
                      </Grid>
                      <Grid item xs={8}>
                        <Button
                        fullWidth
                        onClick={handleCancel}
                        sx={{
                            backgroundColor: "#FF0000",
                            color: "white",
                            "&:hover": {
                            backgroundColor: "#CC0000",
                            },
                        }}
                        >
                        Cancel
                        </Button>
                    </Grid>
                      <Grid item xs={12}>
                        <Button
                          fullWidth
                          type="submit"
                          sx={{
                            backgroundColor: "#7F56D9",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "#6941C6",
                            },
                          }}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </>)}
                  {error && (
                  <Alert variant="soft" color="danger">
                    {error}
                  </Alert>
                )}
            </Stack>
          </form>
          </Box>
        </Grid>
        </Grid>
    <Footer />
    </>)
}