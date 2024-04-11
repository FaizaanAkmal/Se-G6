import React, { useState } from "react"; // Ensure useState is imported
import axios from "axios";

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
} from "@mui/joy";

// Assets Imports
import companySizeIcon from "../assets/companySizeIcon.svg";
import timePostedIcon from "../assets/timePostedIcon.svg";
import bookmarkActiveIcon from "../assets/bookmarkActiveIcon.svg";
import bookmarkInactiveIcon from "../assets/bookmarkInactiveIcon.svg";
import closeJobIcon from "../assets/closeJob.svg";

// Routes Import
import { apiRoutes } from "../routes";

// Function to calculate time ago
const calculateTimeAgo = (date) => {
  const currentDate = new Date();
  const timeDifference = currentDate - date;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years}yr`;
  } else if (months > 0) {
    return `${months}mo`;
  } else if (days > 0) {
    return `${days}d`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return `${seconds}s`;
  }
};

const CompanyJobCard = ({
  userId,
  myJob,
  setOpenPinnedJobs,
  setOpenJobs,
  setClosedJobs,
}) => {
  // Handler function for card click
  const handleCardClick = () => {
    console.log("Card Clicked");
    // navigate to job details page
  };

  // Handler function for bookmark toggle
  const handleBookmarkToggle = async (myJob) => {
    // console.log("bookmark toggled: ", myJob);
    try {
      myJob.isPinned = !myJob.isPinned;
      myJob.pinnedAt = myJob.isPinned ? Date.now() : null;

      const response = await axios.patch(apiRoutes.company.updateBookmark, {
        userId: userId,
        myJobId: myJob._id,
        isPinned: myJob.isPinned,
        pinnedAt: myJob.pinnedAt,
      });
      
      if (myJob.isPinned) {
        // remove from open jobs
        setOpenJobs((prevJobs) =>
          prevJobs.filter((j) => j.job._id !== myJob.job._id)
        );
        // insert in pinned jobs
        setOpenPinnedJobs((prevJobs) => [myJob, ...prevJobs]);
      } else {
        // remove from pinned jobs
        setOpenPinnedJobs((prevJobs) =>
          prevJobs.filter((j) => j.job._id !== myJob.job._id)
        );
        // insert in open jobs
        setOpenJobs((prevJobs) =>
          [...prevJobs, myJob].sort(
            (a, b) => new Date(b.job.datePosted) - new Date(a.job.datePosted)
          )
        );
      }
      console.log("Bookmark updated successfully");
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }
  };

  // Handler function for closing a job
  const handleCloseJob = async (myJob) => {
    try {
      const response = await axios.patch(apiRoutes.job.close, {
        userId: userId,
        myJobId: myJob._id,
        jobId: myJob.job._id,
      });
      if (myJob.isPinned) {
        setOpenPinnedJobs((prevJobs) =>
          prevJobs.filter((j) => j.job._id !== myJob.job._id)
        );
      } else {
        setOpenJobs((prevJobs) =>
          prevJobs.filter((j) => j.job._id !== myJob.job._id)
        );
      }
      myJob.isPinned = false;
      myJob.pinnedAt = null;
      setClosedJobs((prevJobs) =>
        [myJob, ...prevJobs].sort(
          (a, b) => new Date(b.job.datePosted) - new Date(a.job.datePosted)
        )
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error closing the job:", error);
    }
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
              alt="CompanyName"
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
                    {/* make the title change color to primary on hover */}
                    <Link level="h3" color="primary" sx={{ color: "#101828" }}>
                      {myJob.job.title}
                    </Link>
                    {/* Key facts */}
                    <Stack direction="row" spacing={2.5} alignItems={"center"}>
                      {/* Company Name */}
                      <Typography level="title-md">
                        {myJob.job.postedBy.name}
                      </Typography>
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
                  {/* CloseJob Button (TODO)*/}
                  {myJob.job.status === "open" && (
                    <IconButton onClick={() => handleCloseJob(myJob)}>
                      <img src={closeJobIcon} width={"24px"} alt="Bookmark" />
                    </IconButton>
                  )}
                  {/* Bookmark Button */}
                  {myJob.job.status === "open" && (
                    <IconButton onClick={() => handleBookmarkToggle(myJob)}>
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
                  )}
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
                    {myJob.job.jobType}
                  </Chip>
                  {/* Add more chips as needed */}
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default CompanyJobCard;
