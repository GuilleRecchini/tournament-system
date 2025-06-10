import { DataGrid } from "@mui/x-data-grid";
import {
  Typography,
  Button,
  Box,
  Drawer,
  Grid,
  useMediaQuery,
  IconButton,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllCards } from "../services/cardService.js";
import { assignCardsToPlayer } from "../services/playerService.js";
import { getPlayerCards } from "../services/playerService.js";
import CustomSnackbar from "../components/CustomSnackbar.jsx";
import PlayerSelect from "../components/PlayerSelect.jsx";
import { useTheme } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import CardItem from "../components/CardItem.jsx";

const initialRowSelection = {
  type: "include",
  ids: new Set(),
};

const CardAssignment = () => {
  const [selectedPlayerId, setSelectedPlayerId] = useState("");
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);

  const [selectedCardIds, setSelectedCardIds] = useState(initialRowSelection);
  const [selectedCard, setSelectedCard] = useState(null);
  const [search, setSearch] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await getAllCards();
        setCards(res.data);
        setFilteredCards(res.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
    fetchCards();
  }, []);

  useEffect(() => {
    const lower = search.toLowerCase();
    setFilteredCards(
      cards.filter(
        (c) =>
          c.name.toLowerCase().includes(lower) ||
          c.series.some((s) => s.name.toLowerCase().includes(lower))
      )
    );
  }, [search, cards]);

  useEffect(() => {
    const fetchPlayerCards = async () => {
      if (!selectedPlayerId) {
        setSelectedCardIds(initialRowSelection);
        return;
      }
      try {
        const res = await getPlayerCards(selectedPlayerId);
        const playerCardsIds = res.data.map((c) => c.cardId);
        setSelectedCardIds({
          type: "include",
          ids: new Set(playerCardsIds),
        });
      } catch (error) {
        console.error("Error loading player cards", error);
        setSelectedCardIds(initialRowSelection);
      }
    };
    fetchPlayerCards();
  }, [selectedPlayerId]);

  const allColumns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "attack", headerName: "ATK", width: 100 },
    { field: "defense", headerName: "DEF", width: 100 },
    {
      field: "series",
      headerName: "Series",
      flex: 1,
      valueGetter: (value, row) => row.series?.map((s) => s.name).join(", "),
    },
  ];

  const mobileColumnKeys = ["name"];

  const columns = isMobile
    ? allColumns.filter((col) => mobileColumnKeys.includes(col.field))
    : allColumns;

  const handleSelectionChange = (selection) => {
    if (selection.ids.size <= 15) {
      setSelectedCardIds(selection);
    } else {
      showSnackbar("You can't select more than 15 cards", "error");
    }
  };

  const handleAssign = async () => {
    try {
      await assignCardsToPlayer(
        selectedPlayerId,
        Array.from(selectedCardIds.ids)
      );
      showSnackbar("Cards assigned successfully", "success");
      setSelectedPlayerId("");
      setSelectedCardIds(initialRowSelection);
    } catch (err) {
      console.error(err);
      showSnackbar("Error assigning cards", "error");
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Box mt={3}>
      <Typography variant="h5" mb={1}>
        Assign Cards to Player
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <PlayerSelect
            selectedPlayerId={selectedPlayerId}
            onChange={setSelectedPlayerId}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 8 }}>
          <TextField
            label="Search cards by name or series"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Typography variant="body2" color="text.secondary" mb={1}>
            Select between 8 and 15 cards to assign to the player.
          </Typography>
        </Grid>
      </Grid>
      <Box display="flex">
        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            sx={{
              "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
                {
                  display: "none",
                },
            }}
            rows={filteredCards}
            columns={columns}
            getRowId={(row) => row.cardId}
            checkboxSelection
            disableRowSelectionOnClick
            onRowClick={(params) => setSelectedCard(params.row)}
            onRowSelectionModelChange={handleSelectionChange}
            rowSelectionModel={selectedCardIds}
          />
        </Box>

        <Drawer
          anchor="right"
          open={!!selectedCard}
          onClose={() => setSelectedCard(null)}
        >
          {selectedCard && (
            <Box sx={{ width: 300, p: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
                <IconButton
                  onClick={() => setSelectedCard(null)}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <CardItem card={selectedCard} />
            </Box>
          )}
        </Drawer>
      </Box>

      <Box mt={3} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleAssign}
          disabled={selectedCardIds.ids.size < 8}
        >
          Assign Cards ({selectedCardIds.ids.size})
        </Button>
      </Box>

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
};

export default CardAssignment;
