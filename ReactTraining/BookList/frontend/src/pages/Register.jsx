import React, { useState } from 'react';
import { TextField, Button, Typography, IconButton, InputAdornment, Box, Container } from '@mui/material';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineCheckCircle } from 'react-icons/ai';
import axios from 'axios';
import {message } from "antd";
import { signup } from '../../utils/APIRoute';
import babyPanda1 from '../assets/restPanda.png'; 
import { useNavigate } from 'react-router-dom';

const Register = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const navigate=useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidity, setPasswordValidity] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  });
  // Used to track when user started typing
  const [isTyping, setIsTyping] = useState(false);  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validatePassword = (password) => {
    const lengthValid = password.length >= 5;
    const uppercaseValid = /[A-Z]/.test(password);
    const lowercaseValid = /[a-z]/.test(password);
    const numberValid = /\d/.test(password);
    const specialCharValid = /[!@#$%^&*]/.test(password);

    return {
      length: lengthValid,
      uppercase: uppercaseValid,
      lowercase: lowercaseValid,
      number: numberValid,
      specialChar: specialCharValid
    };
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      password: value
    });

    // user started typing in password field
    if (!isTyping) setIsTyping(true);

    // Validating password
    const validationResults = validatePassword(value);
    setPasswordValidity(validationResults);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      message.error("Password do not match",1)
      return;
    }

    // Send data to the backend using Axios
    try {
      const response = await axios.post(signup, {
        username: formData.name,
        useremail: formData.email,
        password: formData.password
      });
      console.log('Registration successful:', response.data);
      navigate('/login')
      message.success("you are registered succesfully",1)
    } catch (error) {
      message.error(error.response?.data.message || "An unexpected error",1);
      console.error('Error registering user:', error.response?.data?.message || 'An unexpected error occurred');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ height: '100vh',display: 'flex', justifyContent: 'center', alignItems: 'center',backgroundColor:"#f5f5f5" }}>
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
          <img src={babyPanda1} alt="Placeholder Image" style={{ maxWidth: '100%', height: 'auto',transform:'scale(0.85)' }} />
        </Box>

        {/* Right Side: Register Form */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 3 }}>
          <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>Create an Account</Typography>

            {/* Name Field */}
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              margin="normal"
              required
            />

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
              onChange={handlePasswordChange}
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
            {isTyping && (
              <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '8px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                  {passwordValidity.length && <AiOutlineCheckCircle color="green" />}
                  <Typography variant="body2" color={passwordValidity.length ? 'green' : 'red'}>
                    At least 5 characters
                  </Typography>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                  {passwordValidity.uppercase && <AiOutlineCheckCircle color="green" />}
                  <Typography variant="body2" color={passwordValidity.uppercase ? 'green' : 'red'}>
                    One uppercase letter
                  </Typography>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                  {passwordValidity.lowercase && <AiOutlineCheckCircle color="green" />}
                  <Typography variant="body2" color={passwordValidity.lowercase ? 'green' : 'red'}>
                    One lowercase letter
                  </Typography>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                  {passwordValidity.number && <AiOutlineCheckCircle color="green" />}
                  <Typography variant="body2" color={passwordValidity.number ? 'green' : 'red'}>
                    One number
                  </Typography>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                  {passwordValidity.specialChar && <AiOutlineCheckCircle color="green" />}
                  <Typography variant="body2" color={passwordValidity.specialChar ? 'green' : 'red'}>
                    One special character
                  </Typography>
                </div>
              </Box>
            )}

            {/* Confirm Password Field */}
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              margin="normal"
              required
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: '16px' }}
            >
              Register
            </Button>

            {/* Already have an account? Link */}
            <Typography variant="body2" align="center" sx={{ marginTop: '16px' }}>
              Already have an account?{' '}
              <a href="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
                Login
              </a>
            </Typography>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
