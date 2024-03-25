import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/joy/Grid";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import logo from "../assets/logo.png";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Radio from "@mui/joy/Radio";
import FormHelperText from "@mui/joy/FormHelperText";
import RadioGroup from "@mui/joy/RadioGroup";
import loginBackground from "../assets/loginBackground.png";
import Alert from "@mui/joy/Alert";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const loginUser = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("/api/login", {
                email,
                password,
            });

            localStorage.setItem("authToken", response.data.token);

            navigate("/main");

            console.log("Login successful");
            setSuccessMessage("Login successful");
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <Grid container sx={{ flexGrow: 1, minHeight: "100vh" }}>
            <Grid
                item
                xs={6}
                sx={{
                    p: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    // maxHeight: "100vh",
                }}
            >
                <Grid
                    sx={{
                        mb: 4,
                        display: "flex",
                        alignItems: "space-between",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                    }}
                    xs={12}
                >
                    <img src={logo} alt="logo" style={{ width: "122px" }} />
                </Grid>
                <Box xs={8}>
                    <Typography level="h1" sx={{ mb: 1 }}>
                        Login
                    </Typography>
                    <Typography>Welcome back! Login to continue.</Typography>

                    <Box>
                        <form onSubmit={loginUser}>
                            <Stack gap={4} sx={{ mt: 4 }}>
                                <FormControl required>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </FormControl>
                                <Button
                                    type="submit"
                                    fullWidth
                                    sx={{
                                        backgroundColor: "#7F56D9",
                                        "&:hover": {
                                            backgroundColor: "#6d4ecb",
                                        },
                                    }}
                                >
                                    Login
                                </Button>
                                {error && (
                                    <Alert variant="soft" color="danger">
                                        {error}
                                    </Alert>
                                )}
                                <Divider></Divider>
                                <Typography>
                                    Don't have an account? &nbsp;
                                    <Link href="/" sx={{ color: "#7F56D9" }}>
                                        Sign up to create an account.
                                    </Link>
                                </Typography>
                            </Stack>
                        </form>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={6} sx={{ backgroundColor: "#f5f5f5" }}>
                {/*Background column, set to loginBackgroun  of available height and width, crop the rest*/}
                <img
                    src={loginBackground}
                    alt="loginBackground"
                    style={{
                        width: "100%",
                        height: "100vh",
                        objectFit: "cover",
                    }}
                />
            </Grid>
        </Grid>
    );
}
