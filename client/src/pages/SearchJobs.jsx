import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Global Constants
import {
  jobTypeOptions,
  environmentOptions,
  countryNames,
  experienceOptions,
  skillOptions,
  languageOptions,
  technologyOptions,
} from "../globalConstants";

// UI Imports
import {
  Typography,
  Button,
  Input,
  Stack,
  Select,
  Option,
  Autocomplete,
  Alert,
  Grid,
} from "@mui/joy";

// Custom Assets Imports
import jobSearchIcon from "../assets/jobSearchIcon.svg";
import sortIcon from "../assets/sortIcon.svg";

// Custom Components Imports
import DevNavbar from "../components/DevNavbar";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";

export default function SearchJobs() {
  // User input states
  const [searchQuery, setSearchQuery] = useState("");
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");
  const [environment, setEnvironment] = useState("");

  // Job search results states
  const [loading, setLoading] = useState(false);
  const [noMoreJobs, setNoMoreJobs] = useState(true);
  const [error, setError] = useState(null);

  // search jobs handler
  const searchJobs = async () => {
    setLoading(true);
    // API call to search jobs

    // Simulating API call
    setTimeout(() => {
      setLoading(false);
      // set noMoreJobs to false if there are more jobs to load (simulating)
      setNoMoreJobs(false);
    }, 2000);
  };

  // clear filters handler
  const clearFilters = () => {
    setSearchQuery("");
    setSkills([]);
    setLanguages([]);
    setTechnologies([]);
    setJobType("");
    setExperience("");
    setEnvironment("");
  };

  // change handlers for user inputs
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSkillsChange = (event, newValue) => {
    setSkills(newValue);
  };
  const handleLanguagesChange = (event, newValue) => {
    setLanguages(newValue);
  };
  const handleTechnologiesChange = (event, newValue) => {
    setTechnologies(newValue);
  };
  const handleJobTypeChange = (event, newValue) => {
    setJobType(newValue);
  };
  const handleExperienceChange = (event, newValue) => {
    setExperience(newValue);
  };
  const handleEnvironmentChange = (event, newValue) => {
    setEnvironment(newValue);
  };

  // load more jobs handler
  const loadMoreJobs = async () => {
    setLoading(true);
    // API call to load more jobs

    // Simulating API call
    setTimeout(() => {
      setLoading(false);
      // set noMoreJobs to false if there are more jobs to load (simulating)
      setNoMoreJobs(false);
    }, 2000);
  };

  return (
    <>
      <DevNavbar currentPage="search" />
      <Stack spacing={0}>
        {/* Gray Section */}
        <Grid
          container
          xs={12}
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            backgroundColor: "#F8F9FA",
          }}
        >
          <Grid
            item
            xs={12}
            md={10}
            sx={{
              p: 6,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Heading */}
            <Typography level="h1" sx={{ width: "100%" }} mb={2}>
              Search Jobs
            </Typography>
            {/* Subheading */}
            <Typography level="body-md" sx={{ mb: 4 }}>
              Browse the latest jobs in tech.
            </Typography>

            <Stack spacing={2} p={2} bgcolor="white" borderRadius={"12px"}>
              <Grid container spacing={1}>
                {/* Search Bar */}
                <Grid item xs={9}>
                  <Input
                    placeholder="Job title or skill..."
                    size="lg"
                    variant="plain"
                    sx={{
                      "--Input-focusedThickness": "0px",
                      backgroundColor: "white",
                    }}
                    startDecorator={
                      <img
                        src={jobSearchIcon}
                        alt="Search Icon"
                        style={{ height: "26px" }}
                      />
                    }
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                  />
                </Grid>

                {/* Button Group */}
                <Grid
                  item
                  xs={3}
                  container
                  spacing={2}
                  sx={{
                    justifyContent: "center",
                  }}
                >
                  {/* Clear Button */}
                  <Grid item xs={12} md={6}>
                    <Button
                      onClick={clearFilters}
                      variant="plain"
                      color="neutral"
                      fullWidth
                      size="lg"
                    >
                      Clear
                    </Button>
                  </Grid>
                  {/* Search Button */}
                  <Grid item xs={12} md={6}>
                    <Button
                      color="primary"
                      fullWidth
                      size="lg"
                      onClick={searchJobs}
                      loading={loading}
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              {/* Filters */}
              <Stack spacing={0} bgcolor="white" borderRadius={"12px"}>
                {/* First Line of Filters */}
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4} md={4}>
                    <Autocomplete
                      placeholder="Skills"
                      multiple
                      sx={{ backgroundColor: "white" }}
                      limitTags={1}
                      size="lg"
                      options={skillOptions}
                      onChange={handleSkillsChange}
                      value={skills}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <Autocomplete
                      placeholder="Programming Languages"
                      sx={{ backgroundColor: "white" }}
                      multiple
                      limitTags={1}
                      size="lg"
                      options={languageOptions}
                      onChange={handleLanguagesChange}
                      value={languages}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <Autocomplete
                      placeholder="Technologies"
                      sx={{ backgroundColor: "white" }}
                      multiple
                      limitTags={1}
                      size="lg"
                      options={technologyOptions}
                      onChange={handleTechnologiesChange}
                      value={technologies}
                    />
                  </Grid>
                </Grid>
                {/* Second Line of Filters */}
                <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
                  {/* Job Type */}
                  <Grid item xs={12} sm={4} md={4}>
                    <Autocomplete
                      placeholder="Job Type"
                      sx={{ backgroundColor: "white" }}
                      options={jobTypeOptions}
                      value={jobType}
                      size="lg"
                      limitTags={1}
                      onChange={handleJobTypeChange}
                    />
                  </Grid>
                  {/* Experience */}
                  <Grid item xs={12} sm={6} md={4}>
                    <Autocomplete
                      placeholder="Experience"
                      options={experienceOptions}
                      sx={{ backgroundColor: "white" }}
                      value={experience}
                      size="lg"
                      limitTags={1}
                      onChange={handleExperienceChange}
                    />
                  </Grid>
                  {/* Environment */}
                  <Grid item xs={12} sm={6} md={4}>
                    <Autocomplete
                      placeholder="Environment"
                      sx={{ backgroundColor: "white" }}
                      options={environmentOptions}
                      value={environment}
                      size="lg"
                      limitTags={1}
                      onChange={handleEnvironmentChange}
                    />
                  </Grid>
                </Grid>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        <Grid
          container
          xs={12}
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            p: 8,
          }}
        >
          <Grid
            item
            xs={12}
            md={10}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Sort Dropdown */}
            <Grid
              container
              spacing={2}
              alignItems="center"
              sx={{ mb: 4, justifyContent: "flex-end" }} // Right align the sort dropdown
            >
              <Grid item xs={12} sm={6} md={4}>
                <Select
                  placeholder="Sort by"
                  size="lg"
                  sx={{ width: "100%" }}
                  variant="outlined"
                  startDecorator={
                    <img
                      src={sortIcon}
                      alt="Sort Icon"
                      style={{ height: "22px" }}
                    />
                  }
                >
                  <Option value="newest">Newest</Option>
                  <Option value="oldest">Oldest</Option>
                  <Option value="relevance">Relevance</Option>
                </Select>
              </Grid>
            </Grid>

            {/* Job Cards */}
            <Stack spacing={2}>
              <JobCard />
              <JobCard />
              <JobCard />
              <JobCard />
            </Stack>
            {/* Pagination */}
            {noMoreJobs && (
              <Button
                variant="soft"
                color="primary"
                sx={{ borderRadius: 8, mt: 6 }}
                loading={loading}
                onClick={loadMoreJobs}
              >
                Load More
              </Button>
            )}
            {/* Error */}
            {error && (
              <Alert variant="error" sx={{ mt: 4 }}>
                {error}
              </Alert>
            )}
          </Grid>
        </Grid>
      </Stack>

      <Footer />
    </>
  );
}
