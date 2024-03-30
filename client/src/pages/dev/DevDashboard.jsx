import { useState , useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// UI Imports
import { Grid, Typography, Button, Stack } from "@mui/joy";

// Custom Components Imports
import DevNavbar from "../../components/DevNavbar.jsx";
import JobCard from "../../components/JobCard.jsx";
import Footer from "../../components/Footer.jsx";

export default function DevDashboard() {
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(false);
  const [noMoreJobs, setNoMoreJobs] = useState(true);
  const [jobs, setJobs] = useState([]);
  const { userId } = useParams();

  const fetchJobsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/dev/getJobs");
      console.log("Response data,",response)
      setJobs(response.data);
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
          <Typography level="h1" sx={{ width: "100%" }} mb={4}>
            Your Job Feed
          </Typography>
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
              variant={activeTab === "Bookmarked" ? "outlined" : "plain"}
              size="lg"
              color="neutral"
              onClick={() => handleTabChange("Bookmarked")}
              sx={{
                borderRadius: 6,
                bgcolor: activeTab === "Bookmarked" ? "white" : "",
              }}
            >
              Bookmarked
            </Button>
            <Button
              variant={activeTab === "Applied" ? "outlined" : "plain"}
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
          {activeTab === "All" && (
            <Stack spacing={2} mt={4}>
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </Stack>
          )}
          {activeTab === "Bookmarked" && (
            <div>{/* Content for Bookmarked */}</div>
          )}
          {activeTab === "Applied" && <div>{/* Content for Applied */}</div>}
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
