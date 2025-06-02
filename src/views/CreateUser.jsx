import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const roles = [
  { value: 0, label: "Admin" },
  { value: 1, label: "Organizador" },
  { value: 2, label: "Juez" },
  { value: 3, label: "Jugador" },
];

const CreateUser = () => {
  const [form, setForm] = useState({
    name: "",
    alias: "",
    email: "",
    password: "",
    confirmPassword: "",
    countryCode: "",
    role: "",
    createdBy: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    alias: "",
    email: "",
    password: "",
    confirmPassword: "",
    countryCode: "",
    role: "",
    createdBy: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    if (!form.name) errors.name = "El nombre es obligatorio";

    if (!form.alias) errors.alias = "El alias es obligatorio";

    if (!form.email) {
      errors.email = "El correo electrónico es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "El correo electrónico no es válido";
    }

    if (!form.password) {
      errors.password = "La contraseña es obligatoria";
    } else if (form.password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres";
    } else if (form.password !== form.confirmPassword) {
      errors.password = "Las contraseñas no coinciden";
      errors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (!form.countryCode) errors.countryCode = "El país es obligatorio";

    if (!form.role) errors.role = "El rol es obligatorio";

    setErrors(errors);

    if (Object.values(errors).some((error) => !!error)) {
      return;
    }

    console.log("Usuario creado:", form);
  };
  return (
    <Box p={4}>
      <Paper elevation={3} sx={{ maxWidth: 600, mx: "auto", p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Crear Usuario
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item size={{ lg: 6, xs: 12 }}>
              <TextField
                label="Nombre"
                name="name"
                fullWidth
                value={form.name}
                error={!!errors.name}
                helperText={errors.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item size={{ lg: 6, xs: 12 }}>
              <TextField
                label="Alias"
                name="alias"
                fullWidth
                value={form.alias}
                error={!!errors.alias}
                helperText={errors.alias}
                onChange={handleChange}
              />
            </Grid>
            <Grid item size={{ lg: 12, xs: 12 }}>
              <TextField
                label="Email"
                name="email"
                fullWidth
                // type="email"
                value={form.email}
                error={!!errors.email}
                helperText={errors.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item size={{ lg: 6, xs: 12 }}>
              <TextField
                label="Contraseña"
                name="password"
                type="password"
                fullWidth
                value={form.password}
                error={!!errors.password}
                helperText={errors.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item size={{ lg: 6, xs: 12 }}>
              <TextField
                label="Confirmar Contraseña"
                name="confirmPassword"
                type="password"
                fullWidth
                value={form.confirmPassword}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                onChange={handleChange}
              />
            </Grid>
            <Grid item size={{ lg: 6, xs: 12 }}>
              <FormControl fullWidth error={!!errors.countryCode}>
                <InputLabel>País</InputLabel>
                <Select
                  name="countryCode"
                  value={form.countryCode}
                  onChange={handleChange}
                  label="País"
                >
                  <MenuItem value="AR">🇦🇷 Argentina</MenuItem>
                  <MenuItem value="MX">🇲🇽 México</MenuItem>
                  <MenuItem value="CL">🇨🇱 Chile</MenuItem>
                  <MenuItem value="ES">🇪🇸 España</MenuItem>
                  <MenuItem value="US">🇺🇸 USA</MenuItem>
                </Select>
                {errors.countryCode && (
                  <FormHelperText>{errors.countryCode}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item size={{ lg: 6, xs: 12 }}>
              <FormControl fullWidth error={!!errors.role}>
                <InputLabel>Rol</InputLabel>
                <Select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  label="Rol"
                >
                  {roles.map((r) => (
                    <MenuItem key={r.value} value={r.value}>
                      {r.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item size={{ lg: 12, xs: 12 }}>
              <Box display="flex" justifyContent="center" mt={2}>
                <Button type="submit" variant="contained" color="primary">
                  Guardar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateUser;
