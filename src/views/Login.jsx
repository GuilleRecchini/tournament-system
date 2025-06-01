import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice.js";
import { Paper, Typography, Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import { Alert } from "@mui/material";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({ username: "", password: "" });
  const [generalError, setGeneralError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const username = data.get("username");
    const password = data.get("password");

    const newErrors = { username: "", password: "" };
    setGeneralError("");

    if (!username) newErrors.username = "El nombre de usuario es obligatorio";
    if (!password) newErrors.password = "La contraseña es obligatoria";

    if (newErrors.username || newErrors.password) {
      setErrors(newErrors);
      return;
    }

    if (username === "guille" && password === "1234") {
      dispatch(login("fake-token"));
      navigate("/");
    } else {
      setGeneralError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <Paper elevation={6} sx={{ mt: 8, p: 4, mx: "auto", maxWidth: 600 }}>
      <Typography component="h1" variant="h5" align="center">
        Iniciar Sesión
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          margin="normal"
          // required
          fullWidth
          id="username"
          label="Usuario"
          name="username"
          autoFocus
          error={!!errors.username}
          helperText={errors.username}
        />
        <TextField
          margin="normal"
          // required
          fullWidth
          name="password"
          label="Contraseña"
          type="password"
          id="password"
          error={!!errors.password}
          helperText={errors.password}
        />
        {generalError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {generalError}
          </Alert>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, py: 1.5 }}
        >
          Iniciar Sesión
        </Button>
      </Box>
    </Paper>
  );
};

export default Login;
