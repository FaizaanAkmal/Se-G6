import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Routes
import { clientRoutes } from "../routes";

// Custom Assets
import arrowLeftIcon from "../assets/arrowLeftIcon.svg";
// Assets Imports
import companySizeIcon from "../assets/companySizeIcon.svg";
import timePostedIcon from "../assets/timePostedIcon.svg";
import bookmarkActiveIcon from "../assets/bookmarkActiveIcon.svg";
import bookmarkInactiveIcon from "../assets/bookmarkInactiveIcon.svg";
import appliedIcon from "../assets/appliedIcon.svg";
import offerAcceptedIcon from "../assets/offerAcceptedIcon.svg";
import offerRejectedIcon from "../assets/offerRejectedIcon.svg";
import offerPendingIcon from "../assets/offerPendingIcon.svg";
import acceptIcon from "../assets/acceptIcon.svg";
import rejectIcon from "../assets/rejectIcon.svg";

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
} from "@mui/joy";

export default function DevJobRecs() {
    // View All Jobs Handler

    const navigate = useNavigate();

    const viewAllJobsHandler = () => {
        // Navigate to the search jobs page
        navigate(clientRoutes.searchJobs);
    };

    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleBookmarkToggle = () => {
        setIsBookmarked(!isBookmarked);
    };

    const handleCardClick = () => {
        // Redirect to job details page
    };

    return (
        <>
            <Grid
                container
                flexGrow
                justifyContent={"center"}
                backgroundColor={"#F8F9FA"}
            >
                <Grid
                    item
                    md={10}
                    p={6}
                    display={"flex"}
                    flexDirection={"column"}
                >
                    <Stack spacing={4}>
                        {/* Heading */}
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                        >
                            <Typography level="h1">Related Jobs</Typography>
                            <Button
                                onClick={viewAllJobsHandler}
                                size="lg"
                                variant="soft"
                                endDecorator={
                                    <img
                                        src={arrowLeftIcon}
                                        alt="arrow-left-icon"
                                        width={"20px"}
                                    />
                                }
                            >
                                View All Jobs
                            </Button>
                        </Stack>
                        {/* Job Recommendations - Only 3 Recs */}
                        <Grid container spacing={2}>
                            <Grid item md={4}>
                                <Card
                                    variant="outlined"
                                    size="lg"
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
                                            justifyContent="space-between"
                                            alignItems="flex-start"
                                            spacing={2}
                                            mb={2}
                                        >
                                            {/* Company Logo */}
                                            <Avatar
                                                size="lg"
                                                alt="CompanyLogo"
                                                src="companyLogo"
                                                color="primary"
                                            />
                                            {/* Bookmark Button */}
                                            <IconButton
                                                onClick={handleBookmarkToggle}
                                            >
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

                                        <Stack spacing={0}>
                                            {/* Job Title */}
                                            <Link
                                                level="h4"
                                                color="primary"
                                                sx={{ color: "#101828" }}
                                                mb={1}
                                            >
                                                Junior Software Developer
                                            </Link>

                                            {/* Key Facts */}
                                            <Stack
                                                direction="row"
                                                spacing={2}
                                                alignItems={"center"}
                                                flexWrap="wrap"
                                                useFlexGap
                                                mb={1}
                                            >
                                                {/* Company Name */}
                                                <Typography level="title-md">
                                                    Ultralytics
                                                </Typography>
                                                {/* Time Posted */}
                                                <Typography
                                                    level="body-md"
                                                    startDecorator={
                                                        <img
                                                            src={timePostedIcon}
                                                            width={"18px"}
                                                            alt="Time Posted"
                                                        />
                                                    }
                                                >
                                                    1 day ago
                                                </Typography>
                                            </Stack>

                                            {/* Chips - Display max of 4 chips */}
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
                                                    C/C++
                                                </Chip>
                                                <Chip
                                                    sx={{
                                                        "--Chip-radius": "6px",
                                                        borderColor: "#D0D5DD",
                                                    }}
                                                    variant="outlined"
                                                >
                                                    Contract
                                                </Chip>
                                                <Chip
                                                    sx={{
                                                        "--Chip-radius": "6px",
                                                        borderColor: "#D0D5DD",
                                                    }}
                                                    variant="outlined"
                                                >
                                                    Junior-level
                                                </Chip>
                                            </Stack>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item md={4}>
                                <Card
                                    variant="outlined"
                                    size="lg"
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
                                            justifyContent="space-between"
                                            alignItems="flex-start"
                                            spacing={2}
                                            mb={2}
                                        >
                                            {/* Company Logo */}
                                            <Avatar
                                                size="lg"
                                                alt="CompanyLogo"
                                                src="companyLogo"
                                                color="primary"
                                            />
                                            {/* Bookmark Button */}
                                            <IconButton
                                                onClick={handleBookmarkToggle}
                                            >
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

                                        <Stack spacing={0}>
                                            {/* Job Title */}
                                            <Link
                                                level="h4"
                                                color="primary"
                                                sx={{ color: "#101828" }}
                                                mb={1}
                                            >
                                                Junior Software Developer
                                            </Link>

                                            {/* Key Facts */}
                                            <Stack
                                                direction="row"
                                                spacing={2}
                                                alignItems={"center"}
                                                flexWrap="wrap"
                                                useFlexGap
                                                mb={1}
                                            >
                                                {/* Company Name */}
                                                <Typography level="title-md">
                                                    Ultralytics
                                                </Typography>
                                                {/* Time Posted */}
                                                <Typography
                                                    level="body-md"
                                                    startDecorator={
                                                        <img
                                                            src={timePostedIcon}
                                                            width={"18px"}
                                                            alt="Time Posted"
                                                        />
                                                    }
                                                >
                                                    1 day ago
                                                </Typography>
                                            </Stack>

                                            {/* Chips - Display max of 4 chips */}
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
                                                    C/C++
                                                </Chip>
                                                <Chip
                                                    sx={{
                                                        "--Chip-radius": "6px",
                                                        borderColor: "#D0D5DD",
                                                    }}
                                                    variant="outlined"
                                                >
                                                    Contract
                                                </Chip>
                                                <Chip
                                                    sx={{
                                                        "--Chip-radius": "6px",
                                                        borderColor: "#D0D5DD",
                                                    }}
                                                    variant="outlined"
                                                >
                                                    Junior-level
                                                </Chip>
                                            </Stack>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item md={4}>
                                <Card
                                    variant="outlined"
                                    size="lg"
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
                                            justifyContent="space-between"
                                            alignItems="flex-start"
                                            spacing={2}
                                            mb={2}
                                        >
                                            {/* Company Logo */}
                                            <Avatar
                                                size="lg"
                                                alt="CompanyLogo"
                                                src="companyLogo"
                                                color="primary"
                                            />
                                            {/* Bookmark Button */}
                                            <IconButton
                                                onClick={handleBookmarkToggle}
                                            >
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

                                        <Stack spacing={0}>
                                            {/* Job Title */}
                                            <Link
                                                level="h4"
                                                color="primary"
                                                sx={{ color: "#101828" }}
                                                mb={1}
                                            >
                                                Junior Software Developer
                                            </Link>

                                            {/* Key Facts */}
                                            <Stack
                                                direction="row"
                                                spacing={2}
                                                alignItems={"center"}
                                                flexWrap="wrap"
                                                useFlexGap
                                                mb={1}
                                            >
                                                {/* Company Name */}
                                                <Typography level="title-md">
                                                    Ultralytics
                                                </Typography>
                                                {/* Time Posted */}
                                                <Typography
                                                    level="body-md"
                                                    startDecorator={
                                                        <img
                                                            src={timePostedIcon}
                                                            width={"18px"}
                                                            alt="Time Posted"
                                                        />
                                                    }
                                                >
                                                    1 day ago
                                                </Typography>
                                            </Stack>

                                            {/* Chips - Display max of 4 chips */}
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
                                                    C/C++
                                                </Chip>
                                                <Chip
                                                    sx={{
                                                        "--Chip-radius": "6px",
                                                        borderColor: "#D0D5DD",
                                                    }}
                                                    variant="outlined"
                                                >
                                                    Contract
                                                </Chip>
                                                <Chip
                                                    sx={{
                                                        "--Chip-radius": "6px",
                                                        borderColor: "#D0D5DD",
                                                    }}
                                                    variant="outlined"
                                                >
                                                    Junior-level
                                                </Chip>
                                            </Stack>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}
