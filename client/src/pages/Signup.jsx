import logo from "../assets/logo.png";
import {
    Box, Button, Checkbox, Divider, FormControl, FormHelperText, FormLabel,
    Grid, Input, Link, Radio, RadioGroup, Stack, Typography} from "../joy_imports.jsx";

const Signup = () => {
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
                        Create Account
                    </Typography>
                    <Typography>
                        Sign up as a Developer or an Company to get started.
                    </Typography>

                    <Box>
                        <form>
                            <Stack gap={4} sx={{ mt: 4 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <FormControl required>
                                            <FormLabel>First Name</FormLabel>
                                            <Input
                                                type="text"
                                                name="firstName"
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl required>
                                            <FormLabel>Last Name</FormLabel>
                                            <Input
                                                type="text"
                                                name="lastName"
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <FormControl required>
                                    <FormLabel>Email</FormLabel>
                                    <Input type="email" name="email" />
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>Password</FormLabel>
                                    <Input type="password" name="password" />
                                </FormControl>
                                <FormControl>
                                    <Stack gap={2}>
                                        <FormControl>
                                            <FormLabel>I am a...</FormLabel>
                                            <RadioGroup
                                                defaultValue="develper"
                                                name="radio-buttons-group"
                                            >
                                                <Radio
                                                    value="developer"
                                                    label="Developer"
                                                    variant="outlined"
                                                />
                                                <Radio
                                                    value="company"
                                                    label="Company"
                                                    variant="outlined"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </Stack>
                                </FormControl>
                                <FormControl>
                                    <Checkbox
                                        label="Accept Terms & Conditions."
                                        variant="soft"
                                        defaultChecked
                                    />
                                    <FormHelperText>
                                        Please review our terms and conditions
                                        before signing up.
                                    </FormHelperText>
                                </FormControl>
                                <Button type="submit" fullWidth>
                                    Sign up
                                </Button>
                                <Divider></Divider>
                                <Typography>
                                    Already have an account? &nbsp;
                                    <Link href="/login">Log in to your account. </Link>
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
};

export default Signup;
