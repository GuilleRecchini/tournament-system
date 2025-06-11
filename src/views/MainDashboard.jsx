import { Box, Typography, Grid, useTheme } from "@mui/material";
import {
  EmojiEvents as TrophyIcon,
  Groups as UsersIcon,
  Style as CardsIcon,
  Event as EventIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import DashboardCard from "../components/DashboardCard";

const MainDashboard = () => {
  const user = useSelector((state) => state.auth.user);

  const theme = useTheme();

  return (
    <Box mt={3}>
      <Typography variant="h4" gutterBottom>
        Welcome back, {user.alias}!
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DashboardCard
            title="Active Tournaments"
            subtitle="4 ongoing"
            description=" View and manage tournaments currently in progress."
            icon={<TrophyIcon />}
            iconColor={theme.palette.primary.main}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DashboardCard
            title="Registered Users"
            subtitle="128 total"
            description="Includes players, organizers, and judges."
            icon={<UsersIcon />}
            iconColor={theme.palette.secondary.main}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DashboardCard
            title="Cards in System"
            subtitle="342 cards"
            description="All collectible and playable cards registered."
            icon={<CardsIcon />}
            iconColor={theme.palette.info.main}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DashboardCard
            title="Upcoming Matches"
            subtitle="6 scheduled"
            description="Check the calendar to prepare your deck."
            icon={<EventIcon />}
            iconColor={theme.palette.warning.main}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainDashboard;
