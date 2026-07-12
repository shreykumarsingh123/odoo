import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Profile({ onLogout }) {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    // Fetch user profile from backend
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userData = JSON.parse(userStr);
      setUser(userData);
      setFormData({
        username: userData.username || '',
        email: userData.email || '',
        firstName: userData.first_name || '',
        lastName: userData.last_name || '',
      });
    }
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('authToken');
    
    try {
      const response = await fetch('http://localhost:8000/api/profile/update/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Profile updated successfully!');
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        setIsEditing(false);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.error || 'Failed to update profile');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error(err);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!user) {
    return <Alert severity="error">User not found</Alert>;
  }

  const getInitials = () => {
    const first = formData.firstName.charAt(0).toUpperCase();
    const last = formData.lastName.charAt(0).toUpperCase();
    return first + last || formData.username.charAt(0).toUpperCase();
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mr: 3,
                bgcolor: 'primary.main',
                fontSize: '2rem',
              }}
            >
              {getInitials()}
            </Avatar>
            <Box>
              <Typography variant="h5">
                {formData.firstName} {formData.lastName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                @{formData.username}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {formData.email}
              </Typography>
            </Box>
            <Box sx={{ ml: 'auto', display: 'flex', gap: 1, alignItems: 'center' }}>
              {!isEditing ? (
                <>
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<LogoutIcon />}
                    onClick={onLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        username: user.username || '',
                        email: user.email || '',
                        firstName: user.first_name || '',
                        lastName: user.last_name || '',
                      });
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {isEditing && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Edit Profile Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                disabled
                helperText="Username cannot be changed"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Paper>
      )}

      {!isEditing && (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Account Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">
                  Username
                </Typography>
                <Typography variant="body1">
                  {formData.username}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">
                  Email
                </Typography>
                <Typography variant="body1">
                  {formData.email}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">
                  Member Since
                </Typography>
                <Typography variant="body1">
                  {new Date(user.date_joined || Date.now()).toLocaleDateString()}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
