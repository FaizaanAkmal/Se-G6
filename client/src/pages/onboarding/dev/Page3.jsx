import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import Signup from "../../Signup";
import {
    Box, Button, ButtonGroup, FormControl, FormLabel, Grid, Input,
    Link, Option, Select, Stack, SvgIcon, Typography
} from "../../../joy_imports.jsx";

export default function Page3() {

    return (
        <Grid container sx={{ flexGrow: 1, justifyContent: "center", alignItems: "center", minHeight: "100vh", border: '1px solid #ccc', borderRadius: '4px', padding: '16px' }}>
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
                    <Typography level="h2" sx={{ mb: 1 }}>
                        Let's set up your account!
                    </Typography>
                    <Box>
                        <form>
                            <Stack gap={4} sx={{ mt: 4 }}>
                                <FormControl>
                                    <FormLabel>Link to your portfolio (optional):</FormLabel>
                                    <Input type="url" name="website" placeholder="www.example.com" />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Link to your GitHub profile (optional):</FormLabel>
                                    <Input type="url" name="website" placeholder="www.example.com" />
                                </FormControl>
                                <Button
                                    component="label"
                                    variant="plain"
                                    color="primary"
                                    startDecorator={
                                        <SvgIcon>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                                />
                                            </svg>
                                        </SvgIcon>
                                    }
                                >
                                    Click to upload your CV
                                    <input type="file" accept="image/*" hidden></input>
                                </Button>
                                <ButtonGroup
                                    color="primary"
                                    disabled={false}
                                    spacing={2}
                                    variant="solid"
                                    sx={{ justifyContent: "center" }}
                                >
                                    <Button component="a" href="/">
                                        Back
                                    </Button>
                                    <Button type="submit">
                                        Complete Profile
                                    </Button>
                                </ButtonGroup>
                            </Stack>
                        </form>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}