import { Container, Typography, Button, Box } from "@mui/material";

export default function Index() {
  return (
    <Box sx={{ py: 10, textAlign: "center" }}>
      <Container>
        <Typography variant="h2" gutterBottom>
          Lorem ipsum dolor
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          scelerisque aliquam odio et faucibus.
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Empezar
        </Button>
      </Container>
    </Box>
  );
}
