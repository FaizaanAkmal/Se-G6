import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Routes Import
import { apiRoutes, clientRoutes } from "../routes.js";

// UI Imports
import {
    Typography,
    Button,
    Stack,
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Alert,
    Snackbar,
} from "@mui/joy";

export default function ChangePassword() {
    // form fields
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    // form status
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);

    // handle fields changes
    const handleCurrentPasswordChange = (event) => {
        setCurrentPassword(event.target.value);
    };
    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };
    const handleCancel = () => {
        // clear form fields
        setCurrentPassword("");
        setNewPassword("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // simulate api call
        setLoading(true);
        setTimeout(() => {
            // clear form fields
            setCurrentPassword("");
            setNewPassword("");
            // show success snackbar
            setOpenSuccessSnackbar(true);

            setLoading(false);
        }, 2000);
    };

    return (
        <Stack spacing={2}>
            <Typography level="h1">Change Password</Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    {/* Current Passowrd */}
                    <FormControl required>
                        <FormLabel>Current Passowrd</FormLabel>
                        <Input
                            type="password"
                            name="password"
                            value={currentPassword}
                            onChange={handleCurrentPasswordChange}
                        />
                    </FormControl>
                    {/* New Passowrd */}
                    <FormControl required>
                        <FormLabel>New Passowrd</FormLabel>
                        <Input
                            type="password"
                            name="password"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                        />
                        <FormHelperText>
                            Your new password must be different than your old
                            password.
                        </FormHelperText>
                    </FormControl>
                    {/* Form Submission */}
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="flex-end"
                    >
                        {/* Cancel Button */}
                        <Button
                            color="neutral"
                            variant="outlined"
                            size="lg"
                            disabled={loading}
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        {/* Save Changes Button */}
                        <Button size="lg" type="submit" loading={loading}>
                            Change Password
                        </Button>
                    </Stack>
                    {/* Error */}
                    {error && (
                        <Alert color="danger" variant="soft">
                            ⚠️ {error}
                        </Alert>
                    )}
                    {/* Success Snackbar */}
                    <Snackbar
                        variant="soft"
                        color="success"
                        open={openSuccessSnackbar}
                        size="lg"
                        onClose={() => setOpenSuccessSnackbar(false)}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                        endDecorator={
                            <Button
                                onClick={() => setOpenSuccessSnackbar(false)}
                                size="sm"
                                variant="soft"
                                color="success"
                            >
                                Dismiss
                            </Button>
                        }
                    >
                        Your password has been changed successfully.
                    </Snackbar>
                </Stack>
            </form>
        </Stack>
    );
}
