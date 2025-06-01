import { Box, Container, Toolbar } from "@mui/material";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, useLocation } from "react-router";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import darkTheme from "./theme/darkTheme";

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <ResponsiveAppBar />}
      {!isLoginPage && <Toolbar />}
      <Box sx={{ paddingBottom: isLoginPage ? 0 : "64px" }}>
        <Container maxWidth="lg">
          <AppRoutes />
        </Container>
      </Box>
      {!isLoginPage && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
