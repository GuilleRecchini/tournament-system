import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ShowHidePasswordIcon = ({ visible, onToggle }) => {
  return (
    <InputAdornment position="end">
      <IconButton onClick={onToggle} edge="end">
        {visible ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
};

export default ShowHidePasswordIcon;
