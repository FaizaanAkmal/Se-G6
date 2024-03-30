import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// UI Imports
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import Grid from "@mui/joy/Grid";

// Custom Components Imports
import CompanyNavbar from "../../components/CompanyNavbar";
import JobCard from "../../components/JobCard";
import Footer from "../../components/Footer";

export default function RecDashboard() {
    const navigate = useNavigate();
    const { userId } = useParams();
    console.log("UserID: ",userId)

    // State to keep track of the active tab
    const [activeTab, setActiveTab] = useState("Active");
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load jobs based on active tab
    const loadJobs = async () => {
        setLoading(true);
        try {
            // Simulating API call
            const response = await axios.get(`/api/jobs?status=${activeTab}`);
            setJobs(response.data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadJobs();
    }, [activeTab,userId]); // Reload jobs when activeTab changes

    // Handler to change the active tab
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    // Handler for "Post a Job" button
    const handlePostJob = () => {
        // Redirect to job posting page
        navigate(`../createJob/${userId}`);
    };

    return (
        <>
            <CompanyNavbar currentPage="dashboard" />
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
                        {activeTab === "Active" ? "Active Jobs" : "All Jobs"}
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
                            variant={activeTab === "Active" ? "outlined" : "plain"}
                            color="neutral"
                            size="lg"
                            sx={{
                                borderRadius: 6,
                                bgcolor: activeTab === "Active" ? "white" : "",
                            }}
                            onClick={() => handleTabChange("Active")}
                        >
                            Active
                        </Button>
                        <Button
                            variant={activeTab === "All" ? "outlined" : "plain"}
                            size="lg"
                            color="neutral"
                            onClick={() => handleTabChange("All")}
                            sx={{
                                borderRadius: 6,
                                bgcolor: activeTab === "All" ? "white" : "",
                            }}
                        >
                            All
                        </Button>
                    </Stack>
                    {/* Jobs */}
                    <Stack spacing={2} mt={4}>
                        {jobs.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </Stack>
                    {/* Post a Job Button */}
                    <Button
                        variant="soft"
                        color="primary"
                        sx={{ borderRadius: 8, mt: 6 }}
                        loading={loading}
                        onClick={handlePostJob}
                    >
                        Post a Job
                    </Button>
                </Grid>
            </Grid>
            <Footer />
        </>
    );
}
