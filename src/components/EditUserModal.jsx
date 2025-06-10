import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";
import { useState, useEffect } from "react";
import { validateEmail } from "../utils/validators";

const COUNTRIES = [
  { code: "AR", name: "Argentina" },
  { code: "MX", name: "México" },
  { code: "CL", name: "Chile" },
  { code: "ES", name: "España" },
  { code: "US", name: "USA" },
];

const EditUserModal = ({ open, onClose, user, onSubmit }) => {
  const [form, setForm] = useState({
    userId: 0,
    name: "",
    alias: "",
    email: "",
    countryCode: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setForm({
        userId: user.userId,
        name: user.name || "",
        alias: user.alias || "",
        email: user.email || "",
        countryCode: user.countryCode || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.alias) newErrors.alias = "Alias is required";
    if (!form.countryCode) newErrors.countryCode = "Country is required";
    const emailError = validateEmail(form.email);
    if (emailError) newErrors.email = emailError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={form.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              label="Alias"
              name="alias"
              fullWidth
              value={form.alias}
              onChange={handleChange}
              error={!!errors.alias}
              helperText={errors.alias}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <FormControl fullWidth error={!!errors.countryCode}>
              <InputLabel>Country</InputLabel>
              <Select
                name="countryCode"
                value={form.countryCode}
                label="Country"
                onChange={handleChange}
              >
                {COUNTRIES.map((c) => (
                  <MenuItem key={c.code} value={c.code}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.countryCode && (
                <FormHelperText>{errors.countryCode}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="secondary" variant="contained">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserModal;
