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
