import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import Signup from "../../Signup";
import {
    Box, Button, ButtonGroup, FormControl, FormLabel, Grid, List, ListItem, Checkbox,
    Option, Select, Slider, Stack, Textarea, Typography
} from "../../../joy_imports.jsx";

export default function Page2() {
    const skills = ['JavaScript', 'React', 'Python', 'Java', 'C++', 'CSS', 'HTML',
        'Node.js', 'SQL', 'Machine Learning', 'Android Development', 'iOS Development',
        'Cloud Computing', 'Cybersecurity', 'UI/UX Design', 'Agile Development',
        'Software Testing'];
    const prefs = ['Junior-Level', 'Senior-Level', 'On-site', 'Remote', 'Part-time', 'Full-time', 'Contract', 'Project-based', 'Ongoing'];

    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedPrefs, setSelectedPrefs] = useState([]);

    const handleSkillChange = (event, skill) => {
        const isChecked = event.target.checked;
        const updatedSkills = isChecked
            ? [...selectedSkills, skill]
            : selectedSkills.filter((s) => s !== skill);
        setSelectedSkills(updatedSkills);
    };

    const handlePrefChange = (event, pref) => {
        const isChecked = event.target.checked;
        const updatedPrefs = isChecked
            ? [...selectedPrefs, pref]
            : selectedPrefs.filter((s) => s !== pref);
        setSelectedPrefs(updatedPrefs);
    };

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
                }}>
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
                                <Typography level="body-md">Skills: (select all that apply)</Typography>
                                <List
                                    sx={{
                                        mt: '-25px',
                                        '--List-gap': '-4px',  
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        maxWidth: '100%',
                                        maxHeight: 400,
                                    }}
                                >
                                    {skills.map((skill) => (
                                        <ListItem key={skill} dense>
                                            <Checkbox
                                                label={skill}
                                                checked={selectedSkills.includes(skill)}
                                                onChange={(event) => handleSkillChange(event, skill)}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                                <Typography level="body-md">Preferences: (select all that apply)</Typography>
                                <List
                                    sx={{
                                        mt: '-25px',
                                        '--List-gap': '-4px',  
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        maxWidth: '100%',
                                        maxHeight: 200,
                                    }}
                                >
                                    {prefs.map((pref) => (
                                        <ListItem key={pref} dense>
                                            <Checkbox
                                                label={pref}
                                                checked={selectedPrefs.includes(pref)}
                                                onChange={(event) => handleprefChange(event, pref)}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
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
                                        Next
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