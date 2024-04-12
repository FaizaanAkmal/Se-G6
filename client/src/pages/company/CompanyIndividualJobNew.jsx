import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

// Route Imports
import { apiRoutes } from "../../routes";

// UI imports
import { Typography, Button, Stack, Chip, Grid, Snackbar } from "@mui/joy";

// Component Imports
import CompanyNavbar from "../../components/CompanyNavbar";
import JobApplications from "../../components/JobApplications";
import Footer from "../../components/Footer";

// Custom Assets Imports
import companySizeIcon from "../../assets/companySizeIcon.svg";
import timePostedIcon from "../../assets/timePostedIcon.svg";

// Formats compensation to USD
const formatCompenstation = (compensation) => {
    let USDollar = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumSignificantDigits: 3,
    });

    return `~ ${USDollar.format(compensation)}/yr`;
};

export default function CompanyIndividualJobNew() {
    const [closeJob, setCloseJob] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleCloseJob = async () => {
        setLoading(true);
        // simulate (TODO: replace with actual API call)
        setTimeout(() => {
            setLoading(false);
            setCloseJob(true);
            setSuccess(true);
            setOpenSnackbar(true);

            // TODO: navigate to company dashboard
        }, 2000);
    };

    return (
        <>
            {/* <CompanyNavbar /> */}
            <Stack spacing={0}>
                {/* Hero Section */}
                <Grid
                    container
                    xs={12}
                    flexGrow
                    justifyContent="center"
                    backgroundColor="#F8F9FA"
                >
                    <Grid
                        item
                        xs={12}
                        md={10.1}
                        p={6}
                        display="flex"
                        flexDirection="column"
                    >
                        <Stack spacing={"20px"}>
                            {/* Job Title */}
                            <Typography level="h1" sx={{ width: "100%" }}>
                                Junior Software Engineer
                            </Typography>
                            {/* Key Facts */}
                            <Stack
                                direction="row"
                                spacing={2.5}
                                alignItems={"center"}
                            >
                                {/* No. of Applicants */}
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
                                    20
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
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
                {/* Job Details */}
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
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Donec maximus turpis massa,
                                    eget imperdiet justo sollicitudin id.
                                    Vestibulum nisi ante, ullamcorper et nulla
                                    eget, accumsan dictum neque. Fusce ac nisl
                                    in nisl semper lacinia. In quis auctor
                                    mauris. <br /> <br /> Quisque maximus purus
                                    cursus rhoncus dignissim. Maecenas
                                    condimentum turpis non lacus ullamcorper,
                                    vel consectetur mi sodales. Fusce id
                                    ullamcorper erat. Ut varius vitae purus at
                                    fringilla. Nunc laoreet metus porta luctus
                                    porttitor. Vivamus sed vestibulum mauris.
                                    <br />
                                    <br /> Morbi in pretium ex. Donec a faucibus
                                    quam. Nunc vel tincidunt diam. Suspendisse
                                    vitae urna at nibh venenatis pulvinar eu nec
                                    diam. Donec rhoncus, erat ac elementum
                                    porta, erat lacus fermentum augue, aliquam
                                    convallis mi tortor id odio. Proin ut
                                    malesuada velit, imperdiet vehicula urna.{" "}
                                </Typography>
                            </Stack>
                            {/* Requirements */}
                            <Stack spacing={2}>
                                <Typography level="h2">Requirements</Typography>
                                <Typography level="body-lg" color="neutral">
                                    - 1-2 years of experience in software
                                    development <br /> - Proficient in Ruby on
                                    Rails <br /> - Experience with GraphQL{" "}
                                    <br /> - Experience with Kubernetes <br /> -
                                    Strong understanding of Agile Development{" "}
                                    <br /> - Strong understanding of Systems
                                    Architecture <br />
                                </Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                    {/* Sidebar */}
                    <Grid item md={3.5} paddingLeft={6}>
                        {/* Close Job Card */}
                        <Grid>
                            <Stack
                                p={3}
                                borderRadius={10}
                                backgroundColor="#F9F9FB"
                                spacing={3}
                            >
                                <Stack spacing={1}>
                                    <Typography level="h3">
                                        Close Job
                                    </Typography>
                                    <Typography level="body-md" color="neutral">
                                        Not hiring anymore? Close this job so
                                        that our talent can know.
                                    </Typography>
                                </Stack>
                                {/* Close Job Button */}
                                <Button
                                    color="danger"
                                    variant="soft"
                                    disabled={closeJob}
                                    loading={loading}
                                    onClick={handleCloseJob}
                                >
                                    Close Job
                                </Button>
                            </Stack>
                        </Grid>
                        <Grid item mt={4}></Grid>
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
                                        Posted On
                                    </Typography>
                                    <Typography level="title-md">
                                        24 March 2024
                                    </Typography>
                                </Stack>
                                {/* Compensation */}
                                <Stack>
                                    <Typography
                                        level="title-md"
                                        color="neutral"
                                    >
                                        Compensation
                                    </Typography>
                                    <Typography level="title-md">
                                        {formatCompenstation(100000)}
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
                                            1-2 years
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
                                        <Chip
                                            sx={{
                                                "--Chip-radius": "6px",
                                                borderColor: "#D0D5DD",
                                            }}
                                            variant="outlined"
                                        >
                                            Python
                                        </Chip>
                                        <Chip
                                            sx={{
                                                "--Chip-radius": "6px",
                                                borderColor: "#D0D5DD",
                                            }}
                                            variant="outlined"
                                        >
                                            Java
                                        </Chip>
                                        <Chip
                                            sx={{
                                                "--Chip-radius": "6px",
                                                borderColor: "#D0D5DD",
                                            }}
                                            variant="outlined"
                                        >
                                            C++
                                        </Chip>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
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
                {success ? "Job closed successfully." : error}
            </Snackbar>
            {/* Job Applications Management */}
            <JobApplications />
            <Footer />
        </>
    );
}
