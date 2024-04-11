import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import { clientRoutes } from "./routes.js";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import CompanyProfileSetup from "./pages/company/CompanyProfileSetup.jsx";
import DevProfileSetup from "./pages/dev/DevProfileSetup.jsx";
import CompanyDashboard from "./pages/company/CompanyDashboard.jsx";
import DevDashboard from "./pages/dev/DevDashboard.jsx";
import PostAJob from "./pages/company/PostAJob.jsx";
import SearchJobs from "./pages/SearchJobs.jsx";
import DevIndividualJob from "./pages/dev/DevIndividualJob.jsx";
import JobPost from "./pages/company/CompanyIndividualJob.jsx";
import DevSettings from "./pages/dev/DevSettings.jsx";
import CompanySettings from "./pages/company/CompanySettings.jsx";

// Experimenting with themes
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
const newTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
      },
    },
  },
});

axios.defaults.baseURL = " http://localhost:8000";
axios.defaults.withCredentials = true;
function App() {
  return (
    <CssVarsProvider theme={newTheme}>
      <BrowserRouter>
        <Routes>
          <Route path={clientRoutes.signup} element={<Signup />} />
          <Route path={clientRoutes.login} element={<Login />} />
          <Route path={clientRoutes.companyProfileSetup} element={<CompanyProfileSetup />} />
          <Route path={clientRoutes.devProfileSetup} element={<DevProfileSetup />} />
          <Route path={clientRoutes.companyDashboard} element={<CompanyDashboard />} />
          <Route path={clientRoutes.devDashboard} element={<DevDashboard />} />
          <Route path={clientRoutes.devIndividualJob} element={<DevIndividualJob/>} />
          <Route path={clientRoutes.postAJob} element={<PostAJob />} />
          <Route path={clientRoutes.JobPost} element={<JobPost />} />
          <Route path={clientRoutes.searchJobs} element={<SearchJobs />} />

          {/* adding dev settings route */}
          <Route path={clientRoutes.devSettings} element={<DevSettings />} />

          {/* adding company settings route */}
          <Route path={clientRoutes.companySettings} element={<CompanySettings />} />
          

        </Routes>
      </BrowserRouter>
    </CssVarsProvider>
  );
}

export default App;
