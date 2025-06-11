import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";

const DashboardCard = ({ title, subtitle, description, icon, iconColor }) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: iconColor }}>{icon}</Avatar>}
        title={title}
        subheader={subtitle}
      />
      <CardContent>
        <Typography color="textSecondary">{description}</Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
