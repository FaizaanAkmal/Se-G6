import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// UI Imports
import { Grid, Typography, Button, Stack, Divider } from "@mui/joy";

// Custom Components Imports
import CompanyNavbar from "../../components/CompanyNavbar";
import CompanyJobCard from "../../components/CompanyJobCard";
import Footer from "../../components/Footer";

// Routes Import
import { apiRoutes, clientRoutes } from "../../routes.js";

export default function CompanyDashboard() {
  // navigation
  const navigate = useNavigate();

  // state received
  const { userId } = useLocation().state;

  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState("open");
  const [loading, setLoading] = useState(false);
  const [openPinnedJobs, setOpenPinnedJobs] = useState([]);
  const [openJobs, setOpenJobs] = useState([]);
  const [closedJobs, setClosedJobs] = useState([]);

  // Load jobs of this company
  const loadMyJobs = async () => {
    setLoading(true);
    try {
      // API call
      const response = await axios.get(apiRoutes.company.getMyJobs(userId));
      setOpenPinnedJobs(response.data.openPinnedJobs);
      setOpenJobs(response.data.openJobs);
      setClosedJobs(response.data.closedJobs);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMyJobs();
  }, []);

  // Handler to change the active tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleClick = () => {
    // Redirect to job posting page
    navigate(clientRoutes.JobPost);
  };

  return (
    <>
      <CompanyNavbar currentPage="dashboard" userId={userId} />
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
            My Jobs
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
              variant={activeTab === "open" ? "outlined" : "plain"}
              color="neutral"
              size="lg"
              sx={{
                borderRadius: 6,
                bgcolor: activeTab === "open" ? "white" : "",
              }}
              onClick={() => handleTabChange("open")}
            >
              Open ({openPinnedJobs.length + openJobs.length})
            </Button>
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
              Closed ({closedJobs.length})
            </Button>
          </Stack>
          {/* MyJobs */}
          {activeTab === "open" && (
            <>
              <Stack spacing={2} mt={4}>
                {openPinnedJobs.map((myJob, index) => (
                  <CompanyJobCard
                    key={index}
                    userId={userId}
                    myJob={myJob}
                    setOpenPinnedJobs={setOpenPinnedJobs}
                    setOpenJobs={setOpenJobs}
                    setClosedJobs={setClosedJobs}
                  />
                ))}
                <Divider />
              </Stack>
              <Stack spacing={2} mt={4}>
                {openJobs.map((myJob, index) => (
                  <CompanyJobCard
                    key={index}
                    userId={userId}
                    myJob={myJob}
                    setOpenPinnedJobs={setOpenPinnedJobs}
                    setOpenJobs={setOpenJobs}
                    setClosedJobs={setClosedJobs}
                  />
                ))}
              </Stack>
            </>
          )}
          {activeTab === "closed" && (
            <Stack spacing={2} mt={4}>
              {closedJobs.map((myJob, index) => (
                <CompanyJobCard key={index} myJob={myJob} />
              ))}
            </Stack>
          )}
          <Button
            variant="soft"
            color="primary"
            sx={{ borderRadius: 8, mt: 6 }}
            loading={loading}
            onClick={handleClick}
          >
            Testing Single Job
          </Button>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}
