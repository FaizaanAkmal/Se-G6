import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Route Imports
import { apiRoutes, clientRoutes } from "../routes";

// Assets Imports
import applicantCountryIcon from "../assets/applicantCountryIcon.svg";
import portfolioIcon from "../assets/portfolioIcon.svg";
import githubIcon from "../assets/githubIcon.svg";
import offerAcceptedIcon from "../assets/offerAcceptedIcon.svg";
import offerRejectedIcon from "../assets/offerRejectedIcon.svg";
import offerPendingIcon from "../assets/offerPendingIcon.svg";
import shortlistIconActive from "../assets/shortlistIconActive.svg";
import shortlistIconInactive from "../assets/shortlistIconInactive.svg";
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
  Alert,
  Box,
  Tooltip,
  Modal,
  ModalDialog,
  ModalClose,
  DialogTitle,
  DialogContent,
} from "@mui/joy";

export default function ApplicantCardNew({
  applicant,
  jobId,
  tab,
  handleTabChange,
}) {
  const [openRejectModal, setOpenRejectModal] = useState(false);
  const [openAcceptModal, setOpenAcceptModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleApplicantNameClick = () => {
    // TODO: open application cover letter popup
    // alert(applicant.coverLetter);
  };
  const handlePortfolioClick = () => {
    // TODO: open portfolio link in new tab
    window.open(applicant.portfolio, "_blank");
  };
  const handleGithubClick = () => {
    // TODO: open github link in new tab
    window.open(applicant.gitLink, "_blank");
  };

  const handleShortlistToggle = async () => {
    try {
      // Make the API call to update the shortlist status
      const shortlisted = !(tab === "Shortlisted");
      const response = await axios.put(apiRoutes.job.updateToggleStatus, {
        jobId,
        devId: applicant._id,
        shortlisted: shortlisted,
      });
      shortlisted ? handleTabChange("Shortlisted") : handleTabChange("Pending");
    } catch (error) {
      // If the API call fails, revert the local state to the previous value
      console.error("Failed to update shortlist status:", error);
      setError("Failed to update shortlist status");
    }
  };

  const handleSendOffer = async () => {
    setLoading(true);
    try {
      // Send API call to send offer
      const response = await axios.post(apiRoutes.job.sendJobOffer, {
        jobId,
        devId: applicant._id,
      });
      // Update status and close modal on successful offer
      setLoading(false);
      closeAcceptModal();
      handleTabChange("Offered");
    } catch (error) {
      console.error("Error sending offer:", error);
      setLoading(false);
      // Handle error as needed
      setError(error);
    }
  };
  const closeAcceptModal = () => {
    if (!loading) {
      setOpenAcceptModal(false);
    }
  };
  const handleRejectOffer = async () => {
    setLoading(true);
    try {
      // Send API call to send offer
      const response = await axios.post(apiRoutes.job.rejectJobOffer, {
        jobId,
        devId: applicant._id,
      });
      // Update status and close modal on successful rejection
      setLoading(false);
      closeRejectModal();
      handleTabChange("Rejected");
    } catch (error) {
      console.error("Error rejecting offer:", error);
      setLoading(false);
      // Handle error as needed
      setError(error);
    }
  };
  const closeRejectModal = () => {
    if (!loading) {
      setOpenRejectModal(false);
    }
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
          <Stack direction="row" spacing={2} alignItems={"flex-start"}>
            {/* Applicant Initials */}
            <Avatar
              size="lg"
              alt={applicant.username} // TODO: Replace alt with applicant name
              src="companyLogo"
              color="primary"
            />
            <Box sx={{ width: "100%" }}>
              <Stack spacing={1.5}>
                {/* Key Facts + Shortlist Button */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  spacing={2}
                >
                  {/* Key Info */}
                  <Stack spacing={1}>
                    {/* Applicant Name */}
                    <Link
                      level="h3"
                      color="primary"
                      sx={{ color: "#101828" }}
                      onClick={handleApplicantNameClick}
                    >
                      {applicant.username}
                    </Link>
                    {/* Key Facts */}
                    <Stack direction="row" spacing={2} alignItems={"center"}>
                      {/* Offer Sent */}
                      {tab === "Offered" && (
                        <Typography
                          level="body-md"
                          sx={{ color: "#F79009" }}
                          startDecorator={
                            <img
                              src={offerPendingIcon}
                              width={"20px"}
                              alt="Github"
                            />
                          }
                        >
                          Offer Sent
                        </Typography>
                      )}
                      {/* Offer Rejected */}
                      {/* {tab === "Offer Rejected" && (
                        <Typography
                          level="body-md"
                          sx={{ color: "#D32F2F" }}
                          startDecorator={
                            <img
                              src={offerRejectedIcon}
                              width={"20px"}
                              alt="Github"
                            />
                          }
                        >
                          Offer Rejected
                        </Typography>
                      )} */}
                      {/* Rejected */}
                      {tab === "Rejected" && (
                        <Typography
                          level="body-md"
                          sx={{ color: "#D32F2F" }}
                          startDecorator={
                            <img src={offerRejectedIcon} width={"16px"} />
                          }
                        >
                          Rejected
                        </Typography>
                      )}
                      {/* Offer Accepted */}
                      {tab === "Hired" && (
                        <Typography
                          level="body-md"
                          sx={{ color: "#027A48" }}
                          startDecorator={
                            <img src={offerAcceptedIcon} width={"16px"} />
                          }
                        >
                          Offer Accepted
                        </Typography>
                      )}
                      {/* Applicant Country */}
                      <Typography
                        level="body-md"
                        startDecorator={
                          <img
                            src={applicantCountryIcon}
                            width={"20px"}
                            alt="Company Size"
                          />
                        }
                      >
                        {applicant.country}
                      </Typography>
                      {/* Portfolio Link */}
                      <Typography
                        level="body-md"
                        startDecorator={
                          <img
                            src={portfolioIcon}
                            width={"20px"}
                            alt="Portfolio"
                          />
                        }
                        onClick={handlePortfolioClick}
                        sx={{ cursor: "pointer" }}
                      >
                        Portfolio
                      </Typography>
                      {/* Github Link */}
                      <Typography
                        level="body-md"
                        startDecorator={
                          <img src={githubIcon} width={"20px"} alt="Github" />
                        }
                        onClick={handleGithubClick}
                        sx={{ cursor: "pointer" }}
                      >
                        Github
                      </Typography>
                    </Stack>
                  </Stack>
                  {/* Shortlist Button */}
                  {(tab === "Pending" || tab === "Shortlisted") && (
                    <Tooltip
                      color="primary"
                      placement="top"
                      variant="soft"
                      title={
                        tab === "Shortlisted"
                          ? "Remove from Shortlist"
                          : "Shortlist"
                      }
                    >
                      <IconButton onClick={handleShortlistToggle}>
                        <img
                          src={
                            tab === "Shortlisted"
                              ? shortlistIconActive
                              : shortlistIconInactive
                          }
                          width={"24px"}
                          alt="Shortlist"
                        />
                      </IconButton>
                    </Tooltip>
                  )}
                </Stack>
                {/* Applicant Tags */}
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {/* Convert all Skills + Technologies + Prog. Languages into 1 list and map over chips */}
                  <Chip
                    sx={{
                      "--Chip-radius": "6px",
                      borderColor: "#D0D5DD",
                    }}
                    variant="outlined"
                  >
                    {applicant.skills[0]}
                  </Chip>
                  <Chip
                    sx={{
                      "--Chip-radius": "6px",
                      borderColor: "#D0D5DD",
                    }}
                    variant="outlined"
                  >
                    {applicant.technologies[0]}
                  </Chip>
                  <Chip
                    sx={{
                      "--Chip-radius": "6px",
                      borderColor: "#D0D5DD",
                    }}
                    variant="outlined"
                  >
                    {applicant.languages[0]}
                  </Chip>
                </Stack>
                {/* Send Offer / Reject Buttons */}
                {tab === "Pending" && (
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    gap={2}
                  >
                    {/* Reject Button */}
                    <Grid xs={2.5}>
                      <Button
                        variant="outlined"
                        fullWidth
                        startDecorator={
                          <img
                            src={rejectIcon}
                            width={"20px"}
                            alt="Reject Offer"
                          />
                        }
                        color="neutral"
                        sx={{ "--Button-gap": "4px" }}
                        onClick={() => setOpenRejectModal(true)}
                      >
                        Reject
                      </Button>
                    </Grid>
                    {/* Send Offer Button */}
                    <Grid xs={2.5}>
                      <Button
                        variant="soft"
                        fullWidth
                        startDecorator={
                          <img
                            src={acceptIcon}
                            width={"18px"}
                            alt="Accept Offer"
                          />
                        }
                        sx={{ "--Button-gap": "4px" }}
                        onClick={() => setOpenAcceptModal(true)}
                      >
                        Send Offer
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
      {/* Accept Modal */}
      <Modal open={openAcceptModal} onClose={closeAcceptModal}>
        <ModalDialog color="neutral" layout="center" size="lg" variant="plain">
          <ModalClose />
          <DialogTitle>Send Offer</DialogTitle>
          <DialogContent>
            Are you sure you want to send offer to this applicant?
          </DialogContent>
          <Stack direction="row" justifyContent="flex-start" gap={2}>
            <Button
              variant="outlined"
              color="neutral"
              onClick={closeAcceptModal}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="soft"
              onClick={handleSendOffer}
              color="success"
              loading={loading}
            >
              Send Offer
            </Button>
          </Stack>
          {error && (
            <Alert variant="soft" color="danger">
              {error}
            </Alert>
          )}
        </ModalDialog>
      </Modal>
      {/* Reject Modal */}
      <Modal open={openRejectModal} onClose={closeRejectModal}>
        <ModalDialog color="neutral" layout="center" size="lg" variant="plain">
          <ModalClose />
          <DialogTitle>Reject Offer</DialogTitle>
          <DialogContent>
            Are you sure you want to reject offer to this applicant?
          </DialogContent>
          <Stack direction="row" justifyContent="flex-start" gap={2}>
            <Button
              variant="outlined"
              color="neutral"
              onClick={closeRejectModal}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="soft"
              onClick={handleRejectOffer}
              color="danger"
              loading={loading}
            >
              Reject Offer
            </Button>
          </Stack>
          {error && (
            <Alert variant="soft" color="danger">
              {error}
            </Alert>
          )}
        </ModalDialog>
      </Modal>
    </>
  );
}
