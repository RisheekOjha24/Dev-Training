import React, { useState } from 'react';
import { TextField, Button, Typography, IconButton, InputAdornment, Box, Container } from '@mui/material';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';  // Import axios for making requests
import { signin } from '../../utils/APIRoute';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { userData } from '../../store/userDetails';
import babyPanda2 from "../assets/babyPanda2.png"
import { fetchCartItems } from "../../store/cartDetails";

const Login = () => {

  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);  // To display error messages

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the login request to the backend
      const response = await axios.post(signin, {
        useremail: formData.email,
        password: formData.password
      },{ withCredentials: true });

      console.log('Login successful:');
      
      localStorage.setItem("useremail",formData.email);
      localStorage.setItem("username",response.data.username);

      dispatch(userData({username:response.data.username,useremail:formData.email}));
      dispatch(fetchCartItems());


      navigate("/")

    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'Login failed. Please try again.'); // Display error message
    }
  };

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',backgroundColor:"#f5f5f5" }}>
      <Box sx={{ display: 'flex', width: '100%', flexDirection: { xs: 'column', sm: 'row' } }}>
        {/* Left Side: Image */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#f5f5f5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2
          }}
        >
          <img src={babyPanda2} alt="Placeholder Image" style={{ maxWidth: '100%', height: 'auto',transform:"scale(0.9)" }} />
        </Box>

        {/* Right Side: Login Form */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 3 }}>
          <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>Login to Your Account</Typography>

            {/* Error Message */}
            {error && <Typography color="error" align="center">{error}</Typography>}

            {/* Email Field */}
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              margin="normal"
              required
            />

            {/* Password Field */}
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: '16px' }}
            >
              Login
            </Button>

            {/* Register Link */}
            <Typography variant="body2" align="center" sx={{ marginTop: '16px' }}>
              Don't have an account?{' '}
              <a href="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
                Create an Account
              </a>
            </Typography>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
