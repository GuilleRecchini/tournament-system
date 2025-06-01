import { Container, Grid, Typography, Paper, Box } from "@mui/material";

const features = [
  {
    title: "Característica 1",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Característica 2",
    desc: "Phasellus blandit massa enim. Nullam id varius nunc.",
  },
  {
    title: "Característica 3",
    desc: "Cras ultricies ligula sed magna dictum porta.",
  },
  {
    title: "Característica 4",
    desc: "Vivamus suscipit tortor eget felis porttitor volutpat.",
  },
  {
    title: "Característica 5",
    desc: "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
  },
  {
    title: "Característica 6",
    desc: "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.",
  },
];

export default function FeaturesSection() {
  return (
    <Box sx={{ py: 10 }}>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Características
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6">{feature.title}</Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
