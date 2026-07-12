import { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Tabs,
  Tab,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';

export default function Auth({ onLoginSuccess }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  // Signup form state
  const [signupForm, setSignupForm] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    setError('');
    setSuccess('');
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!loginForm.email || !loginForm.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.tokens?.access || '');
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('isAdmin', data.user?.is_staff ? '1' : '0');
        setSuccess('Login successful!');
        setTimeout(() => {
          onLoginSuccess();
        }, 1000);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!signupForm.username || !signupForm.email || !signupForm.firstName || !signupForm.lastName || !signupForm.password) {
      setError('Please fill in all fields');
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (signupForm.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: signupForm.username,
          email: signupForm.email,
          first_name: signupForm.firstName,
          last_name: signupForm.lastName,
          password: signupForm.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Account created successfully! Please login.');
        setSignupForm({ username: '', email: '', firstName: '', lastName: '', password: '', confirmPassword: '' });
        setTimeout(() => setTabIndex(0), 1500);
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  

  return (
      <Container maxWidth="sm">
        <Box sx={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
          <Paper elevation={3} sx={{ width: '100%', p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 3 }}>
              Welcome
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <Tabs value={tabIndex} onChange={handleTabChange} centered>
              <Tab label="Login" />
              <Tab label="Sign Up" />
            </Tabs>

            {/* Login Tab */}
            {tabIndex === 0 && (
              <Box sx={{ mt: 3 }}>
                <Box component="form" onSubmit={handleLogin} sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    name="email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    margin="normal"
                    disabled={loading}
                    autoFocus
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    margin="normal"
                    disabled={loading}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ mt: 3 }}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Login'}
                  </Button>
                </Box>

                {/* Social login removed - simple email/password only */}
              </Box>
            )}

            {/* Signup Tab */}
            {tabIndex === 1 && (
              <Box sx={{ mt: 3 }}>
                <Box component="form" onSubmit={handleSignup} sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={signupForm.username}
                    onChange={handleSignupChange}
                    margin="normal"
                    disabled={loading}
                    autoFocus
                  />
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={signupForm.firstName}
                    onChange={handleSignupChange}
                    margin="normal"
                    disabled={loading}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={signupForm.lastName}
                    onChange={handleSignupChange}
                    margin="normal"
                    disabled={loading}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    name="email"
                    value={signupForm.email}
                    onChange={handleSignupChange}
                    margin="normal"
                    disabled={loading}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    value={signupForm.password}
                    onChange={handleSignupChange}
                    margin="normal"
                    disabled={loading}
                  />
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={signupForm.confirmPassword}
                    onChange={handleSignupChange}
                    margin="normal"
                    disabled={loading}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ mt: 3 }}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Sign Up'}
                  </Button>
                </Box>

                {/* Social login removed - simple email/password only */}
              </Box>
            )}
          </Paper>
        </Box>
      </Container>
  );
}
