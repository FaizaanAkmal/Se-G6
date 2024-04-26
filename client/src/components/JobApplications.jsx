import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Route Imports
import { apiRoutes, clientRoutes } from "../routes";

// Custom Components
import ApplicantCardNew from "./ApplicantCardNew";

// UI Imports
import {
  Typography,
  Button,
  Stack,
  Chip,
  IconButton,
  Grid,
  Card,
  CardContent,
  Link,
  Avatar,
  Alert,
} from "@mui/joy";

export default function JobApplications({ job }) {
  const [activeTab, setActiveTab] = useState("Pending");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [applicants, setApplicants] = useState({
    pending: [],
    rejected: [],
    shortlisted: [],
    offered: [],
    hired: [],
  });

  // console.log("Job applications: ",job._id)

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apiRoutes.job.getJobApplicants, {
          params: { jobId: job._id },
        });
        setApplicants({
          pending: response.data.applicants,
          rejected: response.data.rejected,
          shortlisted: response.data.shortlisted,
          offered: response.data.offered,
          hired: response.data.accepted,
        });
        // console.log(applicants.pending);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching applicants:", error);
        setError("Error fetching applicants. Please try again.");
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const getApplicantsByTab = () => {
    switch (activeTab) {
      case "Pending":
        return applicants.pending || [];
      case "Rejected":
        return applicants.rejected || [];
      case "Shortlisted":
        return applicants.shortlisted || [];
      case "Offered":
        return applicants.offered || [];
      case "Hired":
        return applicants.hired || [];
      default:
        return [];
    }
  };

  return (
    <Grid
      container
      flexGrow
      justifyContent={"center"}
      backgroundColor={"#F8F9FA"}
    >
      <Grid md={10} p={6} display={"flex"} flexDirection={"column"}>
        <Stack spacing={4}>
          <Stack spacing={3}>
            <Typography level="h1">Applications</Typography>
            {/* Tabs */}
            <Stack
              direction="row"
              spacing={1}
              p={1.2}
              bgcolor={"#FFFFFF"}
              sx={{
                width: "fit-content",
                borderRadius: 8,
                border: "1px solid #F2F4F7",
              }}
            >
              {/* Tabs with active state handling */}
              {["Pending", "Rejected", "Shortlisted", "Offered", "Hired"].map(
                (tab, index) => (
                  <Button
                    key={index}
                    variant={activeTab === tab ? "outlined" : "plain"}
                    size="lg"
                    color="neutral"
                    onClick={() => handleTabChange(tab)}
                    sx={{
                      borderRadius: 6,
                      bgcolor: activeTab === tab ? "white" : "",
                    }}
                  >
                    {tab}
                  </Button>
                )
              )}
            </Stack>
            {/* Render applicants based on active tab */}
            <Stack spacing={2}>
              {getApplicantsByTab().map((applicant, index) => (
                <ApplicantCardNew
                  key={index}
                  applicant={applicant}
                  jobId={job._id}
                  tab={activeTab}
                  handleTabChange={handleTabChange}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}
