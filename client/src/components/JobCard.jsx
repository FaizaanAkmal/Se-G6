import  { useState,useEffect } from "react"; // Ensure useState is imported
import axios from "axios";
// UI Imports
import {
    Box,Card,
    CardContent,
    Chip,
    IconButton,
    Link,
    Typography,
    Stack,
    Avatar
} from "@mui/joy";
// Assets Imports
import companySizeIcon from "../assets/companySizeIcon.svg";
import timePostedIcon from "../assets/timePostedIcon.svg";
import bookmarkActiveIcon from "../assets/bookmarkActiveIcon.svg";
import bookmarkInactiveIcon from "../assets/bookmarkInactiveIcon.svg";
import { apiRoutes } from "../routes.js";

const JobCard = ({job, userId,bookmarkedJobs}) => {
    // State to manage bookmark toggle
    const [isBookmarked, setIsBookmarked] = useState(bookmarkedJobs.includes(job._id));

    useEffect(() => {
        setIsBookmarked(bookmarkedJobs.includes(job._id));
    }, [bookmarkedJobs, job._id]);


    // Handler function for bookmark togglex
    const handleBookmarkToggle = async () => {
        setIsBookmarked(!isBookmarked);
        try {
        if (isBookmarked) {
            await axios.post(apiRoutes.job.removeBookmark(job._id), { userId,job });
            console.log("Bookmark Removed");
        } else {
            await axios.post(apiRoutes.job.addBookmark(job._id), { userId,job });
            console.log("Bookmark Added");
        }
        } catch (error) {
        console.error("Error toggling bookmark:", error);
        }
    };


    // Calculate days ago
    const datePosted = new Date(job.datePosted);
    const currentDate = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const daysAgo = Math.round(Math.abs((currentDate - datePosted) / oneDay));

    // Handler function for card click
    const handleCardClick = () => {
        console.log("Card Clicked");
        // navigate to job details page
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
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems={"flex-start"}
                    >
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
                                        <Link
                                            level="h3"
                                            color="primary"
                                            sx={{ color: "#101828" }}
                                        >
                                            {job.title}
                                        </Link>
                                        {/* Key facts */}
                                        <Stack
                                            direction="row"
                                            spacing={2.5}
                                            alignItems={"center"}
                                        >
                                            {/* Company Name */}
                                            <Typography level="title-md">
                                                {job.postedBy.name}
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
                                                 {job.postedBy.size}
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
                                                {daysAgo === 0
                                                    ? 'Today'
                                                    : `${daysAgo} day${
                                                          daysAgo > 1 ? 's' : ''
                                                      } ago`}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                    {/* Bookmark Button */}
                                    <IconButton onClick={handleBookmarkToggle}>
                                        <img
                                            src={
                                                isBookmarked
                                                    ? bookmarkActiveIcon
                                                    : bookmarkInactiveIcon
                                            }
                                            width={"24px"}
                                            alt="Bookmark"
                                        />
                                    </IconButton>
                                </Stack>
                                {/* Job Tags */}
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    flexWrap="wrap"
                                    useFlexGap
                                >
                                    {/* Example Chips */}
                                    <Chip
                                        sx={{
                                            "--Chip-radius": "6px",
                                            borderColor: "#D0D5DD",
                                        }}
                                        variant="outlined"
                                    >
                                        {job.jobType}
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

export default JobCard;
