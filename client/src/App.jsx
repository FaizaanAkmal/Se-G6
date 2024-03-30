import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import axios from "axios";
import CompanyOnboarding from "./pages/company/CompanyOnboarding.jsx";
import PostAJob from "./pages/company/PostAJob.jsx";
import CompanyDashboard from "./pages/company/CompanyDashboard.jsx";
import DevOnboarding from "./pages/dev/DevOnboarding.jsx";
import DevDashboard from "./pages/dev/DevDashboard.jsx";
import SearchJobs from "./pages/SearchJobs.jsx";

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
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/onboarding/company/:userId"
            element={<CompanyOnboarding />}
          />
          <Route path="/onboarding/dev/:userId" element={<DevOnboarding />} />
          <Route
            path="/company/dashboard/:userId"
            element={<CompanyDashboard />}
          />
          <Route path="/dev/dashboard/:userId" element={<DevDashboard />} />
          <Route path="/createjob/:userId" element={<PostAJob />} />
          <Route path="/dev/search" element={<SearchJobs />} />
        </Routes>
      </BrowserRouter>
    </CssVarsProvider>
  );
}

export default App;
