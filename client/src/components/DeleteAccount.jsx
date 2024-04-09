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
    Modal,
    ModalDialog,
    ModalClose,
    DialogTitle,
    DialogContent,
    Alert,
    Snackbar,
} from "@mui/joy";

export default function DeleteAccount() {
    // status
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [accountDeleted, setAccountDeleted] = useState(false);

    const handleCancel = () => {
        // refresh the page
        window.location.reload();
    };
    const handleDeleteAccount = () => {
        // open confirm modal
        setOpenConfirmModal(true);
    };
    const closeConfirmModal = () => {
        // don't close if loading
        if (loading) return;

        setOpenConfirmModal(false);
    };

    const confirmDeleteAccount = async () => {
        // simulate
        setLoading(true);
        setTimeout(() => {
            // close modal
            setLoading(false);
            setOpenConfirmModal(false);
            // TODO: Route to sign up page

            // show snackbar
            setAccountDeleted(true);
        }, 2000);
    };

    return (
        <Stack spacing={2}>
            <Typography level="h1">Delete Account</Typography>
            <Stack spacing={4}>
                <Typography level="body-lg">
                    Are you absolutely sure you want to delete your DevLink
                    account? Deleting your account means all your associated
                    data will be permanently removed from our platform.
                    <b>
                        {" "}
                        Please be aware that once you delete your account, it
                        cannot be restored.
                    </b>
                </Typography>
                {/* Actions */}
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    {/* Cancel Button */}
                    <Button
                        color="neutral"
                        variant="outlined"
                        size="lg"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    {/* Save Changes Button */}
                    <Button
                        size="lg"
                        color="danger"
                        onClick={handleDeleteAccount}
                    >
                        Delete Account
                    </Button>
                </Stack>
            </Stack>
            {/* Confirm Modal */}
            <Modal open={openConfirmModal} onClose={closeConfirmModal}>
                <ModalDialog
                    color="neutral"
                    layout="center"
                    size="lg"
                    variant="plain"
                >
                    <ModalClose />
                    <DialogTitle>Delete Account</DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete your account?
                    </DialogContent>
                    {/* Actions */}
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="flex-end"
                        mt={1}
                        mb={1}
                    >
                        {/* Cancel Button */}
                        <Button
                            color="neutral"
                            variant="outlined"
                            size="lg"
                            onClick={closeConfirmModal}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        {/* Delete Account */}
                        <Button
                            size="lg"
                            color="danger"
                            onClick={confirmDeleteAccount}
                            loading={loading}
                        >
                            Delete Account
                        </Button>
                    </Stack>
                    {/* Error */}
                    {error && (
                        <Alert color="danger" variant="soft">
                            ⚠️ {error}
                        </Alert>
                    )}
                </ModalDialog>
            </Modal>
            {/* Account Deleted Snackbar */}
            <Snackbar
                variant="soft"
                color="neutral"
                open={accountDeleted}
                size="lg"
                onClose={() => setAccountDeleted(false)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                endDecorator={
                    <Button
                        onClick={() => setAccountDeleted(false)}
                        size="sm"
                        variant="soft"
                        color="neutral"
                    >
                        Dismiss
                    </Button>
                }
            >
                Your account has been deleted.
            </Snackbar>
        </Stack>
    );
}
