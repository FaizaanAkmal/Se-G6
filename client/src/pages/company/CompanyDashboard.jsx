import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// UI Imports
import {
  Grid,
  Typography,
  Button,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/joy";

// Custom Components Imports
import CompanyNavbar from "../../components/CompanyNavbar";
import CompanyJobCard from "../../components/CompanyJobCard";
import Footer from "../../components/Footer";

// Routes Import
import { apiRoutes, clientRoutes } from "../../routes.js";

export default function CompanyDashboard() {
  // navigation
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.userId;
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState("bookmarked");
  const [loading, setLoading] = useState(false);
  const [myJobs, setMyJobs] = useState([]);

  // Load jobs of this company
  const loadMyJobs = async () => {
    setLoading(true);
    try {
      // API call
      const response = await axios.get(apiRoutes.company.getMyJobs(userId));
      setMyJobs(response.data.myJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMyJobs();
  }, []);

  const getPinnedJobs = () => {
    return myJobs
      .filter((myJob) => myJob.isPinned)
      .sort((a, b) => new Date(b.pinnedAt) - new Date(a.pinnedAt));
  };

  const getOpenJobs = () => {
    return myJobs
      .filter((myJob) => myJob.job.status === "open")
      .sort((a, b) => new Date(b.job.datePosted) - new Date(a.job.datePosted));
  };

  const getClosedJobs = () => {
    return myJobs
      .filter((myJob) => myJob.job.status === "closed")
      .sort((a, b) => new Date(b.job.datePosted) - new Date(a.job.datePosted));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
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
            My Jobs
          </Typography>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
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
              {/* Bookmarked */}
              <Button
                variant={activeTab === "bookmarked" ? "outlined" : "plain"}
                size="lg"
                color="neutral"
                onClick={() => handleTabChange("bookmarked")}
                sx={{
                  borderRadius: 6,
                  bgcolor: activeTab === "bookmarked" ? "white" : "",
                }}
              >
                Bookmarked
              </Button>
              {/* Open*/}
              <Button
                variant={activeTab === "open" ? "outlined" : "plain"}
                size="lg"
                color="neutral"
                onClick={() => handleTabChange("open")}
                sx={{
                  borderRadius: 6,
                  bgcolor: activeTab === "open" ? "white" : "",
                }}
              >
                Open
              </Button>
              {/* Closed */}
              <Button
                variant={activeTab === "closed" ? "outlined" : "plain"}
                size="lg"
                color="neutral"
                onClick={() => handleTabChange("closed")}
                sx={{
                  borderRadius: 6,
                  bgcolor: activeTab === "closed" ? "white" : "",
                }}
              >
                Closed
              </Button>
            </Stack>
            {/* Post a job button */}
            <Button
              size="lg"
              onClick={() => {
                window.scrollTo(0, 0);
                navigate(clientRoutes.postAJob, {
                  state: { userId: userId },
                });
              }}
            >
              Post a Job
            </Button>
          </Stack>
          {/* Dashboard Content */}
          {/* Bookmarked Jobs */}
          {activeTab === "bookmarked" &&
            (() => {
              const pinnedJobs = getPinnedJobs();
              return pinnedJobs.length > 0 ? (
                <Stack spacing={2} mt={4}>
                  {pinnedJobs.map((myJob, index) => (
                    <CompanyJobCard
                      key={index}
                      userId={userId}
                      myJob={myJob}
                      setMyJobs={setMyJobs}
                    />
                  ))}
                </Stack>
              ) : (
                <Alert
                  size="lg"
                  sx={{
                    background: "#F9F9FB",
                    border: "1px solid #F2F4F7",
                  }}
                >
                  You haven't bookmarked any jobs. Click the bookmark icon on a
                  job to bookmark it 📌
                </Alert>
              );
            })()}
          {/* Open Jobs */}
          {activeTab === "open" &&
            (() => {
              const openJobs = getOpenJobs();
              return openJobs.length > 0 ? (
                <Stack spacing={2} mt={4}>
                  {openJobs.map((myJob, index) => (
                    <CompanyJobCard
                      key={index}
                      userId={userId}
                      myJob={myJob}
                      setMyJobs={setMyJobs}
                    />
                  ))}
                </Stack>
              ) : (
                <Alert
                  size="lg"
                  sx={{
                    background: "#F9F9FB",
                    border: "1px solid #F2F4F7",
                  }}
                >
                  You don't have any open jobs. Post a new job or reopen an old
                  job to get started! 🚀
                </Alert>
              );
            })()}
          {/* Closed Jobs */}
          {activeTab === "closed" &&
            (() => {
              const closedJobs = getClosedJobs();
              return closedJobs.length > 0 ? (
                <Stack spacing={2} mt={4}>
                  {closedJobs.map((myJob, index) => (
                    <CompanyJobCard
                      key={index}
                      userId={userId}
                      myJob={myJob}
                      setMyJobs={setMyJobs}
                    />
                  ))}
                </Stack>
              ) : (
                <Alert
                  size="lg"
                  sx={{
                    background: "#F9F9FB",
                    border: "1px solid #F2F4F7",
                  }}
                >
                  You don't have any closed jobs. Once you close a job, it will
                  appear here 📝
                </Alert>
              );
            })()}
          {/* Loading */}
          {loading && (
            <Grid container justifyContent="center" alignItems="center">
              <CircularProgress variant="soft" />
            </Grid>
          )}
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}
