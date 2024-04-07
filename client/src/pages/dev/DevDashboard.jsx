import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// UI Imports
import { Grid, Typography, Button, Stack } from "@mui/joy";

// Custom Components Imports
import DevNavbar from "../../components/DevNavbar.jsx";
import JobCard from "../../components/JobCard.jsx";
import Footer from "../../components/Footer.jsx";

// Routes Import
import { apiRoutes } from "../../routes.js";

export default function DevDashboard() {
    const [activeTab, setActiveTab] = useState("All");
    const [loading, setLoading] = useState(false);
    const [noMoreJobs, setNoMoreJobs] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [offeredJobs, setOfferedJobs] = useState([]);
    const [allJobs, setAllJobs] = useState([]);
    // navigation
    const navigate = useNavigate();

    // state received
    const location = useLocation();
    const userId = location.state.userId;

    //Fetching All Jobs Together
    const fetchJobsData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(apiRoutes.job.getAll, {
                params: { userId }
            });
            console.log("Response data,", response.data);

            const { allJobs, bookmarkedJobs, appliedJobs, offeredJobs } = response.data;
            setAllJobs(allJobs);
            setJobs(allJobs);
            setBookmarkedJobs(bookmarkedJobs);
            setAppliedJobs(appliedJobs);
            setOfferedJobs(offeredJobs);

            setNoMoreJobs(false);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchJobsData();
    }, []);

    const loadMoreJobs = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setNoMoreJobs(false);
        }, 2000);
    };

    // Handler to change the active tab
    const handleTabChange = async (tab) => {
        setActiveTab(tab);
        switch (tab) {
            case "All":
                setJobs(allJobs);
                break;
            case "Bookmarked":
                setJobs(bookmarkedJobs);
                break;
            case "Applied":
                setJobs(appliedJobs);
                break;
            case "Job Offers":
                setJobs(offeredJobs);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <DevNavbar currentPage="dashboard" />
            <Grid
                container
                sx={{
                    flexGrow: 1,
                    justifyContent: "center",
                    minHeight: "80vh",
                }}
            >
                <Grid
                    item
                    xs={12}
                    md={8}
                    sx={{
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {/* Page Title */}
                    <Typography level="h1" sx={{ width: "100%" }} mb={4}>
                        Your Job Feed
                    </Typography>
                    {/* Tabs */}
                    <Stack
                        direction="row"
                        spacing={1}
                        p={1.2}
                        bgcolor={"#F9F9FB"}
                        sx={{
                            width: "fit-content",
                            borderRadius: 8,
                            border: "1px solid #F2F4F7",
                        }}
                    >
                        {/* Tabs with active state handling */}
                        <Button
                            variant={activeTab === "All" ? "outlined" : "plain"}
                            color="neutral"
                            size="lg"
                            sx={{
                                borderRadius: 6,
                                bgcolor: activeTab === "All" ? "white" : "",
                            }}
                            onClick={() => handleTabChange("All")}
                        >
                            All
                        </Button>
                        <Button
                            variant={
                                activeTab === "Bookmarked"
                                    ? "outlined"
                                    : "plain"
                            }
                            size="lg"
                            color="neutral"
                            onClick={() => handleTabChange("Bookmarked")}
                            sx={{
                                borderRadius: 6,
                                bgcolor:
                                    activeTab === "Bookmarked" ? "white" : "",
                            }}
                        >
                            Bookmarked
                        </Button>
                        <Button
                            variant={
                                activeTab === "Applied" ? "outlined" : "plain"
                            }
                            size="lg"
                            color="neutral"
                            onClick={() => handleTabChange("Applied")}
                            sx={{
                                borderRadius: 6,
                                bgcolor: activeTab === "Applied" ? "white" : "",
                            }}
                        >
                            Applied
                        </Button>
                        <Button
                            variant={
                                activeTab === "Job Offers"
                                    ? "outlined"
                                    : "plain"
                            }
                            size="lg"
                            color="neutral"
                            onClick={() => handleTabChange("Job Offers")}
                            sx={{
                                borderRadius: 6,
                                bgcolor:
                                    activeTab === "Job Offers" ? "white" : "",
                            }}
                        >
                            Job Offers
                        </Button>
                    </Stack>
                    {/* Content based on active tab */}
                    {activeTab === "All" && (
                        <Stack spacing={2} mt={4}>
                            {jobs.map((job) => (
                                <JobCard
                                    key={job._id}
                                    job={job}
                                    userId={userId}
                                    setBookmarkedJobs={setBookmarkedJobs}
                                    bookmarkedJobs={bookmarkedJobs}
                                    appliedJobs={appliedJobs}
                                    offeredJobs={offeredJobs}
                                    
                                />
                            ))}
                        </Stack>
                    )}
                    {activeTab === "Bookmarked" && (
                        <Stack spacing={2} mt={4}>
                            {jobs.map((job) => (
                                <JobCard
                                    key={job._id}
                                    job={job}
                                    userId={userId}
                                    setBookmarkedJobs={setBookmarkedJobs}
                                    bookmarkedJobs={bookmarkedJobs}
                                    appliedJobs={appliedJobs}
                                    offeredJobs={offeredJobs}
                                    
                                />
                            ))}
                        </Stack>
                    )}
                    {activeTab === "Applied" && (
                        <Stack spacing={2} mt={4}>
                            {jobs.map((job) => (
                                <JobCard
                                    key={job._id}
                                    job={job}
                                    userId={userId}
                                    setBookmarkedJobs={setBookmarkedJobs}
                                    bookmarkedJobs={bookmarkedJobs}
                                    appliedJobs={appliedJobs}
                                    offeredJobs={offeredJobs}
                                    
                                />
                            ))}
                        </Stack>
                    )}

                    {activeTab === "Job Offers" && (
                        <Stack spacing={2} mt={4}>
                            {jobs.map((job) => (
                                <JobCard
                                    key={job._id}
                                    job={job}
                                    userId={userId}
                                    setBookmarkedJobs={setBookmarkedJobs}
                                    bookmarkedJobs={bookmarkedJobs}
                                    appliedJobs={appliedJobs}
                                    offeredJobs={offeredJobs}
                                    
                                />
                            ))}
                        </Stack>
                    )}

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
                </Grid>
            </Grid>
            <Footer />
        </>
    );
}
