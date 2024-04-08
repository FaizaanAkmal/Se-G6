import * as React from "react";
import { useNavigate } from "react-router-dom";

// Asset imports
import logo from "../assets/logo.png";

// UI imports
import {
    Box,
    Button,
    Dropdown,
    Menu,
    MenuButton,
    MenuItem,
    Stack,
    Avatar
} from "@mui/joy";

// Route imports
import { clientRoutes } from "../routes.js";

export default function CompanyNavbar({ currentPage, userId }) {
    // navigation
    const navigate = useNavigate();

    // Logout handler
    const handleLogout = () => {
        navigate(clientRoutes.login);
    };

    // Helper function to determine button color based on the current page
    const getButtonColor = (pageName) => {
        return currentPage === pageName ? "primary" : "neutral";
    };

    // Handler for "Post a Job" button
    const handlePostJob = () => {
        // Redirect to job posting page
        navigate(clientRoutes.postAJob, {state: {userId: userId} });
    };

    return (
        <Box
            component="header"
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 32px", // Adjust the padding as needed
                // boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Optional: adds shadow to the Navbar
                borderBottom: "1px solid rgba(0,0,0,0.1)", // Optional: adds a border to the Navbar
                backgroundColor: "#fff", // Adjust the background color as needed
            }}
        >
            <img src={logo} alt="logo" width="100" />
            <Stack direction="row" spacing={2} alignItems="center">
                <Button variant="plain" color={getButtonColor("dashboard")}>
                    Dashboard
                </Button>
                <Button variant="plain" color={getButtonColor("postJob")} onClick={handlePostJob}>
                    Post a Job
                </Button>
                <Button variant="plain" color={getButtonColor("settings")}>
                    Settings
                </Button>
                {/* Assuming 'OR' is a button or a user's initials/avatar */}
                <Dropdown>
                    {/* Remove styling from MenuButton */}
                    <MenuButton
                        sx={{
                            minWidth: 0, // Remove button padding
                            padding: 0, // Remove button padding
                            lineHeight: 0, // Remove button extra height
                            "&:hover": { bgcolor: "transparent" }, // Remove hover effect
                            border: "none", // Remove button border
                        }}
                    >
                        <Avatar color="primary">OR</Avatar>
                    </MenuButton>
                    <Menu>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Dropdown>
            </Stack>
        </Box>
    );
}
