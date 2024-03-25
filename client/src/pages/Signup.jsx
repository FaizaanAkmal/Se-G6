import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GlobalStyles } from '@mui/system';
import logo from "../assets/White_logo.png"
import background from "../assets/background.png"
import {
    Grid, Box, Typography, Button, Checkbox, Divider, FormControl, FormLabel,
    Link, Input, Stack, Radio, FormHelperText, RadioGroup
} from "../joyImports.jsx";

const Signup = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const registerUser = async (event) => {
        event.preventDefault();

        try {
            // Validate form data
            if (!firstName || !lastName || !email || !password || !userType || !termsAccepted) {
                throw new Error('Please fill in all required fields.');
            }

            // Make API request to register user
            const response = await axios.post('/api/register', {
                firstName,
                lastName,
                email,
                password,
                userType,
            });

            // Handle successful registration
            if (response.data.success) {
                // Redirect to onboarding page based on userType
                if (userType === "Company")
                    navigate('/onboarding/company');

                if (userType === "Developer")
                    navigate('/onboarding/dev');
            }
            // Handle unsuccessful registration
            // TODO

        } catch (error) {
            // Handle registration error
            console.log("The Error at frontend is: ", error)
            setError(error.response.data.message);
        }
    };
    return (
        <>
            <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
            <Box sx={{ margin: 0, padding: 0, width: '100vw', height: '100vh' }}>
                <Grid container sx={{ flexGrow: 1, minHeight: "100vh", backgroundColor: "#181818" }}>
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
                        <Box xs={8}>
                            <Typography level="h1" sx={{ mb: 1, color: "#ffffff" }}>
                                Create Account
                            </Typography >
                            <Typography sx={{ color: "#ffffff" }}>
                                Sign up as a Developer or an Company to get started.
                            </Typography>

                            <Box>
                                <form onSubmit={registerUser}>
                                    <Stack gap={4} sx={{ mt: 4, color: "#ffffff" }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <FormControl required>
                                                    <FormLabel sx={{ color: "#ffffff" }}>First Name</FormLabel>
                                                    <Input
                                                        type="text"
                                                        name="firstName"
                                                        value={firstName}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControl required>
                                                    <FormLabel sx={{ color: "#ffffff" }}>Last Name</FormLabel>
                                                    <Input
                                                        type="text"
                                                        name="lastName"
                                                        value={lastName}
                                                        onChange={(e) => setLastName(e.target.value)}
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <FormControl required>
                                            <FormLabel sx={{ color: "#ffffff" }}>Email</FormLabel>
                                            <Input type="email" name="email" value={email}
                                                onChange={(e) => setEmail(e.target.value)} />
                                        </FormControl>
                                        <FormControl required>
                                            <FormLabel sx={{ color: "#ffffff" }}>Password</FormLabel>
                                            <Input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </FormControl>
                                        <FormControl>
                                            <Stack gap={2}>
                                                <FormControl >
                                                    <FormLabel sx={{ color: "#ffffff" }}>I am a...</FormLabel>
                                                    <RadioGroup
                                                        defaultValue="develper"
                                                        name="radio-buttons-group"
                                                        value={userType}
                                                        onChange={(e) => setUserType(e.target.value)}
                                                    >
                                                        <Radio
                                                            value="Developer"
                                                            label={<Typography sx={{ color: "#ffffff" }}>Developer</Typography>}
                                                            variant="outlined"
                                                        />
                                                        <Radio
                                                            value="Company"
                                                            label={<Typography sx={{ color: "#ffffff" }}>Company</Typography>}
                                                            variant="outlined"
                                                        />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Stack>
                                        </FormControl>
                                        <FormControl sx={{ color: "#ffffff" }}>
                                            <Checkbox
                                                label="Accept Terms & Conditions."
                                                variant="soft"
                                                defaultChecked
                                                checked={termsAccepted}
                                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                                sx={{ color: "#ffffff" }}
                                            />
                                            <FormHelperText>
                                                Please review our terms and conditions
                                                before signing up.
                                            </FormHelperText>
                                        </FormControl>
                                        <Button type="submit" fullWidth sx={{
                                            background: '#a636e7',
                                            color: 'white',
                                            '&:hover': {
                                                background: '#8b2dcf', // Darken color on hover
                                            },
                                        }}>
                                            Sign up
                                        </Button>
                                        <Divider></Divider>
                                        <Typography>
                                            Already have an account? &nbsp;
                                            <Link href="/login" sx={{
                                                textDecoration: 'none',
                                                color: '#a636e7',
                                                '&:hover': {
                                                    color: '#a636e7', // Darken color on hover
                                                },
                                            }}>Log in to your account. </Link>
                                        </Typography>
                                    </Stack>
                                </form>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sx={{ backgroundColor: "#181818", position: "relative" }}>
                        <Grid
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                zIndex: 1,
                                mt: -10,
                            }}
                        >
                            <img src={logo} alt="logo" style={{ width: "122px" }} />
                        </Grid>
                        <Grid
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <img src={background} alt="background" style={{ width: "500px" }} />
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Signup;
