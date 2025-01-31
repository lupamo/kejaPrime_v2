import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');  // Manage roles (landlord, tenant, etc.)
  const [accessToken, setAccessToken] = useState(null);

  // Fetch token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      setAccessToken(storedToken);
      checkAuthStatus(storedToken);  // Check if token is still valid
    }
  }, []);

  // Store or remove the token from localStorage when `accessToken` changes
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
    } else {
      localStorage.removeItem('access_token');
    }
  }, [accessToken]);

  /**
   * Check if the user is authenticated based on the access token.
   * This function should ideally be called when the app starts (if there's a token).
   */
  const checkAuthStatus = async (token) => {
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:8000/api/v1/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setIsLoggedIn(true);
        setUserType(response.data.is_landlord ? 'user' : 'user');  // Adjust role
        console.log("User type:", response.data.is_landlord ? 'user' : 'user'); 
      } else {
        console.log('User not logged in');
        setIsLoggedIn(false);
        handleLogout();  // Clear token if the user is unauthorized
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
      setIsLoggedIn(false);
      handleLogout();  // Clear token in case of failure
    }
  };

  /**
   * Login function to authenticate the user and retrieve the access token.
   */
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/sign_in', { email, password });

      if (response.status === 200) {
        setAccessToken(response.data.access_token);
        setUserType(response.data.is_landlord ? 'user' : 'user');  // Determine role from response
        setIsLoggedIn(true);
      } else {
        console.error('Error logging in:', response.data);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  /**
   * Logout function to clear user session and token.
   */
  const logout = () => {
    setIsLoggedIn(false);
    setUserType('');
    setAccessToken(null);
    localStorage.removeItem('access_token');
  };

  /**
   * Optionally refresh the token if needed (implement if your backend supports token refreshing).
   */

  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};