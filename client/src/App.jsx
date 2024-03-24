import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import axios from "axios";
import { useState } from "react";
import CompanyOnboarding from "./pages/onboarding/company/CompanyOnboarding.jsx";
import DevOnboarding from "./pages/onboarding/dev/DevOnboarding.jsx";
import PostAJob from "./pages/recruiter/PostAJob.jsx";

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
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/onboarding/company"
                        element={<CompanyOnboarding />}
                    />
                    <Route path="/onboarding/dev" element={<DevOnboarding />} />
                    <Route
                        path="/createjob"
                        element={<PostAJob />}
                    />
                </Routes>
            </BrowserRouter>
        </CssVarsProvider>
    );
}

export default App;
