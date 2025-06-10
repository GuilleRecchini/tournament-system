import {
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  TextField,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { roleLabels } from "../constants/roles";
import { deleteUser, getAllUsers, updateUser } from "../services/userService";
import EditUserModal from "../components/EditUserModal";
import CustomSnackbar from "../components/CustomSnackbar";

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const loadUsers = async () => {
    setLoading(true);
    try {
      const usersData = await getAllUsers();
      setUsers(usersData.data);
      setFilteredUsers(usersData.data);
    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const lower = search.toLowerCase();
    setFilteredUsers(
      users.filter(
        (u) =>
          u.name.toLowerCase().includes(lower) ||
          u.alias.toLowerCase().includes(lower) ||
          u.email.toLowerCase().includes(lower)
      )
    );
  }, [search, users]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      await updateUser(updatedUser);
      setSnackbar({
        open: true,
        message: "User updated successfully",
        severity: "success",
      });
      setEditModalOpen(false);
      loadUsers();
    } catch (error) {
      console.error("Error updating user", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.detail || "Update failed",
        severity: "error",
      });
    }
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    setConfirmOpen(false);
    try {
      await deleteUser(selectedUser);
      setSnackbar({
        open: true,
        message: "User deleted successfully",
        severity: "success",
      });
      loadUsers();
    } catch (error) {
      console.error("Error deleting user", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.detail || "Delete failed",
        severity: "error",
      });
    }
  };

  const allColumns = [
    { field: "alias", headerName: "Alias", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.5 },
    { field: "countryCode", headerName: "Country", flex: 0.4 },
    {
      field: "role",
      headerName: "Role",
      flex: 0.7,
      valueGetter: (value) => roleLabels?.[value],
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.6,
      sortable: false,
      filterable: false,
      width: 100,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(params.row)}>
            <Edit />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDeleteClick(params.row)}
          >
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];

  const mobileColumnKeys = ["alias", "actions"];

  const columns = isMobile
    ? allColumns.filter((col) => mobileColumnKeys.includes(col.field))
    : allColumns;

  return (
    <Box p={2}>
      <Typography variant="h6" mb={2}>
        User List
      </Typography>

      <TextField
        label="Search by name, alias or email"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <Box sx={{ height: 500 }}>
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              getRowId={(row) => row.userId}
              autoPageSize
              rowsPerPageOptions={[10]}
              loading={loading}
              disableRowSelectionOnClick
            />
          </Box>
        </Box>
      </Paper>

      <EditUserModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        user={selectedUser}
        onSubmit={handleUpdateUser}
      />

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the user "{selectedUser?.alias}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
}
