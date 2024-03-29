import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// UI Imports
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import Grid from "@mui/joy/Grid";

// Custom Components Imports
import DevNavbar from "../../components/DevNavbar";
import JobCard from "../../components/JobCard";
import Footer from "../../components/Footer";

export default function DevDashboard() {
    // State to keep track of the active tab
    const [activeTab, setActiveTab] = useState("All");
    const [loading, setLoading] = useState(false);
    const [noMoreJobs, setNoMoreJobs] = useState(true);

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

    // Handler to change the active tab
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === "Bookmarked") {
            // API call to get bookmarked jobs
        }
        if (tab === "Applied") {
            // API call to get applied jobs
        }
        if (tab === "All") {
            // API call to get all jobs
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
                    </Stack>
                    {/* Content based on active tab */}
                    {activeTab === "All" && (
                        <Stack spacing={2} mt={4}>
                            <JobCard />
                            <JobCard />
                            <JobCard />
                            <JobCard />
                        </Stack>
                    )}
                    {activeTab === "Bookmarked" && (
                        <div>{/* Content for Bookmarked */}</div>
                    )}
                    {activeTab === "Applied" && (
                        <div>{/* Content for Applied */}</div>
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
