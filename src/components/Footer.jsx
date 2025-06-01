import { Box, Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        bgcolor: "background.paper",
        py: 2,
        textAlign: "center",
        boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
        zIndex: 1300,
      }}
    >
      <Container>
        <Typography variant="body1">
          &copy; {new Date().getFullYear()} Lorem Ipsum
        </Typography>
      </Container>
    </Box>
  );
}
