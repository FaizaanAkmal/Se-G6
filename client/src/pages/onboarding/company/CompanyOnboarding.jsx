import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import onboardingIcon from "../../../assets/onboardingIcon.svg";
import Footer from "../../../components/Footer";
import {
    Grid, Box, Typography, Button, FormControl, FormLabel, Input, Stack,
    Select, Option, Textarea, Autocomplete, Alert
} from "../../../joyImports.jsx";
import {
    companySizes, companyTypes, industryTypes, countryNames
} from "../../../globalConstants";

export default function CompanyOnboarding() {
    const navigate = useNavigate();

    // State to control the visibility of form sections
    const [currentStep, setCurrentStep] = useState(1);

    // Form fields state
    const [companyName, setCompanyName] = useState("");
    const [website, setWebsite] = useState("");
    const [companyType, setCompanyType] = useState("");
    const [country, setCountry] = useState("");
    const [industry, setIndustry] = useState("");
    const [companySize, setCompanySize] = useState("");
    const [companyOverview, setCompanyOverview] = useState("");
    const [companyWorkCulture, setCompanyWorkCulture] = useState("");
    const [companyBenefits, setCompanyBenefits] = useState("");

    // Error handling state
    const [error, setError] = useState(null);

    // Navigate to the next form section
    const handleNext = () => {
        if (currentStep === 1) {
            if (!companyName || !website || !companyType || !country) {
                console.log(`companyName: ${companyName}`);
                console.log(`website: ${website}`);
                console.log(`companyType: ${companyType}`);
                console.log(`country: ${country}`);
                setError("Please fill in all the required fields");
                return;
            }
        } else if (currentStep === 2) {
            if (!industry || !companySize) {
                console.log(`companySize: ${companySize}`);
                console.log(`industry: ${industry}`);
                setError("Please fill in all the required fields");
                return;
            }
        } else if (currentStep === 3) {
            if (!companyOverview || !companyWorkCulture || !companyBenefits) {
                console.log(`companyOverview: ${companyOverview}`);
                console.log(`companyWorkCulture: ${companyWorkCulture}`);
                console.log(`companyBenefits: ${companyBenefits}`);
                setError("Please fill in all the required fields");
                return;
            }
        }

        setError(null);

        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    // Navigate to the previous form section
    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // create a new FormData object with the state data
        const requestData = {
            companyName,
            website,
            companyType,
            country,
            industry,
            companySize,
            companyOverview,
            companyWorkCulture,
            companyBenefits
        };
    
        console.log("Request data before sending:", requestData);

        try{ 
            const response = await axios.post('/company/onboarding',requestData)

            console.log(response.data)
            navigate("/dashboard")
        }
        catch(error){
            console.error("Error Submitting Form",error)
        }

    };

    return (
        <>
            <Grid
                container
                sx={{
                    flexGrow: 1,
                    minHeight: "100vh",
                    justifyContent: "center",
                }}
            >
                <Grid
                    item
                    xs={12}
                    md={4.5}
                    sx={{
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <img
                        src={onboardingIcon}
                        alt="onboardingIcon"
                        style={{ width: "56px", marginBottom: "30px" }}
                    />
                    <Typography level="h1" sx={{ mb: 2, textAlign: "center" }}>
                        Let’s set up your account
                    </Typography>
                    <Typography
                        level="body-md"
                        sx={{ mb: 4, textAlign: "center" }}
                    >
                        Please enter some basic information about your company.
                    </Typography>
                    <Box sx={{ width: "100%" }}>
                        <form onSubmit={handleSubmit}>
                            <Stack gap={4}>
                                {currentStep === 1 && (
                                    <>
                                        {/* Step 1: Basic Information */}
                                        <FormControl required>
                                            <FormLabel>
                                                What’s your company name?
                                            </FormLabel>
                                            <Input
                                                type="text"
                                                name="cname"
                                                placeholder="Enter company name"
                                                value={companyName}
                                                onChange={(e) =>
                                                    setCompanyName(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormControl required>
                                            <FormLabel>
                                                What&apos;s your website?
                                            </FormLabel>
                                            <Input
                                                type="url"
                                                name="website"
                                                placeholder="https://example.com"
                                                value={website}
                                                onChange={(e) =>
                                                    setWebsite(e.target.value)
                                                }
                                            />
                                        </FormControl>
                                        <FormControl required>
                                            <FormLabel>
                                                What type of company are you?
                                            </FormLabel>
                                            <Select
                                                name="companyType"
                                                placeholder="Select company type"
                                                onChange={(e, value) => {
                                                    setCompanyType(value);
                                                }}
                                                value={companyType}
                                            >
                                                {companyTypes.map((type) => (
                                                    <Option
                                                        key={type}
                                                        value={type}
                                                    >
                                                        {type}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl required>
                                            <FormLabel>
                                                Where is your company based in?
                                            </FormLabel>
                                            <Autocomplete
                                                options={countryNames}
                                                placeholder="Select country"
                                                onChange={(e, value) =>
                                                    setCountry(value)
                                                }
                                                value={country}
                                                
                                            />
                                        </FormControl>
                                        {/* // Only show the Next button if not on the
                                    last step */}
                                        {currentStep < 3 && (
                                            <Button
                                                onClick={handleNext}
                                                sx={{
                                                    backgroundColor: "#F9F5FF",
                                                    color: "#6941C6",
                                                    "&:hover": {
                                                        backgroundColor:
                                                            "#e3dcf7",
                                                    },
                                                }}
                                            >
                                                Next
                                            </Button>
                                        )}
                                    </>
                                )}
                                {currentStep === 2 && (
                                    <>
                                        {/* Step 2: Company Details */}
                                        <FormControl required>
                                            <FormLabel>
                                                What industry does your company
                                                belong to?
                                            </FormLabel>
                                            <Select
                                                name="industry"
                                                placeholder="Select industry"
                                                onChange={(e, value) =>
                                                    setIndustry(value)
                                                }
                                                value={industry}
                                            >
                                                {industryTypes.map((industry) => (
                                                    <Option
                                                        key={industry}
                                                        value={industry}
                                                    >
                                                        {industry}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl required>
                                            <FormLabel>
                                                What&rsquo;s your company size?
                                            </FormLabel>
                                            <Select
                                                name="companySize"
                                                placeholder="Select company size (no. of employees)"
                                                onChange={(e, value) =>
                                                    setCompanySize(value)
                                                }
                                                value={companySize}
                                            >
                                                {companySizes.map((size) => (
                                                    <Option
                                                        key={size}
                                                        value={size}
                                                    >
                                                        {size}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <Grid
                                            container
                                            spacing={2}
                                            sx={{ flexGrow: 1 }}
                                        >
                                            <Grid item xs={4}>
                                                <Button
                                                    fullWidth
                                                    onClick={handleBack}
                                                    sx={{
                                                        backgroundColor:
                                                            "#FFFFFF",
                                                        color: "#344054",
                                                        border: "1px solid #D0D5DD",
                                                        "&:hover": {
                                                            backgroundColor:
                                                                "#fafafa",
                                                            borderColor:
                                                                "#bfc4ca",
                                                        },
                                                    }}
                                                >
                                                    Back
                                                </Button>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Button
                                                    fullWidth
                                                    onClick={handleNext}
                                                    sx={{
                                                        backgroundColor:
                                                            "#F9F5FF",
                                                        color: "#6941C6",
                                                        "&:hover": {
                                                            backgroundColor:
                                                                "#e3dcf7",
                                                        },
                                                    }}
                                                >
                                                    Next
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </>
                                )}
                                {currentStep === 3 && (
                                    <>
                                        {/* Step 3: Company Culture */}
                                        <FormControl required>
                                            <FormLabel>
                                                Provide a brief overview of your
                                                company
                                            </FormLabel>
                                            <Textarea
                                                name="companyOverview"
                                                onChange={(e) => {
                                                    setCompanyOverview(
                                                        e.target.value
                                                    );
                                                }}
                                                minRows={3}
                                                maxRows={6}
                                                value={companyOverview}
                                            />
                                        </FormControl>
                                        <FormControl required>
                                            <FormLabel>
                                                 What&rsquo;s the work culture at your
                                                company?
                                            </FormLabel>
                                            <Textarea
                                                name="companyWorkCulture"
                                                onChange={(e) => {
                                                    setCompanyWorkCulture(
                                                        e.target.value
                                                    );
                                                }}
                                                minRows={3}
                                                maxRows={6}
                                                value={companyWorkCulture}
                                            />
                                        </FormControl>
                                        <FormControl required>
                                            <FormLabel>
                                                What benefits does your company
                                                offer?
                                            </FormLabel>
                                            <Textarea
                                                name="companyBenefits"
                                                onChange={(e) => {
                                                    setCompanyBenefits(
                                                        e.target.value
                                                    );
                                                }}
                                                minRows={3}
                                                maxRows={6}
                                                value={companyBenefits}
                                            />
                                        </FormControl>

                                        <Grid
                                            container
                                            spacing={2}
                                            sx={{ flexGrow: 1 }}
                                        >
                                            <Grid item xs={4}>
                                                <Button
                                                    fullWidth
                                                    onClick={handleBack}
                                                    sx={{
                                                        backgroundColor:
                                                            "#FFFFFF",
                                                        color: "#344054",
                                                        border: "1px solid #D0D5DD",
                                                        "&:hover": {
                                                            backgroundColor:
                                                                "#fafafa",
                                                            borderColor:
                                                                "#bfc4ca",
                                                        },
                                                    }}
                                                >
                                                    Back
                                                </Button>
                                            </Grid>

                                            <Grid item xs={8}>
                                                <Button
                                                    fullWidth
                                                    type="submit"
                                                    sx={{
                                                        backgroundColor:
                                                            "#7F56D9",
                                                        color: "white",
                                                        "&:hover": {
                                                            backgroundColor:
                                                                "#6941C6", // A slightly darker shade for hover state
                                                        },
                                                    }}
                                                >
                                                    Submit
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </>
                                )}
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
        </>
    );
}
