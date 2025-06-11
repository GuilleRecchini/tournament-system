import { useEffect, useState } from "react";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Autocomplete,
  TextField,
} from "@mui/material";
import { getAllPlayers } from "../services/playerService";

const PlayerSelect = ({ selectedPlayerId, onChange }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await getAllPlayers();
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players", error);
      }
    };
    fetchPlayers();
  }, []);

  const selectedPlayer =
    players.find((p) => p.userId === selectedPlayerId) || null;

  return (
    <Autocomplete
      fullWidth
      options={players}
      getOptionLabel={(option) => option.alias}
      value={selectedPlayer}
      onChange={(event, newValue) => {
        onChange(newValue ? newValue.userId : null);
      }}
      renderInput={(params) => <TextField {...params} label="Player" />}
      isOptionEqualToValue={(option, value) => option.userId === value.userId}
    />
  );
};

export default PlayerSelect;
