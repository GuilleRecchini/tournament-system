import { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getPlayerCards } from "../services/playerService";

const PlayerCards = () => {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    if (!query) return;

    try {
      const response = await getPlayerCards(query);
      console.log(response.data);
      setCards(response.data);
    } catch (error) {
      console.error("Error al buscar GIFs:", error);
      setError(error.response.data.detail);
      console.log(error.response.data.detail);
      setCards([]);
    }
  };

  return (
    <>
      <Typography variant="h2" align="center" mt={3}>
        Player Cards
      </Typography>
      <Box
        component={"form"}
        onSubmit={handleSearch}
        mt={3}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <TextField
          id="search-player-cards"
          label="Player ID"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          variant="outlined"
          sx={{ flexGrow: 1 }}
        />
        <Button
          variant="outlined"
          type="submit"
          sx={{ ml: 2 }}
          endIcon={<SearchIcon />}
        >
          Search
        </Button>
      </Box>
      {error && (
        <Alert sx={{ mt: 1 }} severity="error">
          {error}
        </Alert>
      )}

      <Grid container spacing={2} mt={3}>
        {cards.map((card) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            key={card.cardId}
            display={"flex"}
            justifyContent={"center"}
          >
            <Card height="100%">
              <CardMedia
                component={"img"}
                image={card.illustration}
                title={card.name}
                sx={{
                  height: 400,
                  objectFit: "contain",
                }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                    maxWidth: 200,
                  }}
                >
                  {card.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Series:
                </Typography>
                {card.series.map((s) => (
                  <Typography
                    key={s.id}
                    variant="body2"
                    sx={{ color: "text.secondary", pl: 2 }}
                  >
                    • {s.name}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PlayerCards;
