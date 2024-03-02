import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, FormControlLabel, Checkbox, Radio, RadioGroup, FormLabel, FormControl, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: '#fff',
    borderRadius: '10px',
    width: '50%',
    margin: '0 auto',
  },
  title: {
    marginBottom: theme.spacing(2),
    color: '#3f51b5',
    fontSize: '2rem',
  },
  field: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: '#3f51b5',
    color: '#fff',
  },
  error: {
    color: 'red',
  },
  success: {
    color: 'green',
  },
}));

export default function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const classes = useStyles();

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
      setSuccessMessage(response.data.message);
      navigate('/login');

      // Clear form fields
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setUserType('');
      setTermsAccepted(false);
      setError(null);
    } catch (error) {
      // Handle registration error
      console.log("The Error at frontend is: ", error)
      setError(error.response.data.message);
    }


  };



  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>DevLink</Typography>
      <Typography variant="subtitle1">Sign up as a Developer or Company to get started.</Typography>
      {error && <div className={classes.error}>{error}</div>}
      {successMessage && <div className={classes.success}>{successMessage}</div>}
      <form onSubmit={registerUser}>
        <TextField
          className={classes.field}
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          className={classes.field}
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          className={classes.field}
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className={classes.field}
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControl component="fieldset" className={classes.field}>
          <FormLabel component="legend">User Type</FormLabel>
          <RadioGroup value={userType} onChange={(e) => setUserType(e.target.value)}>
            <FormControlLabel value="Developer" control={<Radio />} label="Developer" />
            <FormControlLabel value="Company" control={<Radio />} label="Company" />
          </RadioGroup>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              name="termsAccepted"
              color="primary"
            />
          }
          label="Accept Terms & Conditions"
        />
        <Button variant="contained" color="primary" type="submit" className={classes.button}>
          Sign Up
        </Button>
      </form>
      <Typography variant="body2">Already have an account? Log in to your account</Typography>
    </div>
  );
}
