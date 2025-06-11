import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import { getPlayerCards } from "../services/playerService";
import PlayerSelect from "../components/PlayerSelect";
import CardItem from "../components/CardItem";
import CustomSnackbar from "../components/CustomSnackbar";

const PlayerCards = () => {
  const [cards, setCards] = useState([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchPlayerCards = async () => {
      if (!selectedPlayerId) {
        setCards([]);
        return;
      }
      try {
        const res = await getPlayerCards(selectedPlayerId);
        setCards(res.data);
        if (res.data.length === 0) {
          showSnackbar("No cards found for this player", "info");
        }
        console.log(res.data);
      } catch (error) {
        showSnackbar(
          "Error loading player cards. Please try again later.",
          "error"
        );
        console.error("Error loading player cards", error);
        setCards([]);
      }
    };
    fetchPlayerCards();
  }, [selectedPlayerId]);

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Box mt={3}>
      <Typography variant="h5">Player Cards</Typography>
      <Grid container spacing={2} mt={2}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <PlayerSelect
            selectedPlayerId={selectedPlayerId}
            onChange={setSelectedPlayerId}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={3}>
        {cards.map((card) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            key={card.cardId}
            display={"flex"}
            justifyContent={"center"}
          >
            <CardItem card={card} />
          </Grid>
        ))}
      </Grid>

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
};

export default PlayerCards;
