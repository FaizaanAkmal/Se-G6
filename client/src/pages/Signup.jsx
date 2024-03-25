
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Sigup.css';
import { GlobalStyles } from '@mui/system';
import { Box, Button,Checkbox, FormControl, FormHelperText, FormLabel,  Grid, Input, Link, Radio, RadioGroup,  Stack,Typography, logo, background } from '../joy_imports';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import  { radioClasses } from '@mui/joy/Radio'; 
import GitHubIcon from '@mui/icons-material/GitHub';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PropTypes from 'prop-types';

function CustomRadio({ label, ...props }) {
    return (
      <ListItem variant="outlined" sx={{ boxShadow: 'sm' }}>
        <ListItemDecorator>
          {label === 'Developer' ? <GitHubIcon sx={{ color: '#AF56D9' }} /> : <BusinessCenterIcon  sx={{ color: '#AF56D9' }} />}
        </ListItemDecorator>
        <Radio
          overlay
          value={label}
          label={label}
          sx={{ flexGrow: 1, flexDirection: 'row-reverse',color: '#ffffff' }}
          slotProps={{
            action: ({ checked }) => ({
              sx: (theme) => ({
                ...(checked && {
                  inset: -1,
                  border: '2px solid',
                  borderColor: theme.vars.palette.primary[500],
                }),
              }),
            }),
          }}
          {...props}
        />
      </ListItem>
    );
}
    CustomRadio.propTypes = {
        label: PropTypes.string.isRequired,
    };


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
    
      // Make API request to register user
      const response = await axios.post('/api/register', {
            firstName,
            lastName,
            email,
            password,
            userType,
        });

            // Make API request to register user
            const response = await axios.post("/api/register", {
                firstName,
                lastName,
                email,
                password,
                userType,
            });

      // Clear form fields
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setUserType('');
      setTermsAccepted(false);
      setError(null);
    } 
    catch (error) {
        setError(error);
    }
  };
  return (
        <>
            <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
            <Box sx={{ margin: 0, padding: 0, width: '100vw', height: '100vh' }}>
                <Grid container sx={{ flexGrow: 1, minHeight: "100vh" , backgroundColor: "#181818" }}>
                    <Grid
                        xs={6}
                        sx={{
                            p: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Box xs={8}>
                            <Typography level="h1" sx={{ mb: 1 , color: "#ffffff"  } }>
                                Create Account
                            </Typography >
                            <Typography sx={{color: "#ffffff" }}>
                                Sign up as a Developer or an Company to get started.
                            </Typography>

                            <Box>
                                <form onSubmit={registerUser}>
                                    <Stack gap={4} sx={{ mt: 4 , color: "#ffffff"  }}>
                                        <Grid container spacing={2}>
                                            <Grid xs={6}>
                                                <FormControl required>
                                                    <FormLabel sx={{ color: "#ffffff" }}>First Name</FormLabel>
                                                    <Input
                                                        type="text"
                                                        name="firstName"
                                                        value={firstName}
                                                        placeholder='First Name'
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                        sx={{
                                                            '--Input-focusedHighlight': 'var(--myCustomColor)', 
                                                            '--myCustomColor': '#AF56D9'
                                                          }}
                                                    />
                                                    {error && error.response.data.field === "firstName" && (
                                                        <Typography variant="body2" sx={{ color: 'red', fontWeight: '500' }}>
                                                            {error.response.data.message}
                                                        </Typography>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            <Grid xs={6}>
                                                <FormControl required>
                                                    <FormLabel sx={{ color: "#ffffff" }}>Last Name</FormLabel>
                                                    <Input
                                                        type="text"
                                                        name="lastName"
                                                        value={lastName}
                                                        placeholder='Last Name'
                                                        onChange={(e) => setLastName(e.target.value)}
                                                    />
                                                    {error && error.response.data.field === "lastname" && (
                                                      <Typography variant="body2" sx={{ color: 'red', fontWeight: '500' }}>
                                                            {error.response.data.message}
                                                        </Typography>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <FormControl required>
                                            <FormLabel sx={{ color: "#ffffff" }}>Email</FormLabel>
                                            <Input type="email" name="email" value={email}
                                                onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder='user@example.com' />
                                            {error && error.response.data.field === "email" && (
                                                <Typography variant="body2" sx={{ color: 'red', fontWeight: '500' }}>
                                                    {error.response.data.message}
                                                </Typography>
                                            )}
                                        </FormControl>
                                        <FormControl required>
                                            <FormLabel sx={{ color: "#ffffff" }}>Password</FormLabel>
                                            <Input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            {error && error.response.data.field === "password" && (
                                               <Typography variant="body2" sx={{ color: 'red', fontWeight: '500' }}>
                                                    {error.response.data.message}
                                                </Typography>
                                            )}
                                        </FormControl>
                                        <FormControl>
                                            <Stack gap={2}>
                                                <RadioGroup
                                                aria-label="I am a..."
                                                defaultValue="Developer"
                                                overlay
                                                name="radio-buttons-group"
                                                value={userType}
                                                onChange={(e) => setUserType(e.target.value)}
                                                sx={{
                                                    flexDirection: 'row',
                                                    gap: 2,
                                                    [`& .${radioClasses.checked}`]: {
                                                    [`& .${radioClasses.action}`]: {
                                                        inset: -1,
                                                        border: '2px solid',
                                                        borderColor: 'primary.500',
                                                    },
                                                    },
                                                    [`& .${radioClasses.radio}`]: {
                                                    display: 'contents',
                                                    '& > svg': {
                                                        zIndex: 2,
                                                        position: 'absolute',
                                                        top: '-8px',
                                                        right: '-8px',
                                                        bgcolor: 'background.surface',
                                                        borderRadius: '50%',
                                                    },
                                                    },
                                                }}
                                                >
                                                <List
                                                    sx={{
                                                    minWidth: 240,
                                                    '--List-gap': '0.5rem',
                                                    '--ListItem-paddingY': '1rem',
                                                    '--ListItem-radius': '8px',
                                                    '--ListItemDecorator-size': '32px',
                                                    }}
                                                >
                                                    {['Developer', 'Company'].map((value) => (
                                                    <CustomRadio
                                                        key={value}
                                                        label={value}
                                                    />
                                                    ))}
                                                </List>
                                                </RadioGroup>
                                            </Stack>
                                        </FormControl>
                                        <FormControl sx={{ color: "#ffffff" }}>
                                            <Checkbox
                                                label="Accept Terms & Conditions."
                                                variant="soft"
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
                                          {/* Error message for overall form submission */}
                                            {error && error.response.data.field === "general" && (
                                               <Typography variant="body2" sx={{ color: 'red', fontWeight: '500' }}>
                                                    {error.response.data.message}
                                                </Typography>
                                            )}
                                            {/* Success message */}
                                            {successMessage && (
                                                <Typography variant="body2" sx={{ color: 'success.main' }}>
                                                    {successMessage}
                                                </Typography>
                                            )}
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
                    <Grid xs={6} sx={{ backgroundColor: "#181818", position: "relative" }}>
                        <Grid
                            sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 1,
                            mt:-10,
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
