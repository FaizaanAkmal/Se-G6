import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Routes
import { apiRoutes } from "../../routes.js";

// Custom Components
import DevNavbar from "../../components/DevNavbar.jsx";
import DevApplyJob from "../../components/DevApplyJob.jsx";
import Footer from "../../components/Footer.jsx";
import DevJobRecs from "../../components/DevJobRecs.jsx";

// Custom Assets
import companySizeIcon from "../../assets/companySizeIcon.svg";
import timePostedIcon from "../../assets/timePostedIcon.svg";
import bookmarkActiveIcon from "../../assets/bookmarkActiveIcon.svg";
import bookmarkInactiveIcon from "../../assets/bookmarkInactiveIcon.svg";
import visitWebsiteIcon from "../../assets/visitWebsiteIcon.svg";

// UI Imports
import {
    Typography,
    Button,
    Stack,
    Avatar,
    Chip,
    IconButton,
    Grid,
} from "@mui/joy";

export default function DevIndividualJob() {
    const [isBookmarked, setIsBookmarked] = useState(null);

    // Button handlers
    const handleBookmarkToggle = async () => {
        setIsBookmarked(!isBookmarked);

        try {
            if (isBookmarked) {
                // TO DO: api call to remove bookmark
                console.log("Bookmark Removed");
            } else {
                // TO DO:  api call to add bookmark
                console.log("Bookmark Added");
            }
        } catch (error) {
            console.error("Error toggling bookmark:", error);
        }
    };
    const handleVisitWebsite = () => {
        console.log("Visit Website");
        // TO DO: open the company website in a new tab
    };

    return (
        <>
            <DevNavbar />
            <Stack spacing={0}>
                {/* Hero Section */}
                <Grid
                    container
                    xs={12}
                    sx={{
                        flexGrow: 1,
                        justifyContent: "center",
                        backgroundColor: "#F8F9FA",
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        md={10.1}
                        sx={{
                            p: 6,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Stack spacing={"20px"}>
                            {/* Company Logo */}
                            <Avatar
                                size="lg"
                                alt="CompanyName"
                                src="companyLogo"
                                color="primary"
                            />
                            {/* Job Title */}
                            <Typography level="h1" sx={{ width: "100%" }}>
                                Junior Software Developer
                            </Typography>
                            {/* Key Facts */}
                            <Stack
                                direction="row"
                                spacing={2.5}
                                alignItems={"center"}
                            >
                                {/* Company Name */}
                                <Typography level="title-lg">
                                    Ultralytics
                                </Typography>
                                {/* Company Size */}
                                <Typography
                                    level="title-lg"
                                    color="neutral"
                                    startDecorator={
                                        <img
                                            src={companySizeIcon}
                                            width={"24px"}
                                            alt="Company Size"
                                        ></img>
                                    }
                                >
                                    100+
                                </Typography>
                                {/* Time Posted */}
                                <Typography
                                    level="title-lg"
                                    color="neutral"
                                    startDecorator={
                                        <img
                                            src={timePostedIcon}
                                            width={"24px"}
                                            alt="Company Size"
                                        ></img>
                                    }
                                >
                                    10 hours ago
                                </Typography>
                                {/* Bookmark Button */}
                                <IconButton onClick={handleBookmarkToggle}>
                                    <img
                                        src={
                                            isBookmarked
                                                ? bookmarkActiveIcon
                                                : bookmarkInactiveIcon
                                        }
                                        alt="Bookmark"
                                        width={"24px"}
                                    />
                                </IconButton>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
                {/* Details */}
                <Grid
                    container
                    xs={12}
                    sx={{
                        flexGrow: 1,
                        justifyContent: "center",
                    }}
                    p={6}
                >
                    {/* Details */}
                    <Grid item md={6.5}>
                        <Stack spacing={4}>
                            {/* Job Description */}
                            <Stack spacing={2}>
                                <Typography level="h2">Description</Typography>
                                <Typography level="body-lg" color="neutral">
                                    Ultralytics is looking for a Junior Software
                                    Developer to join our team. The ideal
                                    candidate will have a strong foundation in
                                    computer science and experience in software
                                    development. You will work closely with our
                                    team to develop and maintain software
                                    applications and systems. You will also be
                                    responsible for writing clean, maintainable,
                                    and efficient code which meets the needs of
                                    our clients and customers.
                                    <br /> <br />
                                    If you are passionate about software
                                    development and are looking to take the next
                                    step in your career, we want to hear from
                                    you!
                                    <br /> <br />
                                    To be successful in this role, you should
                                    have a Bachelor's degree in Computer Science
                                    or related field and 1+ years of experience
                                    in software development. You should also
                                    have strong knowledge of programming
                                    languages such as Python, Java, or C++, and
                                    experience with web development frameworks
                                    such as React, Angular, or Vue. Excellent
                                    problem-solving and communication skills are
                                    also required.
                                </Typography>
                            </Stack>
                            {/* Requirements */}
                            <Stack spacing={2}>
                                <Typography level="h2">Requirements</Typography>
                                <Typography level="body-lg" color="neutral">
                                    - Bachelor's degree in Computer Science or
                                    related field
                                    <br />
                                    - 1+ years of experience in software
                                    development
                                    <br />
                                    - Strong knowledge of programming languages
                                    such as Python, Java, or C++
                                    <br />
                                    - Experience with web development frameworks
                                    such as React, Angular, or Vue
                                    <br />- Excellent problem-solving and
                                    communication skills
                                </Typography>
                            </Stack>
                            {/* About the Company */}
                            <Stack spacing={2}>
                                <Typography level="h2">
                                    About Ultralytics
                                </Typography>
                                <Typography level="body-lg" color="neutral">
                                    Ultralytics is a leading software
                                    development company that specializes in
                                    building innovative software solutions for
                                    businesses of all sizes. We are a team of
                                    passionate developers, designers, and
                                    engineers who are dedicated to creating
                                    high-quality software. At Ultralytics, we
                                    believe in using the latest technologies and
                                    best practices to deliver exceptional
                                    results.
                                </Typography>
                            </Stack>
                            {/* Apply Section */}
                            <Grid
                                container
                                xs={12}
                                justifyContent="center"
                                alignItems="center"
                                backgroundColor="#F8F9FA"
                                p={3}
                                borderRadius={10}
                            >
                                <Grid item md={8}>
                                    <Stack spacing={1}>
                                        <Typography level="h3">
                                            Apply Now
                                        </Typography>
                                        <Typography
                                            level="body-md"
                                            color="neutral"
                                        >
                                            Ready to take the next step in your
                                            career? Apply now!
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid item md={4}>
                                    <DevApplyJob />
                                </Grid>
                            </Grid>
                        </Stack>
                    </Grid>
                    {/* Sidebar */}
                    <Grid item md={3.5} paddingLeft={6}>
                        <Grid item>
                            {/* Apply Now Card */}
                            <Stack
                                p={3}
                                borderRadius={10}
                                backgroundColor="#F9F9FB"
                                spacing={3}
                            >
                                <Stack spacing={1}>
                                    <Typography level="h3">
                                        Apply Now
                                    </Typography>
                                    <Typography level="body-md" color="neutral">
                                        Ready to take the next step in your
                                        career? Apply now!
                                    </Typography>
                                </Stack>
                                <DevApplyJob />
                            </Stack>
                        </Grid>
                        <Grid item mt={4}>
                            <Stack
                                p={3}
                                borderRadius={10}
                                border="1px solid #D0D5DD"
                                spacing={3}
                            >
                                <Stack spacing={2}>
                                    {/* About The Job */}
                                    <Typography level="h3" marginBottom={1}>
                                        About The Job
                                    </Typography>
                                    {/* Posted On */}
                                    <Stack>
                                        <Typography
                                            level="title-md"
                                            color="neutral"
                                        >
                                            Posted on
                                        </Typography>
                                        <Typography level="title-md">
                                            24 March 2024
                                        </Typography>
                                    </Stack>
                                    {/* Compensation (show if given) */}
                                    <Stack>
                                        <Typography
                                            level="title-md"
                                            color="neutral"
                                        >
                                            Compensation
                                        </Typography>
                                        <Typography level="title-md">
                                            $100k/yr - $120k/yr
                                        </Typography>
                                    </Stack>
                                    {/* Job Logistics */}
                                    <Stack spacing={0.8}>
                                        <Typography
                                            level="title-md"
                                            color="neutral"
                                        >
                                            Job Logistics
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            flexWrap="wrap"
                                            useFlexGap
                                        >
                                            {/* Job Type */}
                                            <Chip
                                                sx={{
                                                    "--Chip-radius": "6px",
                                                    borderColor: "#D0D5DD",
                                                }}
                                                variant="outlined"
                                            >
                                                Full-time
                                            </Chip>
                                            {/* Job Environment */}
                                            <Chip
                                                sx={{
                                                    "--Chip-radius": "6px",
                                                    borderColor: "#D0D5DD",
                                                }}
                                                variant="outlined"
                                            >
                                                Remote
                                            </Chip>
                                            {/* Experience Level */}
                                            <Chip
                                                sx={{
                                                    "--Chip-radius": "6px",
                                                    borderColor: "#D0D5DD",
                                                }}
                                                variant="outlined"
                                            >
                                                Entry-level
                                            </Chip>
                                        </Stack>
                                    </Stack>
                                    {/* Skills */}
                                    <Stack spacing={0.8}>
                                        <Typography
                                            level="title-md"
                                            color="neutral"
                                        >
                                            Skills
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            flexWrap="wrap"
                                            useFlexGap
                                        >
                                            {/* Map chips according to no. of skills specified */}
                                            <Chip
                                                sx={{
                                                    "--Chip-radius": "6px",
                                                    borderColor: "#D0D5DD",
                                                }}
                                                variant="outlined"
                                            >
                                                Agile Development
                                            </Chip>
                                            <Chip
                                                sx={{
                                                    "--Chip-radius": "6px",
                                                    borderColor: "#D0D5DD",
                                                }}
                                                variant="outlined"
                                            >
                                                Systems Architecture
                                            </Chip>
                                            <Chip
                                                sx={{
                                                    "--Chip-radius": "6px",
                                                    borderColor: "#D0D5DD",
                                                }}
                                                variant="outlined"
                                            >
                                                Backend
                                            </Chip>
                                        </Stack>
                                    </Stack>
                                    {/* Technologies */}
                                    <Stack spacing={0.8}>
                                        <Typography
                                            level="title-md"
                                            color="neutral"
                                        >
                                            Technologies
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            flexWrap="wrap"
                                            useFlexGap
                                        >
                                            {/* Map chips according to no. of technologies specified */}
                                            <Chip
                                                sx={{
                                                    "--Chip-radius": "6px",
                                                    borderColor: "#D0D5DD",
                                                }}
                                                variant="outlined"
                                            >
                                                Ruby On Rails
                                            </Chip>
                                            <Chip
                                                sx={{
                                                    "--Chip-radius": "6px",
                                                    borderColor: "#D0D5DD",
                                                }}
                                                variant="outlined"
                                            >
                                                GraphQL
                                            </Chip>
                                            <Chip
                                                sx={{
                                                    "--Chip-radius": "6px",
                                                    borderColor: "#D0D5DD",
                                                }}
                                                variant="outlined"
                                            >
                                                Kubernetes
                                            </Chip>
                                            <Chip
                                                sx={{
                                                    "--Chip-radius": "6px",
                                                    borderColor: "#D0D5DD",
                                                }}
                                                variant="outlined"
                                            >
                                                ASP.NET
                                            </Chip>
                                            <Chip
                                                sx={{
                                                    "--Chip-radius": "6px",
                                                    borderColor: "#D0D5DD",
                                                }}
                                                variant="outlined"
                                            >
                                                OpenAI APIs
                                            </Chip>
                                        </Stack>
                                    </Stack>
                                    {/* Programming Languages */}
                                    <Stack spacing={0.8}>
                                        <Typography
                                            level="title-md"
                                            color="neutral"
                                        >
                                            Programming Languages
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            flexWrap="wrap"
                                            useFlexGap
                                        >
                                            {/* Map chips according to no. of programming langs specified */}
                                            <Chip
                                                sx={{
                                                    "--Chip-radius": "6px",
                                                    borderColor: "#D0D5DD",
                                                }}
                                                variant="outlined"
                                            >
                                                Ruby
                                            </Chip>
                                            <Chip
                                                sx={{
                                                    "--Chip-radius": "6px",
                                                    borderColor: "#D0D5DD",
                                                }}
                                                variant="outlined"
                                            >
                                                TypeScript
                                            </Chip>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                {/* Visit Website Button */}
                                <Button
                                    color="neutral"
                                    onClick={handleVisitWebsite}
                                    size="lg"
                                    variant="soft"
                                    startDecorator={
                                        <img
                                            src={visitWebsiteIcon}
                                            width={"20px"}
                                            alt="Visit Website"
                                        ></img>
                                    }
                                    sx={{ "--Button-gap": "8px" }}
                                >
                                    Visit Website
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </Stack>
            <DevJobRecs />
            <Footer />
        </>
    );
}
