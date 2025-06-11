import { Container, Typography, Button, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <Box sx={{ py: 10, textAlign: "center" }}>
      <Container>
        <Typography variant="h2" gutterBottom>
          Welcome to Deck & Duel
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Join epic battles, manage players, and build your ultimate deck in our
          competitive tournament system.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
      </Container>
    </Box>
  );
}
