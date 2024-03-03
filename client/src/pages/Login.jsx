import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import {
    Box, Button, Divider, FormControl, FormLabel, Grid, Input, Link, Stack, Typography
} from "../joy_imports.jsx";

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
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Grid
                    sx={{
                        mb: 4,
                        display: "flex",
                        alignItems: "end",
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
                        <form>
                            <Stack gap={4} sx={{ mt: 4 }}>
                                <FormControl required>
                                    <FormLabel>Email</FormLabel>
                                    <Input type="email" name="email" />
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>Password</FormLabel>
                                    <Input type="password" name="password" />
                                </FormControl>
                                <Button type="submit" fullWidth>
                                    Sign up
                                </Button>
                                <Divider></Divider>
                                <Typography>
                                    Don't have an account? &nbsp;
                                    <Link href="/">
                                        Sign up to create an account.{" "}
                                    </Link>
                                    {/* How to link? */}
                                </Typography>
                            </Stack>
                        </form>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={6} sx={{ backgroundColor: "#f5f5f5" }}>
                {/*Background column */}
            </Grid>
        </Grid>
    );
}
