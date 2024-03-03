import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import Signup from "../../Signup";
import {
    Box, Button, ButtonGroup, FormControl, FormLabel, Grid, Input,
    Link, Option, Select, Slider, Stack, Textarea, Typography
} from "../../../joy_imports.jsx";

export default function Page3() {
    const [text1, setText1] = React.useState('');
    const [text2, setText2] = React.useState('');
    const [text3, setText3] = React.useState('');
    const textLimit = 300;
    const countryNames = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Côte d'Ivoire", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (fmr. \"Swaziland\")", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

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
                    {/* <Typography>Please tell us about yourself.</Typography> */}

                    <Box>
                        <form>
                            <Stack gap={4} sx={{ mt: 4 }}>
                                <FormControl required>
                                    <FormLabel>Provide a brief overview of your company</FormLabel>
                                    <Textarea
                                        placeholder="Enter overview..."
                                        value={text1}
                                        onChange={(event) => setText1(event.target.value.substring(0, textLimit))}
                                        minRows={2}
                                        maxRows={4}

                                        endDecorator={
                                            <Typography level="body-xs" sx={{ ml: 'auto' }}>
                                                {textLimit - text1.length} character(s) left
                                            </Typography>
                                        }
                                    /></FormControl>
                                <FormControl required>
                                    <FormLabel>Describe your company's work culture</FormLabel>
                                    <Textarea
                                        placeholder="Enter description..."
                                        value={text2}
                                        onChange={(event) => setText2(event.target.value.substring(0, textLimit))}
                                        minRows={2}
                                        maxRows={4}

                                        endDecorator={
                                            <Typography level="body-xs" sx={{ ml: 'auto' }}>
                                                {textLimit - text2.length} character(s) left
                                            </Typography>
                                        }
                                    /></FormControl>
                                <FormControl>
                                    <FormLabel>What benefits/perks you offer to employees? (Optional)</FormLabel>
                                    <Textarea
                                        placeholder="Enter description..."
                                        value={text3}
                                        onChange={(event) => setText3(event.target.value.substring(0, textLimit))}
                                        minRows={2}
                                        maxRows={4}

                                        endDecorator={
                                            <Typography level="body-xs" sx={{ ml: 'auto' }}>
                                                {textLimit - text3.length} character(s) left
                                            </Typography>
                                        }
                                    />
                                </FormControl>
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