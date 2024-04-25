import React, { useState } from "react"; // Ensure useState is imported
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

// UI Imports
import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Link,
  Typography,
  Stack,
  Avatar,
  Grid,
  Button,
  Snackbar,
} from "@mui/joy";

// Assets Imports
import companySizeIcon from "../assets/companySizeIcon.svg";
import timePostedIcon from "../assets/timePostedIcon.svg";
import bookmarkActiveIcon from "../assets/bookmarkActiveIcon.svg";
import bookmarkInactiveIcon from "../assets/bookmarkInactiveIcon.svg";
import jobClosedIcon from "../assets/jobClosedIcon.svg";
import jobOpenIcon from "../assets/jobOpenIcon.svg";
import openTheJobIcon from "../assets/openTheJobIcon.svg";
import closeTheJobIcon from "../assets/closeTheJobIcon.svg";

// Routes Import
import { apiRoutes, clientRoutes } from "../routes";

// Helper Function
import calculateTimeAgo from "../utils/calculateTimeAgo";

const CompanyJobCard = ({ userId, myJob, setMyJobs }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  // Handler function for card click
  const handleCardClick = () => {
    // console.log("TESTING", myJob);
    if (myJob.job.status === "closed") return;
    window.scrollTo(0, 0);
    navigate(clientRoutes.companyIndividualJob, { state: myJob.job });
  };

  // Handler function for bookmark toggle
  const handleBookmarkToggle = async (myJob) => {
      // console.log("bookmark toggled: ", myJob);
      setLoading(true);
    try {
      myJob.isPinned = !myJob.isPinned;
      myJob.pinnedAt = myJob.isPinned ? Date.now() : null;

      const response = await axios.patch(apiRoutes.company.updateBookmark, {
        userId: userId,
        myJobId: myJob._id,
        isPinned: myJob.isPinned,
        pinnedAt: myJob.pinnedAt,
      });

      // update this job in the myJobs array
      setMyJobs((prevMyJobs) => {
        return prevMyJobs.map((job) => {
          if (job._id === myJob._id) {
            return {
              ...job,
              isPinned: myJob.isPinned,
              pinnedAt: myJob.pinnedAt,
            };
          }
          return job;
        });
      });
      console.log("Bookmark updated successfully");
    } catch (error) {
      console.error("Error updating bookmark:", error);
      }
      setLoading(false);
  };

  // Handler function for closing a job
  const handleCloseJob = async (myJob) => {
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const response = await axios.patch(apiRoutes.job.close, {
        userId: userId,
        myJobId: myJob._id,
        jobId: myJob.job._id,
      });
      // update this job in the myJobs array
      setMyJobs((prevMyJobs) => {
        return prevMyJobs.map((job) => {
          if (job._id === myJob._id) {
            return {
              ...job,
              job: {
                ...job.job,
                status: "closed",
              },
            };
          }
          return job;
        });
      });
      console.log(response.data.message);
      setSuccess("Job closed successfully!");
    } catch (error) {
      console.error("Error closing the job:", error);
      setError("Error closing the job");
    } finally {
      setLoading(false);
      setOpenSnackbar(true);
    }
  };

  const handleOpenJob = async (myJob) => {
    // TODO: Complete this function

    setLoading(true);
    setSuccess(null);
    setError(null);
    // simulating API call
    setTimeout(() => {
      setLoading(false);
      setOpenSnackbar(true);
      setSuccess("Job reopened successfully!");
    }, 2000);
  };

  return (
    <>
      <Card
        variant="outlined"
        size="md"
        sx={{
          borderRadius: "12px",
          border: "1px solid #D0D5DD",
          boxShadow: "none",
          backgroundColor: "#fff",
        }}
      >
        <CardContent>
          <Stack direction="row" spacing={2} alignItems={"flex-start"}>
            {/* Company Logo */}
            <Avatar
              size="lg"
              alt={myJob.job.postedBy.name}
              src="companyLogo"
              color="primary"
            />
            <Box sx={{ width: "100%" }}>
              <Stack direction={"column"} spacing={1.5}>
                {/* Key Facts + Save Button */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  spacing={2}
                >
                  {/* Key Info */}
                  <Stack
                    direction={"column"}
                    spacing={0.5}
                    onClick={handleCardClick}
                    sx={{ cursor: "pointer" }}
                  >
                    {/* Job Title */}
                    <Link
                      level="h3"
                      color={
                        myJob.job.status === "closed" ? "neutral" : "primary"
                      }
                      sx={{ color: "#101828" }}
                      disabled={myJob.job.status === "closed"}
                    >
                      {myJob.job.title}
                    </Link>
                    {/* Key facts */}
                    <Stack direction="row" spacing={2.5} alignItems={"center"}>
                      {/* Company Name */}
                      <Typography level="title-md">
                        {myJob.job.postedBy.name}
                      </Typography>

                      {/* Job Open */}
                      {myJob.job.status === "open" && (
                        <Typography
                          level="body-md"
                          sx={{
                            color: "#6941C6",
                          }}
                          startDecorator={
                            <img src={jobOpenIcon} width={"20px"} />
                          }
                        >
                          Open
                        </Typography>
                      )}
                      {/* Job Closed */}
                      {myJob.job.status === "closed" && (
                        <Typography
                          level="body-md"
                          sx={{
                            color: "#FB6514",
                          }}
                          startDecorator={
                            <img src={jobClosedIcon} width={"20px"} />
                          }
                        >
                          Closed
                        </Typography>
                      )}
                      {/* Company Size */}
                      <Typography
                        level="body-md"
                        startDecorator={
                          <img
                            src={companySizeIcon}
                            width={"20px"}
                            alt="Company Size"
                          />
                        }
                      >
                        {myJob.job.postedBy.size}
                      </Typography>
                      {/* Time Posted */}
                      <Typography
                        level="body-md"
                        startDecorator={
                          <img
                            src={timePostedIcon}
                            width={"20px"}
                            alt="Time Posted"
                          />
                        }
                      >
                        {calculateTimeAgo(new Date(myJob.job.datePosted))}
                      </Typography>
                    </Stack>
                  </Stack>
                  {/* CloseJob Button (TODO)
                                    {myJob.job.status === "open" && (
                                        <IconButton
                                            onClick={() =>
                                                handleCloseJob(myJob)
                                            }
                                        >
                                            <img
                                                src={closeJobIcon}
                                                width={"24px"}
                                                alt="Bookmark"
                                            />
                                        </IconButton>
                                    )} */}
                  {/* Bookmark Button */}
                  <IconButton onClick={() => handleBookmarkToggle(myJob)} loading={loading}>
                    <img
                      src={
                        myJob.isPinned
                          ? bookmarkActiveIcon
                          : bookmarkInactiveIcon
                      }
                      width={"24px"}
                      alt="Bookmark"
                    />
                  </IconButton>
                </Stack>
                {/* Job Tags */}
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {/* Example Chips */}
                  <Chip
                    sx={{
                      "--Chip-radius": "6px",
                      borderColor: "#D0D5DD",
                    }}
                    variant="outlined"
                  >
                    {myJob.job.preferredLanguages[0]}
                  </Chip>
                  <Chip
                    sx={{
                      "--Chip-radius": "6px",
                      borderColor: "#D0D5DD",
                    }}
                    variant="outlined"
                  >
                    {myJob.job.jobType}
                  </Chip>
                  <Chip
                    sx={{
                      "--Chip-radius": "6px",
                      borderColor: "#D0D5DD",
                    }}
                    variant="outlined"
                  >
                    {myJob.job.experience}
                  </Chip>
                </Stack>
                {/* Close/Open Job Buttons */}
                <Grid container justifyContent="flex-start" alignItems="center">
                  {/* Close Job Button */}
                  {myJob.job.status === "open" && (
                    <Grid xs={2}>
                      <Button
                        variant="outlined"
                        fullWidth
                        startDecorator={
                          <img
                            src={closeTheJobIcon}
                            width={"20px"}
                            alt="Close Job"
                          />
                        }
                        color="neutral"
                        sx={{ "--Button-gap": "4px" }}
                        loading={loading}
                        onClick={() => handleCloseJob(myJob)}
                      >
                        Close Job
                      </Button>
                    </Grid>
                  )}
                  {/* Open Job Button */}
                  {myJob.job.status === "closed" && (
                    <Grid xs={2}>
                      <Button
                        variant="soft"
                        fullWidth
                        startDecorator={
                          <img
                            src={openTheJobIcon}
                            width={"18px"}
                            alt="Accept Offer"
                          />
                        }
                        sx={{ "--Button-gap": "4px" }}
                        loading={loading}
                        onClick={() => handleOpenJob(myJob)}
                      >
                        Reopen Job
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
      {/* Snackbar */}
      <Snackbar
        variant="soft"
        color={success ? "success" : "danger"}
        open={openSnackbar}
        size="lg"
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        endDecorator={
          <Button
            onClick={() => setOpenSnackbar(false)}
            size="sm"
            variant="soft"
            color={success ? "success" : "danger"}
          >
            Dismiss
          </Button>
        }
      >
        {success ? success : error}
      </Snackbar>
    </>
  );
};

export default CompanyJobCard;
