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

export default function JobApplications() {
    const [activeTab, setActiveTab] = useState("All");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <Grid
            container
            flexGrow
            justifyContent={"center"}
            backgroundColor={"#F8F9FA"}
        >
            <Grid item md={10} p={6} display={"flex"} flexDirection={"column"}>
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
                            {/* All */}
                            <Button
                                variant={
                                    activeTab === "All" ? "outlined" : "plain"
                                }
                                color="neutral"
                                size="lg"
                                sx={{
                                    borderRadius: 6,
                                    bgcolor: activeTab === "All" ? "white" : "",
                                }}
                                onClick={() => handleTabChange("All")}
                            >
                                All
                            </Button>
                            {/* Rejected */}
                            <Button
                                variant={
                                    activeTab === "Rejected"
                                        ? "outlined"
                                        : "plain"
                                }
                                size="lg"
                                color="neutral"
                                onClick={() => handleTabChange("Rejected")}
                                sx={{
                                    borderRadius: 6,
                                    bgcolor:
                                        activeTab === "Rejected" ? "white" : "",
                                }}
                            >
                                Rejected
                            </Button>
                            {/* Shortlisted */}
                            <Button
                                variant={
                                    activeTab === "Shortlisted"
                                        ? "outlined"
                                        : "plain"
                                }
                                size="lg"
                                color="neutral"
                                onClick={() => handleTabChange("Shortlisted")}
                                sx={{
                                    borderRadius: 6,
                                    bgcolor:
                                        activeTab === "Shortlisted"
                                            ? "white"
                                            : "",
                                }}
                            >
                                Shortlisted
                            </Button>
                            {/* Offers */}
                            <Button
                                variant={
                                    activeTab === "Offers"
                                        ? "outlined"
                                        : "plain"
                                }
                                size="lg"
                                color="neutral"
                                onClick={() => handleTabChange("Offers")}
                                sx={{
                                    borderRadius: 6,
                                    bgcolor:
                                        activeTab === "Offers" ? "white" : "",
                                }}
                            >
                                Offers
                            </Button>
                            {/* Hired */}
                            <Button
                                variant={
                                    activeTab === "Hired" ? "outlined" : "plain"
                                }
                                size="lg"
                                color="neutral"
                                onClick={() => handleTabChange("Hired")}
                                sx={{
                                    borderRadius: 6,
                                    bgcolor:
                                        activeTab === "Hired" ? "white" : "",
                                }}
                            >
                                Hired
                            </Button>
                        </Stack>
                        {/* All */}
                        {activeTab === "All" && (
                            <Stack spacing={2}>
                                <ApplicantCardNew />
                                <ApplicantCardNew />
                                <ApplicantCardNew />
                            </Stack>
                        )}
                    </Stack>
                </Stack>
            </Grid>
        </Grid>
    );
}
