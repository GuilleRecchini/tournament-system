import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { registerUser } from "../services/userService";
import { useSelector } from "react-redux";
import { validateEmail, validatePassword } from "../utils/validators";

const roles = [
  { value: 0, label: "Administrator" },
  { value: 1, label: "Organizer" },
  { value: 2, label: "Judge" },
  { value: 3, label: "Player" },
];

const getAvailableRoles = (userRole) => {
  switch (userRole) {
    case 0: // Admin
      return roles;
    case 1: // Organizador
      return roles.filter((r) => r.value >= 2); // Puede crear Juez y Jugador
    case 2: // Juez
    case 3: // Jugador
    default:
      return []; // No puede crear usuarios
  }
};

const CreateUser = () => {
  const user = useSelector((state) => state.auth.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const initialFormState = {
    name: "",
    alias: "",
    email: "",
    password: "",
    confirmPassword: "",
    countryCode: "",
    role: "",
  };

  const [form, setForm] = useState(initialFormState);

  const [errors, setErrors] = useState({
    name: "",
    alias: "",
    email: "",
    password: "",
    confirmPassword: "",
    countryCode: "",
    role: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const errors = {};

    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);

    if (emailError) errors.email = emailError;
    if (passwordError) {
      errors.password = passwordError;
    } else if (form.password !== form.confirmPassword) {
      errors.password = errors.confirmPassword = "Passwords do not match";
    }
    if (!form.name) errors.name = "Name is required";
    if (!form.alias) errors.alias = "Alias is required";
    if (!form.countryCode) errors.countryCode = "Country is required";
    if (form.role == null || form.role === "") errors.role = "Role is required";

    console.log("rol", form);

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Formulario válido:", form);
    setIsSubmitting(true);
    try {
      const response = await registerUser(form);
      console.log(response);
      showSnackbar(response.data.message, "success");
      setForm(initialFormState);
      setErrors({});
    } catch (error) {
      console.log(error);
      const message =
        error.response?.data?.detail || "An unexpected error occurred";
      showSnackbar(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Box p={4}>
      <Paper
        elevation={3}
        sx={{ maxWidth: 600, mx: "auto", p: 4, borderRadius: 3 }}
      >
        <Typography variant="h5" gutterBottom>
          Create User
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item size={{ lg: 6, xs: 12 }}>
              <TextField
                label="Name"
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
                label="Password"
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
                label="Confirm Password"
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
                <InputLabel id="country-label">Country</InputLabel>
                <Select
                  labelId="country-label"
                  id="countryCode"
                  name="countryCode"
                  label="Country"
                  value={form.countryCode}
                  onChange={handleChange}
                >
                  <MenuItem value="AR">Argentina</MenuItem>
                  <MenuItem value="MX">México</MenuItem>
                  <MenuItem value="CL">Chile</MenuItem>
                  <MenuItem value="ES">España</MenuItem>
                  <MenuItem value="US">USA</MenuItem>
                </Select>
                {errors.countryCode && (
                  <FormHelperText>{errors.countryCode}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item size={{ lg: 6, xs: 12 }}>
              <FormControl fullWidth error={!!errors.role}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  name="role"
                  label="Role"
                  value={form.role}
                  onChange={handleChange}
                >
                  {getAvailableRoles(user?.role).map((r) => (
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
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateUser;
