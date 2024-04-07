import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Routes
import { clientRoutes } from "../routes";

// Custom Assets
import arrowLeftIcon from "../assets/arrowLeftIcon.svg";

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

export default function DevJobRecs() {
    // View All Jobs Handler

    const navigate = useNavigate();

    const viewAllJobsHandler = () => {
        // Navigate to the search jobs page
        navigate(clientRoutes.searchJobs);
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
                    <Stack spacing={2}>
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
                        {/* Job Recommendations */}
                        <Grid container spacing={2}>
                            <Grid item md={4}></Grid>
                            <Grid item md={4}></Grid>
                            <Grid item md={4}></Grid>
                        </Grid>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}
