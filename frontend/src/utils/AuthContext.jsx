import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('access_token') || null);

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    if (!storedToken) {
      setIsLoggedIn(false);
      return;
    };

    setToken(storedToken); // Ensure token is set before API calls

    const fetchUser = async () => {
      try {
      const response = await axios.get('http://localhost:8000/users/me', {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setUser(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error fetching user:', error.response?.data || error.message);
      logout();
    }
  };

    fetchUser();
  }, []);

  const login = async (access_token) => {
    try {
      localStorage.setItem('access_token', access_token);
      setToken(access_token);

      // Fetch user details after login
      const response = await axios.get('http://localhost:8000/users/me', {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      setUser(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
      logout(); // Logout if login fails
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user, token }}>
      {children}
    </AuthContext.Provider>
  );
};
