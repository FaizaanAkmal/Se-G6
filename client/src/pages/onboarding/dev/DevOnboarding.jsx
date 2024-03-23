import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Global constants
import {
    jobTypeOptions,
    environmentOptions,
    countryNames,
    experienceOptions,
    skillOptions,
    languageOptions,
    technologyOptions,
} from "../../../globalConstants";

// UI imports
import Grid from "@mui/joy/Grid";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Textarea from "@mui/joy/Textarea";
import Autocomplete from "@mui/joy/Autocomplete";
import Alert from "@mui/joy/Alert";

// custom assets
import onboardingIcon from "../../../assets/onboardingIcon.svg";
import githubIcon from "../../../assets/githubIcon.svg";
import linkIcon from "../../../assets/linkIcon.svg";

export default function DevOnboarding() {
    // state management
    const [country, setCountry] = useState("");
    const [experience, setExperience] = useState("");
    const [bio, setBio] = useState("");
    const [skills, setSkills] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [technologies, setTechnologies] = useState([]);
    const [interestedJobType, setInterestedJobType] = useState("");
    const [environmentPreference, setEnvironmentPreference] = useState("");
    const [portfolioLink, setPortfolioLink] = useState("");
    const [githubLink, setGithubLink] = useState("");

    // form validation
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // navigation
    const navigate = useNavigate();

    // event handlers
    const handleCountryChange = (e, value) => {
        setCountry(value);
    };
    const handleExperienceChange = (e, value) => {
        setExperience(value);
    };
    const handleBioChange = (e) => {
        setBio(e.target.value);
    };
    const handleSkillsChange = (e, value) => {
        setSkills(value);
    };
    const handleLanguagesChange = (e, value) => {
        setLanguages(value);
    };
    const handleTechnologiesChange = (e, value) => {
        setTechnologies(value);
    };
    const handleJobTypeChange = (e, value) => {
        setInterestedJobType(value);
    };
    const handleEnvironmentChange = (e, value) => {
        setEnvironmentPreference(value);
    };
    const handlePortfolioLinkChange = (e) => {
        setPortfolioLink(e.target.value);
    };
    const handleGithubLinkChange = (e) => {
        setGithubLink(e.target.value);
    };
    // form submission handler
    const handleSubmit = async (e) => {
        // print form data after 1 second
        e.preventDefault();
        setLoading(true);
        setError("");

        setTimeout(() => {
            alert(
                "Form data: " +
                    JSON.stringify(
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
                        null,
                        2
                    )
            );
            setLoading(false);
        }, 1000);
    };

    return (
        <Grid
            container
            sx={{ flexGrow: 1, minHeight: "100vh", justifyContent: "center" }}
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
                    alt="onboarding icon"
                    style={{ width: "56px", marginBottom: "30px" }}
                />
                <Typography level="h1" sx={{ mb: 2, textAlign: "center" }}>
                    Let’s set up your account
                </Typography>
                <Typography level="body-md" sx={{ mb: 4, textAlign: "center" }}>
                    Please enter some basic information about yourself to get
                    started.
                </Typography>
                <Box sx={{ width: "100%" }}>
                    <form onSubmit={handleSubmit}>
                        <Stack gap={4}>
                            {/* Country */}
                            <FormControl required>
                                <FormLabel>Where are you based in?</FormLabel>
                                <Autocomplete
                                    name="country"
                                    options={countryNames}
                                    placeholder="Select country"
                                    onChange={handleCountryChange}
                                />
                            </FormControl>
                            {/* Experience */}
                            <FormControl required>
                                <FormLabel>
                                    How many years of experience do you have?
                                </FormLabel>
                                <Select
                                    name="experience"
                                    placeholder="Select experience (in years)"
                                    onChange={handleExperienceChange}
                                >
                                    {experienceOptions.map((option) => (
                                        <Option key={option} value={option}>
                                            {option}
                                        </Option>
                                    ))}
                                </Select>
                            </FormControl>
                            {/* Bio */}
                            <FormControl required>
                                <FormLabel>
                                    Tell us a little about yourself
                                </FormLabel>
                                <Textarea
                                    name="Bio"
                                    placeholder="Enter a short bio/description..."
                                    onChange={handleBioChange}
                                    minRows={4}
                                    maxRows={6}
                                />
                            </FormControl>
                            {/* Skills */}
                            <FormControl>
                                <FormLabel>
                                    Skills (select all that apply)
                                </FormLabel>
                                <Autocomplete
                                    name="skills"
                                    options={skillOptions}
                                    placeholder="Select skills"
                                    multiple
                                    onChange={handleSkillsChange}
                                />
                            </FormControl>
                            {/* Programming Languages */}
                            <FormControl>
                                <FormLabel>
                                    Programming Languages (select all that
                                    apply)
                                </FormLabel>
                                <Autocomplete
                                    name="languages"
                                    options={languageOptions}
                                    placeholder="Select languages"
                                    multiple
                                    onChange={handleLanguagesChange}
                                />
                            </FormControl>
                            {/* Technologies */}
                            <FormControl>
                                <FormLabel>
                                    Technologies (select all that apply)
                                </FormLabel>
                                <Autocomplete
                                    name="technologies"
                                    options={technologyOptions}
                                    placeholder="Select technologies"
                                    onChange={handleTechnologiesChange}
                                    multiple
                                />
                            </FormControl>
                            {/* Job Type */}
                            <FormControl required>
                                <FormLabel>
                                    What’s your interested job type?
                                </FormLabel>
                                <Select
                                    name="jobType"
                                    placeholder="Select job type"
                                    onChange={handleJobTypeChange}
                                >
                                    {jobTypeOptions.map((option) => (
                                        <Option key={option} value={option}>
                                            {option}
                                        </Option>
                                    ))}
                                </Select>
                            </FormControl>
                            {/* Environment Preference */}
                            <FormControl required>
                                <FormLabel>
                                    What’s your environment preference?
                                </FormLabel>
                                <Select
                                    name="environment"
                                    placeholder="Select environment"
                                    onChange={handleEnvironmentChange}
                                >
                                    {environmentOptions.map((option) => (
                                        <Option key={option} value={option}>
                                            {option}
                                        </Option>
                                    ))}
                                </Select>
                            </FormControl>
                            {/* Portfolio Link */}
                            <FormControl>
                                <FormLabel>
                                    Link to your portfolio (optional)
                                </FormLabel>
                                <Input
                                    name="portfolioLink"
                                    type="url"
                                    placeholder="https://www.example.com"
                                    onChange={handlePortfolioLinkChange}
                                    startDecorator={
                                        <img
                                            src={linkIcon}
                                            alt="link icon"
                                            style={{ width: "20px" }}
                                        />
                                    }
                                />
                            </FormControl>
                            {/* Github Link */}
                            <FormControl>
                                <FormLabel>
                                    Link to your Github profile (optional)
                                </FormLabel>
                                <Input
                                    name="githubLink"
                                    type="url"
                                    placeholder="https://github.com/username"
                                    onChange={handleGithubLinkChange}
                                    startDecorator={
                                        <img
                                            src={githubIcon}
                                            alt="github icon"
                                            style={{ width: "20px" }}
                                        />
                                    }
                                />
                            </FormControl>
                            {/* Submission Button */}
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
                                Complete Profile
                            </Button>
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
    );
}
