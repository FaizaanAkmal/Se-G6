import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import Signup from "../../Signup";
import {
  Box, Button, ButtonGroup, FormControl, FormLabel, Grid, Input,
  Link, Option, Select, Stack, Typography} from "../../../joy_imports.jsx";

export default function Page1() {
  const countryNames = ["Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Côte d'Ivoire", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (fmr. \"Swaziland\")", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];  
  const companyNames = ["3D Analysis", "3D Animation", "3D CAD", "3D Designing", "3D Material Rendering", "3D Modelling", "3D Printing", "3D Visualization", "Accounting", "AdBlocker", "Analysis", "Analytics", "Anti Spyware", "Antivirus", "Architecture", "Audio Processing", "Authoring", "Automation", "Backup Recovery", "Backup Tool", "Benchmarking", "Biomedical", "Bluetooth", "BPM Software", "browsers", "Bug Tracking", "Business", "Business Analysis", "Camera Tools", "CD DVD Tools", "Burning", "CFD Tool", "Chat", "Chemistry", "Circuit Designing", "Civil Engineering", "CNC", "CNC Machines", "Code Obfuscation", "Communication", "Compilers", "Complex Processing", "Compression", "Computational Fluid Dynamics", "Construction", "Control Engineering", "Converters", "Cost Estimation", "Data Mining", "Data Modeling", "Data Recovery", "Database", "Database Conversion", "Debugger", "Design", "Designing Tool", "Desktop", "Development", "Disassembler", "Disk Management", "DIsk Partition", "Documentation", "Download Managers", "Drawing", "Drivers", "Education", "Electrical Engineering", "Electromagnetic Design", "Electromechanical", "Electronics", "Email", "Embroidery", "Employee Management", "Emulators", "Engineering", "ERP Systems", "File Sharing", "Fonts", "Game Maker", "Game Recording", "Geographical", "Geological", "Geological Data Processing", "Geotechnical Modeling", "Geothermal Analysis", "gipv2", "Graphic Design", "Help Files", "Home Design", "HTML5", "Hydraulic Systems", "Icons Design", "Image Editors", "Image Managers", "Image Viewer", "Industrial Processes", "Installer Creation", "Interior Designing", "Internet", "JAVA", "Laser Texture", "Learning", "Live Streaming", "Localization", "Machine Learning", "Machine Tools", "Management", "Manufacturing", "Maps Creation", "Maths", "Medical", "Mining", "Moldflow", "MultiLingual", "Multimedia", "Music", "Navigation", "Network", "Numerical Computing", "OCR", "Office Tools", "Operating Systems", "Optimization", "Package Designing", "Panoramic Images", "Parallel Processing", "PCB Design", "PDF Editors", "Petrophysical Assessment", "Photo Editing", "Photo Retouching", "Photography", "Photoshop Plugins", "Pipe Designing", "PLC Programming", "Portable Apps Creator", "Process Control System", "Productivity", "Programming", "Python", "Religious", "SCADA", "Scanning", "Screen Recording", "Sculpting", "Search", "Security", "Setup Creation", "Shop", "Simulation", "simulators", "Speech to Text", "SSH", "Statistical", "Streaming", "Surface Mapping", "surveillance", "Synthesizer", "System Tuning", "Benchmarking", "Text Editors", "Translation", "Typing", "UML Modelling", "Uninstaller", "Utilities", "Vector Animation", "Video Converter", "Video Downloader", "Video Editing", "Virtual Tours", "Virtualization", "Visual Effects", "Voice Control", "Webcam", "Website Design"]
  
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
                  <FormLabel>What's your company name?</FormLabel>
                  <Input type="text" name="cname" placeholder="Enter company name" />
                </FormControl>
                <FormControl required>
                  <FormLabel>What's your website?</FormLabel>
                  <Input type="url" name="website" placeholder="www.example.com" />
                </FormControl>
                <FormControl required>
                  <FormLabel>What is your company type?</FormLabel>
                  <Select placeholder="Select company type">
                    {companyNames.map((company) => (
                      <Option value={company}>
                        {company}
                      </Option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl required>
                  <FormLabel>Where are you based in?</FormLabel>
                  <Select placeholder="Select your country">
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