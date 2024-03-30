import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

export default function DevNavbar({ currentPage }) {
    const navigate = useNavigate();
    // Logout handler
    const handleLogout = () => {
        console.log("Logging out...");
    };

    // Helper function to determine button color based on the current page
    const getButtonColor = (pageName) => {
        return currentPage === pageName ? "primary" : "neutral";
    };

    // handleTabChange function
    const handleTabChange = (tab) => {
        if (tab === "dashboard") {
            // navigate to (/dev)
            navigate("/dev");
        }
        if (tab === "search") {
            // navigate to (/dev/searchjobs)
            navigate("/dev/search");
        }
        if (tab === "settings") {
            // navigate to (/dev/settings)
            navigate("/dev/settings");
        }
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
                <Button
                    variant="plain"
                    color={getButtonColor("dashboard")}
                    onClick={() => handleTabChange("dashboard")}
                >
                    Dashboard
                </Button>
                <Button
                    variant="plain"
                    color={getButtonColor("search")}
                    onClick={() => handleTabChange("search")}
                >
                    Search
                </Button>
                <Button
                    variant="plain"
                    color={getButtonColor("settings")}
                    onClick={() => handleTabChange("settings")}
                >
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
