import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials, setUser } from "../store/authSlice.js";
import { Paper, Typography, Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import { Alert } from "@mui/material";
import { loginUser } from "../services/authApi.js";
import { getUser } from "../services/userService.js";
import { validateEmail, validatePassword } from "../utils/validators.js";
import ShowHidePasswordIcon from "../components/ShowHidePasswordIcon.jsx";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [generalError, setGeneralError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const errors = {};

    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);

    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const tokenResponse = await loginUser(form.email, form.password);
      dispatch(setCredentials(tokenResponse.data.accessToken));

      const user = await getUser(tokenResponse.data.userId);
      dispatch(setUser(user.data));
      navigate("/");
    } catch (err) {
      console.log(err);
      setGeneralError(err?.response?.data?.detail || "Login error");
    }
  };

  return (
    <Paper elevation={6} sx={{ mt: 8, p: 4, mx: "auto", maxWidth: 600 }}>
      <Typography component="h1" variant="h5" align="center">
        Log In
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          margin="normal"
          fullWidth
          id="email"
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          autoFocus
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          id="password"
          value={form.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          slotProps={{
            input: {
              endAdornment: (
                <ShowHidePasswordIcon
                  visible={showPassword}
                  onToggle={toggleShowPassword}
                />
              ),
            },
          }}
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
          Log In
        </Button>
      </Box>
    </Paper>
  );
};

export default Login;
