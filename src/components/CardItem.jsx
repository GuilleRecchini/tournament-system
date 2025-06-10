import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const CardItem = ({ card }) => {
  return (
    <Card>
      <CardMedia component="img" image={card.illustration} alt={card.name} />
      <CardContent>
        <Typography variant="h6">{card.name}</Typography>
        <Typography variant="body2">ATK: {card.attack}</Typography>
        <Typography variant="body2">DEF: {card.defense}</Typography>
        <Typography variant="body2" mt={1}>
          Series:
        </Typography>
        {card.series.map((s, i) => (
          <Typography key={i} variant="body2" sx={{ pl: 1 }}>
            • {s.name}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default CardItem;
