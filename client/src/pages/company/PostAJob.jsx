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
import Footer from "../../components/Footer.jsx";

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
  FormHelperText,
} from "@mui/joy";

// Routes Import
import { apiRoutes, clientRoutes } from "../../routes.js";

export default function PostAJob() {
    // form fields state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [requirement, setRequirement] = useState("");
    const [preferredSkills, setPreferredSkills] = useState([]);
    const [preferredLanguages, setPreferredLanguages] = useState([]);
    const [preferredTechnologies, setPreferredTechnologies] = useState([]);
    const [experience, setExperience] = useState("");
    const [jobType, setJobType] = useState("");
    const [environment, setEnvironment] = useState("");
    const [compensation, setCompensation] = useState("");

  const [validCompensation, setValidCompensation] = useState(true);

  // state received
  const { userId } = useLocation().state;

  // navigation
  const navigate = useNavigate();

    // form validation
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // step state
    const [currentStep, setStep] = useState(1);

  // handle form field changes
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleRequirementChange = (e) => {
    setRequirement(e.target.value);
  };
  const handleSkillsChange = (e, value) => {
    setPreferredSkills(value);
  };
  const handleLanguagesChange = (e, value) => {
    setPreferredLanguages(value);
  };
  const handleTechnologiesChange = (e, value) => {
    setPreferredTechnologies(value);
  };
  const handleExperienceChange = (e, value) => {
    setExperience(value);
  };
  const handleJobTypeChange = (e, value) => {
    setJobType(value);
  };
  const handleEnvironmentChange = (e, value) => {
    setEnvironment(value);
  };
  const handleCompensationChange = (e) => {
    setCompensation(e.target.value);
  };

  // go to next step
  const handleNext = () => {
    // validate required form fields
    if (currentStep === 1) {
      if (!title || !description || !requirement) {
        setError("Please fill in all required fields.");
        return;
      }
    } else if (currentStep === 2) {
      if (!experience) {
        setError("Please select a preferred experience level.");
        return;
      }
    } else if (currentStep === 3) {
      if (!jobType || !environment) {
        setError("Please fill in all required fields.");
        return;
      }
    }

    setError("");

    // scroll to top of the page
    window.scrollTo(0, 0);

    // move to next step
    if (currentStep < 3) setStep(currentStep + 1);
  };

  // go to previous step
  const handleBack = () => {
    if (currentStep > 1) setStep(currentStep - 1);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // validate compensation if it is not empty
    if (compensation) {
      if (compensation < 1000 || compensation > 1000000) {
        setValidCompensation(false);
        setLoading(false);
        return;
      }
    }

    // create a data object to send in the request
    const requestData = {
      title,
      description,
      requirement,
      preferredSkills,
      preferredLanguages,
      preferredTechnologies,
      experience,
      jobType,
      environment,
      compensation,
      userId,
    };

    // go to next step
    const handleNext = () => {
        // validate required form fields
        if (currentStep === 1) {
            if (!title || !description || !requirement) {
                setError("Please fill in all required fields.");
                return;
            }
        } else if (currentStep === 2) {
            if (!experience) {
                setError("Please select a preferred experience level.");
                return;
            }
        } else if (currentStep === 3) {
            if (!jobType || !environment) {
                setError("Please fill in all required fields.");
                return;
            }
        }

        setError("");

        // scroll to top of the page
        window.scrollTo(0, 0);

        // move to next step
        if (currentStep < 3) setStep(currentStep + 1);
    };

    // go to previous step
    const handleBack = () => {
        if (currentStep > 1) setStep(currentStep - 1);
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // validate compensation if it is not empty
        if (compensation) {
            if (compensation < 1000 || compensation > 1000000) {
                setValidCompensation(false);
                setLoading(false);
                return;
            }
        }

        // create a data object to send in the request
        const requestData = {
            title,
            description,
            requirement,
            preferredSkills,
            preferredLanguages,
            preferredTechnologies,
            experience,
            jobType,
            environment,
            compensation,
            userId,
        };

        try {
            // Send a POST request to the server
            const response = await axios.post(
                apiRoutes.job.create,
                requestData
            );

            // Navigate to the dashboard or handle the response accordingly
            navigate(clientRoutes.companyDashboard, { userId: userId });
        } catch (error) {
            console.error("Error submitting form:", error);
            // Handle error state or display error message
        }

        setLoading(false);
    };

    return (
        <>
            <CompanyNavbar currentPage="postJob" />
            <Grid
                container
                sx={{
                    flexGrow: 1,
                    minHeight: "90vh",
                    justifyContent: "center",
                }}
            >
                <Grid
                    item
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
                        sx={{ mb: 2, textAlign: "left", width: "100%" }}
                    >
                        Create a Job Post 🚀
                    </Typography>
                    {/* Job Type */}
                    <FormControl required>
                      <FormLabel>What type of job is this?</FormLabel>
                      <Select
                        placeholder="e.g. Full-time"
                        value={jobType}
                        onChange={handleJobTypeChange}
                      >
                        {jobTypeOptions.map((option) => (
                          <Option key={option} value={option}>
                            {option}
                          </Option>
                        ))}
                      </Select>
                    </FormControl>
                    {/* Work Environment */}
                    <FormControl required>
                      <FormLabel>
                        What is the working environment for this position?
                      </FormLabel>
                      <Select
                        placeholder="e.g. Remote"
                        value={environment}
                        onChange={handleEnvironmentChange}
                      >
                        {environmentOptions.map((option) => (
                          <Option key={option} value={option}>
                            {option}
                          </Option>
                        ))}
                      </Select>
                    </FormControl>
                    {/* Compensation */}
                    <FormControl>
                      <FormLabel>Annual Compensation (in USD)</FormLabel>
                      <Input
                        type="number"
                        placeholder="e.g. $100,000"
                        onChange={handleCompensationChange}
                        value={compensation}
                        startDecorator="$"
                        error={!validCompensation}
                      />
                      <FormHelperText>
                        Please enter a number between 1,000 and 1,000,000
                      </FormHelperText>
                    </FormControl>
                    {/* Back + Submit Button */}
                    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                      {/* Back Button */}
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
                      {/* Submit Button */}
                      <Grid item xs={8}>
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
                          loading={loading}
                        >
                          Create Job
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                )}
                {/* Error Alert */}
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
