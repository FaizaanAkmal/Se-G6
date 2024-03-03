import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";

import {
  Box, Button, ButtonGroup, FormControl, FormLabel, Grid, Input,
  Option, Select, Stack, Typography
} from "../../../joy_imports.jsx";


export default function Page1() {
  const countryNames = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Côte d'Ivoire", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (fmr. \"Swaziland\")", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];
  const companyTypes = ["Agency", "Corporate", "Start-up"]
  const navigate = useNavigate();
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    // alert(JSON.stringify(formJson));

    try {
      // Send POST request to backend server with form data
      console.log("Form Data:", formJson)
      const response = await axios.post("/company/companyData",formJson);
      // Handle response, for example, redirect to next page
      console.log("Form submitted successfully:", response.data);
      // Redirect to the next page
      navigate("/createjob");
    } catch (error) {
      // Handle error
      console.error("Error submitting form:", error);
    }
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
            <form onSubmit={handleSubmit}>
              <Stack gap={4} sx={{ mt: 4 }}>
                <FormControl required>
                  <FormLabel>What's your company name?</FormLabel>
                  <Input type="text" name="cname" placeholder="Enter company name"/>
                </FormControl>
                <FormControl required>
                  <FormLabel>What's your website?</FormLabel>
                  <Input type="text" name="website" placeholder="www.example.com"/>
                </FormControl>
                <FormControl required>
                  <FormLabel>What is your company type?</FormLabel>
                  <Select name="ctype" placeholder="Select company type">
                    {companyTypes.map((company) => (
                      <Option value={company}>
                        {company}
                      </Option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl required>
                  <FormLabel>Where are you based in?</FormLabel>
                  <Select name="countName" placeholder="Select your country">
                    {countryNames.map((country) => (
                      <Option value={country}>
                        {country}
                      </Option>
                    ))}
                  </Select>
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